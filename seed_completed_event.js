const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Seeding Completed Event for Memories ---');
    const url = process.env.DATABASE_URL || 'file:./dev.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;

    const client = createClient({ url, authToken });

    const completedEvent = {
        id: 'completed-demo-1',
        title: 'Legacy Masters Showcase 2023',
        description: 'An elite exhibition of Mallakhamb masters, preserving the ancient traditions with a breathtaking display of strength and agility.',
        eventDate: new Date('2023-11-20').toISOString(),
        month: 'Nov',
        day: '20',
        location: 'Heritage Grounds',
        status: 'completed',
        image: '/images/heritage-master.png'
    };

    try {
        const now = new Date().toISOString();
        await client.execute({
            sql: `INSERT INTO "Event" (id, title, description, eventDate, month, day, location, status, image, createdAt, updatedAt) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET status='completed'`,
            args: [
                completedEvent.id,
                completedEvent.title,
                completedEvent.description,
                completedEvent.eventDate,
                completedEvent.month,
                completedEvent.day,
                completedEvent.location,
                completedEvent.status,
                completedEvent.image,
                now,
                now
            ]
        });
        console.log('Successfully seeded completed event.');
    } catch (error) {
        console.error('Error seeding event:', error.message);
    }
}

main();
