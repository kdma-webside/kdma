const { createClient } = require('@libsql/client');

async function main() {
    console.log('--- Seeding Production Database ---');
    const prodUrl = 'https://kdma-kdma.aws-ap-south-1.turso.io';
    const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjUiLCJpYXQiOjE3NzAzNTE1NzYsInJpZCI6IjNjZDc0YzM3LTcxODgtNGU1NS1iYzU1LTcyYWQzZDA0MGM1MCJ9.DJX1hiI65-U3hKa6p3IwzkJTZSdqqaBIavdpC7tLS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw';

    const client = createClient({ url: prodUrl, authToken });

    // 1. Seed Committee Members
    console.log('\n1. Seeding Committee Members...');
    const committeeMembers = [
        { name: 'R. Selvan', position: 'President', image: '/images/heritage-master.png', category: 'Executive', order: 1, description: 'Leading KDMA with vision and dedication' },
        { name: 'K. Kumar', position: 'Vice President', image: '/images/training-ground.png', category: 'Executive', order: 2, description: 'Supporting organizational growth' },
        { name: 'S. Rajesh', position: 'Secretary', image: '/images/heritage-master.png', category: 'Executive', order: 3, description: 'Managing administrative affairs' },
        { name: 'M. Prasad', position: 'Treasurer', image: '/images/training-ground.png', category: 'Executive', order: 4, description: 'Overseeing financial matters' },
        { name: 'A. Ramesh', position: 'Coach', image: '/images/heritage-master.png', category: 'Technical', order: 5, description: 'Head coach for advanced training' },
        { name: 'P. Suresh', position: 'Assistant Coach', image: '/images/training-ground.png', category: 'Technical', order: 6, description: 'Supporting training programs' },
        { name: 'V. Arun', position: 'Committee Member', image: '/images/heritage-master.png', category: 'General', order: 7, description: 'Contributing to organizational development' },
        { name: 'N. Ganesh', position: 'Committee Member', image: '/images/training-ground.png', category: 'General', order: 8, description: 'Supporting community initiatives' }
    ];

    try {
        await client.execute('DELETE FROM "CommitteeMember"');
        for (const member of committeeMembers) {
            const id = `cm_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "CommitteeMember" (id, name, position, image, description, category, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, member.name, member.position, member.image, member.description, member.category, member.order, now, now]
            });
        }
        console.log(`✅ Inserted ${committeeMembers.length} committee members`);
    } catch (error) {
        console.error('❌ Error seeding committee:', error.message);
    }

    // 2. Seed Store Products
    console.log('\n2. Seeding Store Products...');
    const products = [
        { name: 'Professional Teak Pole', price: 12500, description: 'Handcrafted from seasoned teak wood, our professional poles meet international competition standards. Superior grip and perfect verticality.', image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?q=80&w=2000&auto=format&fit=crop', category: 'Equipment', rating: 4.9, isFeatured: true },
        { name: 'Elite Competition Rope', price: 3500, description: '100% pure cotton rope with specialized core for consistent tension. Professional grade for advanced aerial maneuvers.', image: '/images/training-ground.png', category: 'Equipment', rating: 4.8, isFeatured: true },
        { name: 'Performance Magnesium Grips', price: 450, description: 'High-purity magnesium carbonate blocks for ultimate moisture absorption and grip stability on pole or rope.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop', category: 'Accessories', rating: 4.7, isFeatured: false },
        { name: 'Training Uniform Set', price: 1200, description: 'Breathable, high-stretch fabric designed for unrestricted movement during intense Mallakhamb sessions. Set includes top and shorts.', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2000&auto=format&fit=crop', category: 'Apparel', rating: 4.6, isFeatured: false },
        { name: 'Mallakhamb Safety Mats', price: 8500, description: 'High-density impact absorption mats designed for landing zones. Foldable for easy storage and transportation.', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000&auto=format&fit=crop', category: 'Equipment', rating: 4.9, isFeatured: true },
        { name: 'Heritage Art Print', price: 2500, description: 'Limited edition print capturing the elegance of ancient Mallakhamb postures. Perfect for dojos or collectors.', image: '/images/heritage-master.png', category: 'Merchandise', rating: 5.0, isFeatured: false }
    ];

    try {
        await client.execute('DELETE FROM "Product"');
        for (const p of products) {
            const id = `prod_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Product" (id, name, price, description, image, category, rating, isFeatured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, p.name, p.price, p.description, p.image, p.category, p.rating, p.isFeatured ? 1 : 0, now, now]
            });
        }
        console.log(`✅ Inserted ${products.length} products`);
    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
    }

    // 3. Seed Trainings
    console.log('\n3. Seeding Trainings...');
    const trainings = [
        { title: 'Beginner Mallakhamb Foundation', description: 'Master the fundamentals of pole Mallakhamb with our comprehensive beginner program. Learn basic postures, grips, and safety techniques.', duration: '3 months', level: 'Beginner', image: '/images/training-ground.png', category: 'Regular', isActive: true },
        { title: 'Advanced Aerial Techniques', description: 'Take your skills to new heights with advanced rope and pole combinations. Perfect for competitive aspirants.', duration: '6 months', level: 'Advanced', image: '/images/heritage-master.png', category: 'Regular', isActive: true }
    ];

    try {
        await client.execute('DELETE FROM "Training"');
        for (const t of trainings) {
            const id = `tr_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Training" (id, title, description, duration, level, image, category, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, t.title, t.description, t.duration, t.level, t.image, t.category, t.isActive ? 1 : 0, now, now]
            });
        }
        console.log(`✅ Inserted ${trainings.length} trainings`);
    } catch (error) {
        console.error('❌ Error seeding trainings:', error.message);
    }

    // 4. Add a completed event for the memories section
    console.log('\n4. Seeding Events...');
    const events = [
        { title: 'National Mallakhamb Championship 2025', description: 'Witness the finest Mallakhamb athletes compete at the national level.', eventDate: '2025-12-15T10:00:00Z', month: 'DEC', day: '15', location: 'District Sports Complex, Kanyakumari', status: 'completed', image: '/images/training-ground.png' }
    ];

    try {
        const existingCount = await client.execute('SELECT COUNT(*) as count FROM "Event"');
        if (existingCount.rows[0].count < 5) {
            for (const e of events) {
                const id = `evt_${Math.random().toString(36).substring(2, 11)}`;
                const now = new Date().toISOString();
                await client.execute({
                    sql: `INSERT INTO "Event" (id, title, description, eventDate, month, day, location, status, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    args: [id, e.title, e.description, e.eventDate, e.month, e.day, e.location, e.status, e.image, now, now]
                });
            }
            console.log(`✅ Inserted ${events.length} events`);
        } else {
            console.log('✅ Events already exist, skipping...');
        }
    } catch (error) {
        console.error('❌ Error seeding events:', error.message);
    }

    console.log('\n✅ Production database seeding complete!');
}

main().catch(console.error);
