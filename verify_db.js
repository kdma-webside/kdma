const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
require('dotenv').config();

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const adapter = new PrismaLibSql({
        url: databaseUrl,
        authToken: authToken,
    });
    const prisma = new PrismaClient({ adapter });

    try {
        const events = await prisma.event.findMany();
        const products = await prisma.product.findMany();
        console.log(`Found ${events.length} events and ${products.length} products.`);
        events.forEach(e => console.log(`- Event: ${e.title}`));
        products.forEach(p => console.log(`- Product: ${p.name}`));
    } finally {
        await prisma.$disconnect();
    }
}
main();
