const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('Starting seed...');

    const databaseUrl = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log(`Using Database URL: ${databaseUrl}`);

    let prisma;
    if (databaseUrl.startsWith('libsql:')) {
        console.log('Using LibSQL adapter for Turso');
        const adapter = new PrismaLibSql({
            url: databaseUrl,
            authToken: authToken,
        });
        prisma = new PrismaClient({ adapter });
    } else {
        console.log('Using default Prisma client');
        prisma = new PrismaClient();
    }

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

        console.log('Seeding SiteContent...');
        for (const content of siteContent) {
            const existing = await prisma.siteContent.findUnique({ where: { key: content.key } });
            if (existing) {
                await prisma.siteContent.update({ where: { id: existing.id }, data: content });
            } else {
                await prisma.siteContent.create({ data: content });
            }
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

        console.log('Seeding Products...');
        for (const product of products) {
            const existing = await prisma.product.findFirst({ where: { name: product.name } });
            if (existing) {
                await prisma.product.update({ where: { id: existing.id }, data: product });
            } else {
                await prisma.product.create({ data: product });
            }
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

        console.log('Seeding Events...');
        for (const event of events) {
            const existing = await prisma.event.findFirst({ where: { title: event.title } });
            if (existing) {
                await prisma.event.update({ where: { id: existing.id }, data: event });
            } else {
                await prisma.event.create({ data: event });
            }
        }

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
