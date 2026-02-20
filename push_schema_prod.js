const { execSync } = require('child_process');

// Set environment variables
process.env.DATABASE_URL = 'https://kdma-kdma.aws-ap-south-1.turso.io';
process.env.TURSO_AUTH_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjUiLCJpYXQiOjE3NzAzNTE1NzYsInJpZCI6IjNjZDc0YzM3LTcxODgtNGU1NS1iYzU1LTcyYWQzZDA0MGM1MCJ9.DJX1hiI65-U3hKa6p3IwzkJTZSdqqaBIavdpC7tLS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw';

console.log('Pushing schema to production Turso database...');
try {
    execSync('npx prisma db push --accept-data-loss', {
        stdio: 'inherit',
        env: process.env
    });
    console.log('✅ Schema pushed successfully!');
} catch (error) {
    console.error('❌ Failed to push schema:', error.message);
    process.exit(1);
}
