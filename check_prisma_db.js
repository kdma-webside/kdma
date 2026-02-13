const { createClient } = require('@libsql/client');
const path = require('path');

async function main() {
    const dbPath = path.resolve('prisma', 'dev.db');
    console.log(`Checking database at: ${dbPath}`);

    const client = createClient({
        url: `file:${dbPath}`
    });

    try {
        const tablesRs = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'");
        const tables = tablesRs.rows.map(row => row.name);

        console.log('Tables found:', tables.join(', '));

        const results = {};
        for (const table of tables) {
            try {
                const countRs = await client.execute(`SELECT COUNT(*) as count FROM "${table}"`);
                results[table] = countRs.rows[0].count;
            } catch (err) {
                results[table] = 'Error: ' + err.message;
            }
        }

        console.log('Prisma Folder Database Table Counts:');
        console.log(JSON.stringify(results, null, 2));

    } catch (err) {
        console.error('Database check failed:', err);
    }
}

main().catch(console.error);
