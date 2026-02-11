const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Turso Remote Migration (Registration) ---');
    // Explicitly read from .env to be sure
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('Target URL:', url);

    if (!url || (!url.startsWith('libsql:') && !url.startsWith('https:'))) {
        console.error('DATABASE_URL is not pointing to Turso! Current URL:', url);
        return;
    }

    const client = createClient({ url, authToken });

    const statements = [
        // Add formConfig to Training
        `ALTER TABLE "Training" ADD COLUMN "formConfig" TEXT;`,

        // Add formConfig to Camp
        `ALTER TABLE "Camp" ADD COLUMN "formConfig" TEXT;`,

        // TrainingRegistration Table
        `CREATE TABLE IF NOT EXISTS "TrainingRegistration" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "trainingId" TEXT NOT NULL,
            "userName" TEXT NOT NULL,
            "userEmail" TEXT NOT NULL,
            "userPhone" TEXT NOT NULL,
            "responses" TEXT NOT NULL,
            "status" TEXT NOT NULL DEFAULT 'registered',
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "TrainingRegistration_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );`,

        // CampRegistration Table
        `CREATE TABLE IF NOT EXISTS "CampRegistration" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "campId" TEXT NOT NULL,
            "userName" TEXT NOT NULL,
            "userEmail" TEXT NOT NULL,
            "userPhone" TEXT NOT NULL,
            "responses" TEXT NOT NULL,
            "status" TEXT NOT NULL DEFAULT 'registered',
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "CampRegistration_campId_fkey" FOREIGN KEY ("campId") REFERENCES "Camp" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );`
    ];

    for (const sql of statements) {
        try {
            console.log(`Executing SQL: ${sql.substring(0, 50)}...`);
            await client.execute(sql);
            console.log('Success.');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    console.log('Migration Complete.');
}

main();
