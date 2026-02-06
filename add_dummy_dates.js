import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

async function addDummyDates() {
    const url = process.env.DATABASE_URL;
    const token = process.env.DATABASE_AUTH_TOKEN;

    console.log('--- Adding Dummy Dates to Trainings ---');

    if (!url || (!url.startsWith('libsql:') && !url.startsWith('https:'))) {
        console.error('DATABASE_URL is not valid! Current URL:', url);
        return;
    }

    const db = createClient({ url, authToken: token });

    try {
        // Get all trainings
        const trainings = await db.execute('SELECT id, title FROM Training');
        console.log(`Found ${trainings.rows.length} trainings`);

        // Add dummy dates (30 days from now to 120 days from now)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 30);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 120);

        for (const training of trainings.rows) {
            const updateSql = `UPDATE Training SET startDate = ?, endDate = ? WHERE id = ?`;
            await db.execute({
                sql: updateSql,
                args: [startDate.toISOString(), endDate.toISOString(), training.id]
            });
            console.log(`Updated: ${training.title}`);
        }

        console.log('✅ All trainings updated with dummy dates!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

addDummyDates();
