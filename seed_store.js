const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Seeding Store Items Dummy Data ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    const products = [
        {
            name: "Professional Teak Pole",
            price: 12500,
            description: "Handcrafted from seasoned teak wood, our professional poles meet international competition standards. Superior grip and perfect verticality.",
            image: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?q=80&w=2000&auto=format&fit=crop",
            category: "Equipment",
            rating: 4.9,
            isFeatured: true
        },
        {
            name: "Elite Competition Rope",
            price: 3500,
            description: "100% pure cotton rope with specialized core for consistent tension. Professional grade for advanced aerial maneuvers.",
            image: "/images/training-ground.png",
            category: "Equipment",
            rating: 4.8,
            isFeatured: true
        },
        {
            name: "Performance Magnesium Grips",
            price: 450,
            description: "High-purity magnesium carbonate blocks for ultimate moisture absorption and grip stability on pole or rope.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop",
            category: "Accessories",
            rating: 4.7,
            isFeatured: false
        },
        {
            name: "Training Uniform Set",
            price: 1200,
            description: "Breathable, high-stretch fabric designed for unrestricted movement during intense Mallakhamb sessions. Set includes top and shorts.",
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2000&auto=format&fit=crop",
            category: "Apparel",
            rating: 4.6,
            isFeatured: false
        },
        {
            name: "Mallakhamb Safety Mats",
            price: 8500,
            description: "High-density impact absorption mats designed for landing zones. Foldable for easy storage and transportation.",
            image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000&auto=format&fit=crop",
            category: "Equipment",
            rating: 4.9,
            isFeatured: true
        },
        {
            name: "Heritage Art Print",
            price: 2500,
            description: "Limited edition print capturing the elegance of ancient Mallakhamb postures. Perfect for dojos or collectors.",
            image: "/images/heritage-master.png",
            category: "Merchandise",
            rating: 5.0,
            isFeatured: false
        }
    ];

    try {
        // console.log('Clearing existing Products...');
        // await client.execute('DELETE FROM "Product"');

        console.log('Inserting Products...');
        for (const p of products) {
            const id = `prod_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();
            await client.execute({
                sql: `INSERT INTO "Product" (id, name, price, description, image, category, rating, isFeatured, createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, p.name, p.price, p.description, p.image, p.category, p.rating, p.isFeatured ? 1 : 0, now, now]
            });
        }

        console.log('Successfully seeded Store Items.');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
}

main();
