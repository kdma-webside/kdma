const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({ url, authToken });

    try {
        const trainings = await client.execute('SELECT count(*) as count FROM "Training"');
        console.log('Total Trainings:', trainings.rows[0].count);

        const camps = await client.execute('SELECT count(*) as count FROM "Camp"');
        console.log('Total Camps:', camps.rows[0].count);

        const trainingList = await client.execute('SELECT title, level FROM "Training"');
        console.table(trainingList.rows);

        const campList = await client.execute('SELECT title, location FROM "Camp"');
        console.table(campList.rows);
    } catch (error) {
        console.error('Error verifying data:', error.message);
    }
}

main();
