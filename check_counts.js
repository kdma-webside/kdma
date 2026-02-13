const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const committeeCount = await prisma.committeeMember.count();
    const trainingCount = await prisma.training.count();
    const eventCount = await prisma.event.count();
    const productCount = await prisma.product.count();
    const siteContentCount = await prisma.siteContent.count();

    console.log('--- Record Counts ---');
    console.log('CommitteeMembers:', committeeCount);
    console.log('Trainings:', trainingCount);
    console.log('Events:', eventCount);
    console.log('Products:', productCount);
    console.log('SiteContent:', siteContentCount);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
