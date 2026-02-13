const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Seeding Committee Data ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    const members = [
        // LEADERSHIP
        { name: "TBA", position: "President", image: "/images/heritage-master.png", category: "LEADERSHIP", order: 10 },
        { name: "TBA", position: "Vice President", image: "/images/unified-hero-athlete.png", category: "LEADERSHIP", order: 20 },
        { name: "TBA", position: "Secretary", image: "/images/benefit-discipline.jpg", category: "LEADERSHIP", order: 30 },

        // OPERATIONS
        { name: "TBA", position: "Coordinator", image: "/images/heritage-master.png", category: "OPERATIONS", order: 40 },

        // CORE TEAM
        { name: "TBA", position: "Treasurer", image: "/images/benefit-strength.jpg", category: "CORE TEAM", order: 50 },
        { name: "TBA", position: "Joint Secretary", image: "/images/athlete-hero.png", category: "CORE TEAM", order: 60 },
        { name: "TBA", position: "Joint Secretary", image: "/images/hero-athlete.jpg", category: "CORE TEAM", order: 70 },

        // EXECUTIVE COUNCIL
        { name: "TBA", position: "Executive Member", image: "/images/stats-bg.png", category: "EXECUTIVE COUNCIL", order: 80 },
        { name: "TBA", position: "Executive Member", image: "/images/benefit-flexibility.png", category: "EXECUTIVE COUNCIL", order: 90 },
        { name: "TBA", position: "Executive Member", image: "/images/training-ground.png", category: "EXECUTIVE COUNCIL", order: 100 },
    ];

    try {
        // Clear existing data first
        console.log('Clearing existing committee members...');
        await client.execute('DELETE FROM "CommitteeMember"');

        for (const member of members) {
            const id = `cm_${Math.random().toString(36).substr(2, 9)}`;
            const now = new Date().toISOString();

            console.log(`Adding ${member.position}...`);
            await client.execute({
                sql: `INSERT INTO "CommitteeMember" (id, name, position, image, category, "order", createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, member.name, member.position, member.image, member.category, member.order, now, now]
            });
        }
        console.log('Successfully seeded committee data.');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
}

main();
