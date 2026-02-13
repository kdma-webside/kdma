const { createClient } = require('@libsql/client');
const path = require('path');

async function main() {
    const dbPath = path.resolve('dev.db');
    console.log(`Checking database at: ${dbPath}`);

    const client = createClient({
        url: `file:${dbPath}`
    });

    try {
        // List all tables
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

        console.log('Local Database Table Counts:');
        console.log(JSON.stringify(results, null, 2));

        // Also check a few records from SiteContent to see what is there
        if (tables.includes('SiteContent')) {
            const contentRs = await client.execute('SELECT "key", "area", "value" FROM SiteContent LIMIT 10');
            console.log('\nSample SiteContent:');
            console.table(contentRs.rows);
        }

    } catch (err) {
        console.error('Database check failed:', err);
    } finally {
        // client.close() is not always available depending on version, just finish
    }
}

main().catch(console.error);
