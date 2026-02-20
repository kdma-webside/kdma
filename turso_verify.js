const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Turso Remote Table Check ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    console.log('URL:', url);
    const client = createClient({ url, authToken });

    try {
        const res = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
        console.log('Tables found:', res.rows.map(r => r.name).join(', '));

        if (res.rows.some(r => r.name === 'Training')) {
            console.log('✅ TABLE "Training" EXISTS');
            const count = await client.execute('SELECT COUNT(*) as count FROM "Training"');
            console.log('Training count:', count.rows[0].count);
        } else {
            console.error('❌ TABLE "Training" MISSING');
        }

        if (res.rows.some(r => r.name === 'Camp')) {
            console.log('✅ TABLE "Camp" EXISTS');
        } else {
            console.error('❌ TABLE "Camp" MISSING');
        }
    } catch (error) {
        console.error('Diagnostic failed:', error.message);
    }
}

main();
