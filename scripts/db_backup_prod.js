const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('--- Production Database Backup (Turso JSON Export) ---');

    const url = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!authToken) {
        console.error('ERROR: TURSO_AUTH_TOKEN not found in .env');
        process.exit(1);
    }

    console.log(`Connecting to: ${url}`);
    const client = createClient({ url, authToken });

    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `prod_backup_${timestamp}.json`);

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
        console.log(`\nProduction backup successfully saved to: ${backupFile}`);
        console.log(`Total tables backed up: ${tables.length}`);

    } catch (error) {
        console.error('Production backup failed:', error.message);
        process.exit(1);
    }
}

main().catch(console.error);
