import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
    const url = process.env.DATABASE_URL;
    const token = process.env.DATABASE_AUTH_TOKEN;

    console.log('--- Adding endDate to Event table ---');

    if (!url || (!url.startsWith('libsql:') && !url.startsWith('https:'))) {
        console.error('DATABASE_URL is not valid!');
        return;
    }

    const db = createClient({ url, authToken: token });

    try {
        console.log('Adding endDate column to Event table...');
        await db.execute('ALTER TABLE "Event" ADD COLUMN "endDate" TEXT;');
        console.log('✅ Event.endDate column added successfully!');
    } catch (error) {
        if (error.message?.includes('duplicate column')) {
            console.log('Column already exists, skipping.');
        } else {
            console.error('Error:', error.message);
        }
    }
}

migrate();
