const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Restoring Admin Credentials ---');
    const url = process.env.DATABASE_URL || 'file:./dev.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;

    const client = createClient({ url, authToken });

    const adminData = {
        username: 'admin',
        password: 'malla_password_2026'
    };

    const userData = {
        name: 'Admin',
        email: 'hellokdma@gmail.com', // Using the email from .env
        phone: '0000000000',
        password: 'malla_password_2026'
    };

    try {
        const now = new Date().toISOString();

        // Restore Admin table
        const adminId = `adm_${Math.random().toString(36).substring(2, 11)}`;
        console.log('Inserting into Admin table...');
        await client.execute({
            sql: `INSERT INTO "Admin" (id, username, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
            args: [adminId, adminData.username, adminData.password, now, now]
        });

        // Restore User table (since sometimes admin uses this too)
        const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
        console.log('Inserting into User table...');
        await client.execute({
            sql: `INSERT INTO "User" (id, name, email, phone, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [userId, userData.name, userData.email, userData.phone, userData.password, now, now]
        });

        console.log('\n--- Admin Credentials Restored ---');
        console.log(`Username/Email: ${adminData.username} / ${userData.email}`);
        console.log(`Password: ${adminData.password}`);
    } catch (error) {
        console.error('Error restoring admin:', error.message);
    }
}

main();
