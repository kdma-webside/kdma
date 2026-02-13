const { createClient } = require('@libsql/client');
const crypto = require('crypto');
require('dotenv').config();

async function main() {
    console.log('--- Creating Dummy Committee Members ---');

    const args = process.argv.slice(2);
    const isProd = args.includes('--prod');

    let url = isProd ? "https://kdma-kdma.aws-ap-south-1.turso.io" : process.env.DATABASE_URL;
    let authToken = process.env.TURSO_AUTH_TOKEN;

    if (!isProd && url && url.startsWith('file:')) {
        const path = require('path');
        const relativePath = url.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            url = `file:${path.resolve(process.cwd(), relativePath)}`;
        }
    }

    if (!url) {
        console.error('ERROR: DATABASE_URL not found.');
        return;
    }

    console.log(`Connecting to: ${url} (${isProd ? 'PRODUCTION' : 'LOCAL'})`);
    const client = createClient({ url, authToken });

    const members = [
        { name: "Dr. R. Ananthakrishnan", position: "President", image: "/images/heritage-master.png", category: "President", order: 10 },
        { name: "Smt. Meera Venkat", position: "Vice President", image: "/images/unified-hero-athlete.png", category: "Vice president", order: 20 },
        { name: "Shri. K. Muralidharan", position: "Secretary", image: "/images/benefit-discipline.jpg", category: "Secretary", order: 30 },
        { name: "Shri. P. Rajesh Kumar", position: "Joint Secretary", image: "/images/athlete-hero.png", category: "Joint secretary", order: 40 },
        { name: "Shri. S. Thangadurai", position: "Coordinator", image: "/images/hero-athlete.jpg", category: "Cordinator", order: 50 },
        { name: "Shri. V. Sivakumar", position: "Treasurer", image: "/images/benefit-strength.jpg", category: "Tressurer", order: 60 },
        { name: "Shri. M. Balaji", position: "Executive Member", image: "/images/stats-bg.png", category: "Executive comittee", order: 70 },
        { name: "Shri. J. Karthikeyan", position: "Executive Member", image: "/images/training-ground.png", category: "Executive comittee", order: 80 },
        { name: "Smt. S. Lakshmi", position: "Executive Member", image: "/images/benefit-flexibility.png", category: "Executive comittee", order: 90 }
    ];

    try {
        // Option to clear or just add. Given past frustration, I'll clear current placeholders first.
        // But only if they are the dummy ones. Actually, better to just clear it to ensure a clean hierarchy.
        console.log('Clearing existing committee members to ensure clean hierarchy...');
        await client.execute('DELETE FROM "CommitteeMember"');

        for (const member of members) {
            console.log(`Adding ${member.category}: ${member.name}...`);
            const id = `cm_${crypto.randomBytes(4).toString('hex')}`;
            const now = new Date().toISOString();

            await client.execute({
                sql: `INSERT INTO "CommitteeMember" (id, name, position, image, category, "order", createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    id,
                    member.name,
                    member.position,
                    member.image,
                    member.category,
                    member.order,
                    now,
                    now
                ]
            });
        }
        console.log('\nSuccessfully created dummy committee members.');

    } catch (error) {
        console.error('Failed to create dummy committee:', error.message);
    }
}

main().catch(console.error);
