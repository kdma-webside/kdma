const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    const prodUrl = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url: prodUrl, authToken });

    const tables = [
        'EventRegistration',
        'TrainingRegistration',
        'CampRegistration',
        'Event',
        'Training',
        'Camp',
        'Enquiry',
        'User',
        'SiteContent',
        'NewsletterSubscriber',
        'CommitteeMember'
    ];

    console.log('Turso Production Detailed Counts:');
    const results = {};

    for (const table of tables) {
        try {
            const rs = await client.execute(`SELECT COUNT(*) as count FROM "${table}"`);
            results[table] = rs.rows[0].count;
        } catch (err) {
            results[table] = 'Error: ' + err.message;
        }
    }

    console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
