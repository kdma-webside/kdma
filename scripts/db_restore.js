const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('--- Database Restore (JSON Import) ---');

    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('Usage: node scripts/db_restore.js <backup_file_path> [--prod]');
        return;
    }

    const backupFile = args[0];
    const isProd = args.includes('--prod');

    if (!fs.existsSync(backupFile)) {
        console.error(`ERROR: Backup file not found: ${backupFile}`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

    // Get connection details
    let url = isProd ? "https://kdma-kdma.aws-ap-south-1.turso.io" : process.env.DATABASE_URL;
    let authToken = process.env.TURSO_AUTH_TOKEN;

    if (!isProd && url && url.startsWith('file:')) {
        const relativePath = url.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            url = `file:${path.resolve(process.cwd(), relativePath)}`;
        }
    }

    if (!url) {
        console.error('ERROR: Database URL not found.');
        return;
    }

    console.log(`Connecting to: ${url} (${isProd ? 'PRODUCTION' : 'LOCAL'})`);
    const client = createClient({ url, authToken });

    try {
        const tables = Object.keys(data);
        console.log(`Found ${tables.length} tables in backup.`);

        for (const table of tables) {
            console.log(`Restoring table: ${table}...`);
            const rows = data[table];

            if (rows.length === 0) {
                console.log(`  Table ${table} is empty, skipping.`);
                continue;
            }

            // Clear existing data
            console.log(`  Clearing current data in ${table}...`);
            await client.execute(`DELETE FROM "${table}"`);

            // Insert rows
            const columns = Object.keys(rows[0]);
            const placeholders = columns.map(() => '?').join(', ');
            const sql = `INSERT INTO "${table}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;

            for (const row of rows) {
                const args = columns.map(col => row[col]);
                await client.execute({ sql, args });
            }
            console.log(`  Successfully restored ${rows.length} rows to ${table}.`);
        }

        console.log('\nRestore process completed successfully.');
    } catch (error) {
        console.error('\nRestore failed:', error.message);
        process.exit(1);
    }
}

main().catch(console.error);
