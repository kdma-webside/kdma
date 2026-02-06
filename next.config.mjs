/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql', '@libsql/isomorphic-fetch', '@prisma/client'],
};

export default nextConfig;
