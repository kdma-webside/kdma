const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const tables = [
            'admin',
            'product',
            'order',
            'event',
            'training',
            'camp',
            'eventRegistration',
            'trainingRegistration',
            'campRegistration',
            'user',
            'enquiry',
            'siteContent',
            'newsletterSubscriber',
            'newsletterContent',
            'committeeMember',
            'document'
        ];

        const results = {};
        for (const table of tables) {
            if (prisma[table]) {
                try {
                    results[table] = await prisma[table].count();
                } catch (err) {
                    results[table] = 'Error: ' + err.message;
                }
            } else {
                results[table] = 'Prisma model not found';
            }
        }

        console.log('Database Counts (Local):');
        console.log(JSON.stringify(results, null, 2));

    } catch (err) {
        console.error('Fatal error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
