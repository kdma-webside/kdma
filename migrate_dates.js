import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
    const url = process.env.DATABASE_URL;

    console.log('--- Turso Remote Migration (Date Fields) ---');
    console.log('Target URL:', url);

    if (!url || (!url.startsWith('libsql:') && !url.startsWith('https:'))) {
        console.error('DATABASE_URL is not pointing to Turso! Current URL:', url);
        return;
    }

    const db = createClient({
        url: url,
        authToken: process.env.DATABASE_AUTH_TOKEN
    });

    const migrations = [
        `ALTER TABLE "Event" ADD COLUMN "endDate" TEXT;`,
        `ALTER TABLE "Training" ADD COLUMN "startDate" TEXT;`,
        `ALTER TABLE "Training" ADD COLUMN "endDate" TEXT;`,
    ];

    for (const sql of migrations) {
        console.log(`Executing SQL: ${sql.substring(0, 50)}...`);
        try {
            await db.execute(sql);
            console.log('Success.');
        } catch (error) {
            if (error.message?.includes('duplicate column')) {
                console.log('Column already exists, skipping.');
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    console.log('Migration Complete.');
}

migrate();
