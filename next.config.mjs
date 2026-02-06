/** @type {import('next').NextConfig} */
// Force restart [2026-02-07]
const nextConfig = {
    serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql', '@libsql/isomorphic-fetch', '@prisma/client'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
