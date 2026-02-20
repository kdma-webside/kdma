const { createClient } = require('@libsql/client');

async function main() {
    console.log('--- Seeding Products (Without OrderItems Relation) ---');
    const prodUrl = 'https://kdma-kdma.aws-ap-south-1.turso.io';
    const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjUiLCJpYXQiOjE3NzAzNTE1NzYsInJpZCI6IjNjZDc0YzM3LTcxODgtNGU1NS1iYzU1LTcyYWQzZDA0MGM1MCJ9.DJX1hiI65-U3hKa6p3IwzkJTZSdqqaBIavdpC7tLS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw';

    const client = createClient({ url: prodUrl, authToken });

    const products = [
        { name: 'Professional Teak Pole', price: 12500, description: 'Handcrafted from seasoned teak wood, our professional poles meet international competition standards. Superior grip and perfect verticality.', image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?q=80&w=2000&auto=format&fit=crop', category: 'Equipment', rating: 4.9, isFeatured: true },
        { name: 'Elite Competition Rope', price: 3500, description: '100% pure cotton rope with specialized core for consistent tension. Professional grade for advanced aerial maneuvers.', image: '/images/training-ground.png', category: 'Equipment', rating: 4.8, isFeatured: true },
        { name: 'Performance Magnesium Grips', price: 450, description: 'High-purity magnesium carbonate blocks for ultimate moisture absorption and grip stability on pole or rope.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop', category: 'Accessories', rating: 4.7, isFeatured: false },
        { name: 'Training Uniform Set', price: 1200, description: 'Breathable, high-stretch fabric designed for unrestricted movement during intense Mallakhamb sessions. Set includes top and shorts.', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2000&auto=format&fit=crop', category: 'Apparel', rating: 4.6, isFeatured: false },
        { name: 'Mallakhamb Safety Mats', price: 8500, description: 'High-density impact absorption mats designed for landing zones. Foldable for easy storage and transportation.', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000&auto=format&fit=crop', category: 'Equipment', rating: 4.9, isFeatured: true },
        { name: 'Heritage Art Print', price: 2500, description: 'Limited edition print capturing the elegance of ancient Mallakhamb postures. Perfect for dojos or collectors.', image: '/images/heritage-master.png', category: 'Merchandise', rating: 5.0, isFeatured: false }
    ];

    try {
        // First, clear any existing OrderItems that reference Products
        console.log('Clearing OrderItems...');
        await client.execute('DELETE FROM "OrderItem"');

        // Now safely clear Products
        console.log('Clearing Products...');
        await client.execute('DELETE FROM "Product"');

        // Insert products
        console.log('Inserting Products...');
        for (const p of products) {
            const id = `prod_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Product" (id, name, price, description, image, category, rating, isFeatured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, p.name, p.price, p.description, p.image, p.category, p.rating, p.isFeatured ? 1 : 0, now, now]
            });
        }
        console.log(`✅ Inserted ${products.length} products successfully!`);
    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
    }
}

main().catch(console.error);
