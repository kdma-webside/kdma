const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    const url = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url, authToken });

    console.log('--- Turso Production Detailed Check ---');

    // Check Products
    const products = await client.execute('SELECT COUNT(*) as count FROM "Product"');
    console.log('Products:', products.rows[0].count);
    if (products.rows[0].count > 0) {
        const productList = await client.execute('SELECT name FROM "Product" LIMIT 5');
        console.log('Product Examples:', productList.rows.map(r => r.name));
    }

    // Check Committee
    const committee = await client.execute('SELECT COUNT(*) as count FROM "CommitteeMember"');
    console.log('CommitteeMembers:', committee.rows[0].count);
    if (committee.rows[0].count > 0) {
        const committeeList = await client.execute('SELECT name, position FROM "CommitteeMember"');
        console.log('Committee Names:', committeeList.rows.map(r => `${r.name} (${r.position})`));
    }

    // Check Trainings
    const trainings = await client.execute('SELECT COUNT(*) as count FROM "Training"');
    console.log('Trainings:', trainings.rows[0].count);
    if (trainings.rows[0].count > 0) {
        const trainingList = await client.execute('SELECT title FROM "Training"');
        console.log('Training Titles:', trainingList.rows.map(r => r.title));
    }

    // Check Events
    const events = await client.execute('SELECT COUNT(*) as count FROM "Event"');
    console.log('Events:', events.rows[0].count);
    if (events.rows[0].count > 0) {
        const eventList = await client.execute('SELECT title FROM "Event"');
        console.log('Event Titles:', eventList.rows.map(r => r.title));
    }
}

main().catch(console.error);
