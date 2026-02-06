/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql', '@libsql/isomorphic-fetch'],
};

export default nextConfig;
