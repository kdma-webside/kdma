import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'
// Triggering reload for schema update integration [2026-02-06]


const prismaClientSingleton = () => {
    let databaseUrl = process.env.DATABASE_URL as string;

    // Ensure absolute path for local file
    if (databaseUrl?.startsWith('file:')) {
        const relativePath = databaseUrl.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            const absolutePath = path.resolve(process.cwd(), relativePath);
            databaseUrl = `file:${absolutePath}`;
        }
    }

    console.log('[DB] Initializing Prisma with URL:', databaseUrl);

    const adapter = new PrismaLibSql({
        url: databaseUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
    })
    return new PrismaClient({ adapter })
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
