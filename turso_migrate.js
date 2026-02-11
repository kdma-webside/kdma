const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Turso Remote Migration (Retry) ---');
    // Explicitly read from .env to be sure
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('Target URL:', url);

    if (!url || !url.startsWith('libsql:')) {
        console.error('DATABASE_URL is not pointing to Turso! Current URL:', url);
        return;
    }

    const client = createClient({ url, authToken });

    const statements = [
        // User Table
        `CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
    );`,
        `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`,

        // OtpVerification Table
        `CREATE TABLE IF NOT EXISTS "OtpVerification" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "phone" TEXT NOT NULL,
        "code" TEXT NOT NULL,
        "expiresAt" DATETIME NOT NULL,
        "verifiedAt" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
        `CREATE UNIQUE INDEX IF NOT EXISTS "OtpVerification_phone_key" ON "OtpVerification"("phone");`,

        // PasswordReset Table
        `CREATE TABLE IF NOT EXISTS "PasswordReset" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expiresAt" DATETIME NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
        `CREATE UNIQUE INDEX IF NOT EXISTS "PasswordReset_email_key" ON "PasswordReset"("email");`,
        `CREATE UNIQUE INDEX IF NOT EXISTS "PasswordReset_token_key" ON "PasswordReset"("token");`,

        // NewsletterSubscriber Table
        `CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
        `CREATE UNIQUE INDEX IF NOT EXISTS "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");`
    ];

    for (const sql of statements) {
        try {
            console.log(`Executing SQL...`);
            await client.execute(sql);
            console.log('Success.');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    console.log('Migration Complete.');
}

main();
