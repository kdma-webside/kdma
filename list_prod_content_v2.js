const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    const prodUrl = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url: prodUrl, authToken });

    try {
        const rs = await client.execute(`SELECT * FROM SiteContent`);
        console.log('Turso SiteContent Details:');
        console.log(JSON.stringify(rs.rows, null, 2));
    } catch (err) {
        console.error('Error fetching SiteContent:', err);
    }
}

main().catch(console.error);
