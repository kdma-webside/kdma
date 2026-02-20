const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('--- Database Backup (Raw JSON Export) ---');

    // Get connection details
    let url = process.env.DATABASE_URL;
    let authToken = process.env.TURSO_AUTH_TOKEN;

    // Local file path handling for @libsql/client
    if (url && url.startsWith('file:')) {
        const relativePath = url.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            url = `file:${path.resolve(process.cwd(), relativePath)}`;
        }
    }

    if (!url) {
        console.error('ERROR: DATABASE_URL not found in .env');
        process.exit(1);
    }

    console.log(`Connecting to: ${url}`);
    const client = createClient({ url, authToken });

    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `raw_backup_${timestamp}.json`);

    try {
        // Get all tables
        const tablesRes = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'");
        const tables = tablesRes.rows.map(row => row.name);

        const data = {};

        for (const table of tables) {
            console.log(`Exporting table: ${table}...`);
            const res = await client.execute(`SELECT * FROM "${table}"`);
            data[table] = res.rows;
        }

        fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
        console.log(`\nBackup successfully saved to: ${backupFile}`);
        console.log(`Total tables backed up: ${tables.length}`);

    } catch (error) {
        console.error('Backup failed:', error.message);
        process.exit(1);
    }
}

main().catch(console.error);
