const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !url.startsWith('https://')) {
        // Trying to find the production URL if current one is local
        console.log('Current DATABASE_URL is local. Using hardcoded production URL for check.');
    }

    const prodUrl = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const client = createClient({ url: prodUrl, authToken });

    const tables = [
        'Document',
        'SiteContent',
        'Event',
        'Training',
        'Enquiry',
        'User',
        'Registration',
        'NewsletterSubscriber',
        'CommitteeMember'
    ];

    console.log('Turso Production Counts:');
    const results = {};

    for (const table of tables) {
        try {
            const rs = await client.execute(`SELECT COUNT(*) as count FROM ${table}`);
            results[table] = rs.rows[0].count;
        } catch (err) {
            results[table] = 'Error: ' + err.message;
        }
    }

    console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
