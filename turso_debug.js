const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Detailed Turso Diagnostic ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('URL:', url);
    // Don't log full token for security, but check if it's there
    console.log('Token exists:', !!authToken);

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    try {
        const res = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
        console.log('Existing Tables:');
        const tableNames = res.rows.map(row => row.name);
        tableNames.forEach(name => console.log(` - ${name}`));

        if (tableNames.includes('User')) {
            console.log('✅ Found User table!');

            // Try to query it
            try {
                const userCount = await client.execute("SELECT count(*) as count FROM User;");
                console.log('User count:', userCount.rows[0].count);
            } catch (e) {
                console.error('Error querying User table:', e.message);
            }
        } else {
            console.log('❌ User table is MISSING!');
        }
    } catch (error) {
        console.error('Database Error:', error.message);
    }
}

main();
