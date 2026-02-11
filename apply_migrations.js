const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return {};
    const content = fs.readFileSync(envPath, 'utf8');
    const config = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^\s*([^#\s]+)\s*=\s*(.*)$/);
        if (match) {
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            config[match[1]] = value;
        }
    });
    return config;
}

const env = loadEnv();
const url = env.DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN;

async function applyMigration() {
    const client = createClient({ url, authToken });
    try {
        console.log('Adding startDate column to Training table...');
        try {
            await client.execute('ALTER TABLE "Training" ADD COLUMN "startDate" TEXT');
            console.log('Successfully added startDate to Training.');
        } catch (e) {
            console.log('Note: startDate might already exist or failed:', e.message);
        }

        console.log('Adding endDate column to Event table...');
        try {
            await client.execute('ALTER TABLE "Event" ADD COLUMN "endDate" TEXT');
            console.log('Successfully added endDate to Event.');
        } catch (e) {
            console.log('Note: endDate might already exist or failed:', e.message);
        }
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

applyMigration();
