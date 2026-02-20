const { createClient } = require('@libsql/client');

async function main() {
    console.log('--- Checking Production Product Counts ---');
    const prodUrl = 'https://kdma-kdma.aws-ap-south-1.turso.io';
    const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjUiLCJpYXQiOjE3NzAzNTE1NzYsInJpZCI6IjNjZDc0YzM3LTcxODgtNGU1NS1iYzU1LTcyYWQzZDA0MGM1MCJ9.DJX1hiI65-U3hKa6p3IwzkJTZSdqqaBIavdpC7tLS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw';

    const client = createClient({ url: prodUrl, authToken });

    try {
        const productCount = await client.execute('SELECT COUNT(*) as count FROM "Product"');
        console.log(`✅ Products in production: ${productCount.rows[0].count}`);

        // List product names
        const products = await client.execute('SELECT name, category, price FROM "Product" ORDER BY category, name');
        console.log('\nProducts:');
        products.rows.forEach(p => {
            console.log(`  - ${p.name} (${p.category}) - ₹${p.price}`);
        });
    } catch (error) {
        console.error('❌ Error checking products:', error.message);
    }
}

main().catch(console.error);
