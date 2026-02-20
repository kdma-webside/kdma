const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url, authToken });

    try {
        const products = await client.execute('SELECT count(*) as count FROM "Product"');
        console.log('Total Products:', products.rows[0].count);

        const productList = await client.execute('SELECT name, category, price, isFeatured FROM "Product"');
        console.table(productList.rows);
    } catch (error) {
        console.error('Error verifying data:', error.message);
    }
}

main();
