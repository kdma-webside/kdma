const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Creating CommitteeMember Table ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    const sql = `
    CREATE TABLE IF NOT EXISTS "CommitteeMember" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "position" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "description" TEXT,
        "category" TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
    );
    `;

    try {
        console.log('Executing SQL...');
        await client.execute(sql);
        console.log('Successfully created CommitteeMember table.');
    } catch (error) {
        console.error('Error creating table:', error.message);
    }
}

main();
