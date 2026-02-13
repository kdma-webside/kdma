const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
    console.log('--- Seeding Committee Dummy Data (v2) ---');
    const url = process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
        console.error('DATABASE_URL is missing!');
        return;
    }

    const client = createClient({ url, authToken });

    const members = [
        // President
        { name: "Arun Kumar", position: "President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop", category: "President", order: 10, description: "Leading the foundation with vision and integrity." },

        // Vice president
        { name: "Deepika Sharma", position: "Vice President", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop", category: "Vice president", order: 20, description: "Strategic planning and organizational development expert." },

        // Secretary
        { name: "Rahul Varma", position: "Secretary", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop", category: "Secretary", order: 30, description: "Driving executive operations and administrative excellence." },

        // Joint secretary
        { name: "Priya Nair", position: "Joint Secretary", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop", category: "Joint secretary", order: 40, description: "Coordinating inter-departmental efforts and communications." },

        // Cordinator
        { name: "Suresh Menon", position: "Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop", category: "Cordinator", order: 50, description: "Bridge between athletes and the administration." },

        // Tressurer
        { name: "Vijay Singh", position: "Treasurer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop", category: "Tressurer", order: 60, description: "Ensuring financial transparency and resource management." },

        // Executive comittee
        { name: "Anish Kapur", position: "Executive Member", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop", category: "Executive comittee", order: 70, description: "Deciding on core strategic initiatives." },
        { name: "Meera Reddy", position: "Executive Member", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop", category: "Executive comittee", order: 80, description: "Expert in community engagement and outreach." },
        { name: "Karthik Jayam", position: "Executive Member", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2000&auto=format&fit=crop", category: "Executive comittee", order: 90, description: "Advocating for technological advancement in sports." },
    ];

    try {
        console.log('Clearing existing committee members...');
        await client.execute('DELETE FROM "CommitteeMember"');

        for (const member of members) {
            const id = `dummy_${Math.random().toString(36).substring(2, 11)}`;
            const now = new Date().toISOString();

            console.log(`Adding ${member.category}: ${member.name}...`);
            await client.execute({
                sql: `INSERT INTO "CommitteeMember" (id, name, position, image, category, "order", description, createdAt, updatedAt) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [id, member.name, member.position, member.image, member.category, member.order, member.description, now, now]
            });
        }
        console.log('Successfully seeded dummy committee data (v2).');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
}

main();
