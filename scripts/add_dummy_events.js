const { createClient } = require('@libsql/client');
const crypto = require('crypto');
require('dotenv').config();

async function main() {
    console.log('--- Creating Dummy Events ---');

    const args = process.argv.slice(2);
    const isProd = args.includes('--prod');

    let url = isProd ? "https://kdma-kdma.aws-ap-south-1.turso.io" : process.env.DATABASE_URL;
    let authToken = process.env.TURSO_AUTH_TOKEN;

    if (!isProd && url && url.startsWith('file:')) {
        const path = require('path');
        const relativePath = url.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            url = `file:${path.resolve(process.cwd(), relativePath)}`;
        }
    }

    if (!url) {
        console.error('ERROR: DATABASE_URL not found.');
        return;
    }

    console.log(`Connecting to: ${url}`);
    const client = createClient({ url, authToken });

    const events = [
        {
            title: "Tamil Nadu State Mallakhamb Championship 2026",
            description: "Witness the finest athletes from across the state compete for the prestigious gold in Pole, Rope, and Hanging Mallakhamb. A celebration of agility, strength, and tradition.",
            eventDate: "2026-03-20T09:00:00.000Z",
            endDate: "2026-03-22T18:00:00.000Z",
            month: "Mar",
            day: "20",
            location: "KDMA Academy Grounds, Kanyakumari",
            status: "upcoming",
            image: "/images/unified-hero-athlete.png"
        },
        {
            title: "Heritage Arts & Martial Performance Expo",
            description: "An evening of breathtaking performances featuring Mallakhamb, Silambam, and other traditional martial arts. Open to the public to explore our rich warrior history.",
            eventDate: "2026-04-05T17:00:00.000Z",
            endDate: "2026-04-05T21:00:00.000Z",
            month: "Apr",
            day: "05",
            location: "Town Mall, Kanyakumari",
            status: "upcoming",
            image: "/images/heritage-master.png"
        },
        {
            title: "Advanced Rope Mallakhamb Summer Intensive",
            description: "Master the art of Rope Mallakhamb under the guidance of veteran masters. Focused on grip techniques, advanced poses, and fluid transitions. Limited seats available.",
            eventDate: "2026-05-15T06:30:00.000Z",
            endDate: "2026-05-25T10:30:00.000Z",
            month: "May",
            day: "15",
            location: "Indoor Training Center",
            status: "upcoming",
            image: "/images/benefit-discipline.jpg"
        },
        {
            title: "National Youth Talent Hunt: Mallakhamb 2026",
            description: "Identifying the next generation of Mallakhamb stars. Age groups: U-14, U-17, and U-19. Top performers get full scholarships at KDMA Academy.",
            eventDate: "2026-06-10T08:00:00.000Z",
            endDate: "2026-06-11T16:00:00.000Z",
            month: "Jun",
            day: "10",
            location: "Sports Stadium Complex",
            status: "upcoming",
            image: "/images/athlete-hero.png"
        },
        {
            title: "World Mallakhamb Day Celebration",
            description: "Global synchronization of Mallakhamb performances. Join hundreds of practitioners for a massive display of traditional sports excellence.",
            eventDate: "2026-02-15T07:00:00.000Z",
            endDate: "2026-02-15T11:00:00.000Z",
            month: "Feb",
            day: "15",
            location: "Beachfront Arena, Kanyakumari",
            status: "upcoming",
            image: "/images/hero-athlete.jpg"
        }
    ];

    try {
        for (const event of events) {
            console.log(`Adding event: ${event.title}...`);
            const id = `evt_${crypto.randomBytes(4).toString('hex')}`;
            const now = new Date().toISOString();

            await client.execute({
                sql: `INSERT INTO "Event" (id, title, description, eventDate, endDate, month, day, location, status, image, createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    id,
                    event.title,
                    event.description,
                    event.eventDate,
                    event.endDate,
                    event.month,
                    event.day,
                    event.location,
                    event.status,
                    event.image,
                    now,
                    now
                ]
            });
        }
        console.log('\nSuccessfully created dummy events.');

        // Also add logic to clear the existing placeholders if they are the generic ones
        // But for safety, I'll just leave them for now unless asked to clear.

    } catch (error) {
        console.error('Failed to create dummy events:', error.message);
    }
}

main().catch(console.error);
