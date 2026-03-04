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
const url = env.DATABASE_URL || "https://kdma-kdma.aws-ap-south-1.turso.io";
const authToken = env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjU.LS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw";

async function updatePastEvents() {
    const client = createClient({ url, authToken });
    const now = new Date();
    try {
        console.log('Fetching all upcoming events...');
        const res = await client.execute("SELECT id, title, eventDate FROM Event WHERE status = 'upcoming'");

        for (const row of res.rows) {
            const eventDate = new Date(row.eventDate);
            if (eventDate < now) {
                console.log(`Updating event "${row.title}" (ID: ${row.id}) to "completed" since it occurred on ${row.eventDate}`);
                await client.execute({
                    sql: "UPDATE Event SET status = 'completed' WHERE id = ?",
                    args: [row.id]
                });
            }
        }
        console.log('✅ Update complete.');
    } catch (err) {
        console.error('Update failed:', err);
    }
}

updatePastEvents();
