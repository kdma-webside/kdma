const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Checking Admin/User Credentials ---');
    try {
        const admins = await prisma.admin.findMany();
        console.log('\n--- Admin Table ---');
        console.table(admins);

        const users = await prisma.user.findMany();
        console.log('\n--- User Table ---');
        console.table(users);
    } catch (error) {
        console.error('Error querying database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
