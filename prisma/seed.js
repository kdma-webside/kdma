const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const path = require('path');

async function main() {
    console.log('Starting seed...');

    const dbPath = path.join(__dirname, '..', 'dev.db');
    const databaseUrl = `file:${dbPath}`;

    console.log(`Using Database URL: ${databaseUrl}`);

    const adapter = new PrismaLibSql({
        url: databaseUrl,
    });
    const prisma = new PrismaClient({ adapter });

    try {
        // 1. Create Admin
        await prisma.admin.upsert({
            where: { username: 'admin' },
            update: {},
            create: {
                username: 'admin',
                password: 'malla_password_2026',
            },
        });

        // 2. Site Content
        const siteContent = [
            { key: 'hero.headline', value: 'MASTER THE GRAVITY OF ANCIENT WARRIORS', area: 'Hero', type: 'text' },
            { key: 'hero.subheadline', value: 'ENTER THE ARENA OF POWER AND GRACE', area: 'Hero', type: 'text' },
            { key: 'store.hero_title', value: 'EQUIP YOUR ARMORY', area: 'Store', type: 'text' },
        ];

        for (const content of siteContent) {
            await prisma.siteContent.upsert({
                where: { key: content.key },
                update: { value: content.value, area: content.area, type: content.type },
                create: content
            });
        }

        // 3. Products
        const products = [
            {
                name: "Standard Wooden Pole",
                price: 18500,
                description: "Authentic teak wood Mallakhamb pole, hand-polished and oil-treated for elite grip and durability.",
                image: "/images/unified-hero-athlete.png",
                category: "Equipment",
                rating: 4.9,
                isFeatured: true
            },
            {
                name: "Warrior Training Rope",
                price: 8400,
                description: "100% organic cotton rope with reinforced core. Designed for maximum friction and minimal burn.",
                image: "/images/benefit-discipline.jpg",
                category: "Equipment",
                rating: 4.8,
                isFeatured: false
            },
            {
                name: "Professional Cane Pole",
                price: 22000,
                description: "Premium cane Mallakhamb pole for advanced practitioners. Superior flexibility and weight distribution.",
                image: "/images/heritage-master.png",
                category: "Equipment",
                rating: 5.0,
                isFeatured: true
            },
            {
                name: "Traditional Grip Oil",
                price: 1200,
                description: "Specialized formulation of mustard oil and herbs to maintain pole texture and warrior grip.",
                image: "/images/training-ground.png",
                category: "Accessories",
                rating: 4.7,
                isFeatured: false
            }
        ];

        await prisma.product.deleteMany({});
        for (const product of products) {
            await prisma.product.create({ data: product });
        }

        // 4. Events
        const events = [
            {
                title: "Annual State Championship",
                description: "A prestigious competition featuring the nation's top Mallakhamb athletes displaying raw power and calculated grace.",
                month: "Oct",
                day: "15",
                eventDate: new Date("2026-10-15T00:00:00.000Z"),
                location: "Main Stadium",
                status: "upcoming",
                image: "/images/unified-hero-athlete.png"
            },
            {
                title: "Cultural Heritage Demo",
                description: "An open showcase at the City Square dedicated to preserving the 12th-century martial heritage through live performance.",
                month: "Nov",
                day: "02",
                eventDate: new Date("2026-11-02T00:00:00.000Z"),
                location: "City Square",
                status: "upcoming",
                image: "/images/heritage-master.png"
            },
            {
                title: "International Workshop",
                description: "Global training session with visiting practitioners focused on the blending of traditional techniques with modern agility.",
                month: "Dec",
                day: "10",
                eventDate: new Date("2026-12-10T00:00:00.000Z"),
                location: "Academy Grounds",
                status: "upcoming",
                image: "/images/benefit-discipline.jpg"
            }
        ];

        await prisma.event.deleteMany({});
        for (const event of events) {
            await prisma.event.create({ data: event });
        }

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
