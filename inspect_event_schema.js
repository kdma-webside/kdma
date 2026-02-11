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

async function inspectEventTable() {
    const client = createClient({ url, authToken });
    try {
        console.log('Inspecting Event table...');
        const res = await client.execute("PRAGMA table_info('Event')");
        console.log('Columns in Event table:');
        res.rows.forEach(row => {
            console.log(`- ${row.name} (${row.type})`);
        });
    } catch (err) {
        console.error('Inspection failed:', err);
    }
}

inspectEventTable();
