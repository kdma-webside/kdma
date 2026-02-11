const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Syncing Document Table to Turso ---');

    // Use Turso URL from .env or fallback
    const url = process.env.DATABASE_URL?.startsWith('libsql')
        ? process.env.DATABASE_URL
        : "libsql://kdma-kdma.aws-ap-south-1.turso.io";
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('Target URL:', url);

    if (!url) {
        console.error('No DATABASE_URL found!');
        return;
    }

    const client = createClient({ url, authToken });

    const sql = `CREATE TABLE IF NOT EXISTS "Document" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "description" TEXT,
        "fileName" TEXT NOT NULL,
        "filePath" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "fileSize" INTEGER NOT NULL,
        "fileType" TEXT NOT NULL,
        "isPublic" BOOLEAN NOT NULL DEFAULT 1,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;

    try {
        console.log(`Executing SQL to create Document table...`);
        await client.execute(sql);
        console.log('Success: Document table is ready.');
    } catch (error) {
        console.error('Error:', error.message);
    }

    console.log('Sync Complete.');
}

main();
