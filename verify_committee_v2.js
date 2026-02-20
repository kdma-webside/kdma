const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url, authToken });

    try {
        const result = await client.execute('SELECT category, count(*) as count FROM "CommitteeMember" GROUP BY category ORDER BY "order"');
        console.table(result.rows);

        const total = await client.execute('SELECT count(*) as total FROM "CommitteeMember"');
        console.log('Total members:', total.rows[0].total);
    } catch (error) {
        console.error('Error verifying data:', error.message);
    }
}

main();
