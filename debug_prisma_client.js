const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('--- Debug Prisma Client ---');

    const databaseUrl = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('URL:', databaseUrl);
    console.log('Auth Token Present:', !!authToken);

    const adapter = new PrismaLibSql({
        url: databaseUrl,
        authToken: authToken,
    });

    const prisma = new PrismaClient({ adapter });

    console.log('Prisma Client Initialized.');

    const models = Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$'));
    console.log('Available Models:', models.join(', '));

    if (models.includes('training')) {
        console.log('✅ "training" model found on client.');
        try {
            const count = await prisma.training.count();
            console.log('✅ Connection successful. Training count:', count);
        } catch (e) {
            console.error('❌ Error querying usage:', e.message);
        }
    } else {
        console.error('❌ "training" model MISSING from client.');
    }
}

main();
