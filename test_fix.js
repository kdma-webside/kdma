const { getTrainings } = require('./src/app/actions/trainings');
const prisma = require('./src/lib/prisma').default;

async function testGetTrainings() {
    try {
        console.log('Testing getTrainings()...');
        const trainings = await getTrainings();
        console.log('Success! Found trainings:', trainings.length);
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        // process.exit(0);
    }
}

// We need a proper environment to run server actions outside of Next.js, 
// but since we just want to check if the SQL error persists, 
// a simple script using the prisma client directly might be easier.

async function testDirectPrisma() {
    try {
        console.log('Testing direct prisma.training.findMany()...');
        const trainings = await prisma.training.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        console.log('Success! Direct prisma call worked. Count:', trainings.length);
    } catch (err) {
        console.error('Direct prisma call failed:', err);
    }
}

testDirectPrisma();
