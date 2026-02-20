const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Seeding Trainings and Camps Dummy Data ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    const trainings = [
        {
            title: "Traditional Mallakhamb Foundation",
            description: "Master the basics of pole Mallakhamb with our comprehensive foundation course. Focus on grip, balance, and basic mounting techniques.",
            duration: "3 Months",
            level: "Beginner",
            image: "/images/benefit-strength.jpg",
            category: "Pole Mallakhamb",
            isActive: true
        },
        {
            title: "Rope Mallakhamb Mastery",
            description: "Advanced techniques on the rope, focusing on flexibility, core strength, and complex aerial transitions. Ideal for intermediate practitioners.",
            duration: "6 Months",
            level: "Intermediate",
            image: "/images/benefit-flexibility.png",
            category: "Rope Mallakhamb",
            isActive: true
        },
        {
            title: "Elite Competitive Mallakhamb",
            description: "Specialized training for athletes aiming for national and international competitions. High-intensity routines and performance refinement.",
            duration: "Ongoing",
            level: "Advanced",
            image: "/images/athlete-hero.png",
            category: "Competitive",
            isActive: true
        }
    ];

    const camps = [
        {
            title: "Summer Heritage Intensive",
            description: "A 10-day immersive camp focusing on traditional Indian sports and Mallakhamb techniques in a scenic heritage setting.",
            startDate: new Date("2026-05-15").toISOString(),
            endDate: new Date("2026-05-25").toISOString(),
            location: "Kanyakumari",
            image: "/images/heritage-master.png",
            price: 5000,
            isActive: true
        },
        {
            title: "Weekend Warrior Workshop",
            description: "Perfect for busy professionals wanting to experience the strength and flexibility benefits of Mallakhamb over a weekend.",
            startDate: new Date("2026-03-20").toISOString(),
            endDate: new Date("2026-03-22").toISOString(),
            location: "Nagercoil",
            image: "/images/hero-athlete.jpg",
            price: 1500,
            isActive: true
        },
        {
            title: "Monsoon Discipline Camp",
            description: "Build mental resilience and physical power during the monsoon season. Includes yoga and Mallakhamb routines.",
            startDate: new Date("2026-07-10").toISOString(),
            endDate: new Date("2026-07-20").toISOString(),
            location: "Trivandrum",
            image: "/images/benefit-discipline.jpg",
            price: 3500,
            isActive: true
        }
    ];

    try {
        // console.log('Clearing existing Trainings and Camps...');
        // await client.execute('DELETE FROM "Training"');
        // await client.execute('DELETE FROM "Camp"');

        console.log('Inserting Trainings...');
        for (const t of trainings) {
            const id = `training_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Training" (id, title, description, duration, level, image, category, isActive, createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, t.title, t.description, t.duration, t.level, t.image, t.category, t.isActive ? 1 : 0, now, now]
            });
        }

        console.log('Inserting Camps...');
        for (const c of camps) {
            const id = `camp_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Camp" (id, title, description, startDate, endDate, location, image, price, isActive, createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, c.title, c.description, c.startDate, c.endDate, c.location, c.image, c.price, c.isActive ? 1 : 0, now, now]
            });
        }

        console.log('Successfully seeded Trainings and Camps.');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
}

main();
