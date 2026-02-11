const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

// Basic .env parser
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

console.log('Targeting URL:', url);
if (!url) {
    console.error('ERROR: DATABASE_URL not found in .env');
    process.exit(1);
}

async function checkDb() {
    const client = createClient({ url, authToken });
    try {
        const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('Tables found:', tables.rows.map(r => r.name));

        const models = ['Admin', 'Product', 'Event', 'SiteContent', 'User'];
        for (const model of models) {
            try {
                const countRes = await client.execute(`SELECT COUNT(*) as count FROM "${model}"`);
                console.log(`${model} count:`, countRes.rows[0].count);
            } catch (e) {
                console.log(`${model} check failed:`, e.message);
            }
        }
    } catch (err) {
        console.error('Diagnostic failed:', err);
    }
}

checkDb();
