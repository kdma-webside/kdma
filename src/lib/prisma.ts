// Initializing Prisma Client for Turso
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'
// Explicitly load env vars just in case
import 'dotenv/config'

const prismaClientSingleton = () => {
    // 1. RAW RETRIEVAL
    let rawUrl = process.env.DATABASE_URL;
    let rawAuth = process.env.TURSO_AUTH_TOKEN;

    // 2. HARDCODED FALLBACKS
    const FALLBACK_URL = "https://kdma-kdma.aws-ap-south-1.turso.io";
    const FALLBACK_AUTH = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjU.LS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw";

    // 3. DEFENSIVE SANITIZATION
    // Check for "undefined" string literal, empty string, or actual undefined
    const isValidUrl = (u: string | undefined): boolean => {
        return !!u && u !== "undefined" && u.trim() !== "";
    };

    let finalUrl = isValidUrl(rawUrl) ? rawUrl as string : FALLBACK_URL;
    let finalAuth = isValidUrl(rawAuth) ? rawAuth as string : FALLBACK_AUTH;

    console.log('[DB] DEBUG: Raw URL:', rawUrl);
    console.log('[DB] DEBUG: Final URL to use:', finalUrl);

    // 4. LOCAL FILE PATH HANDLING
    if (finalUrl?.startsWith('file:')) {
        const relativePath = finalUrl.replace('file:', '');
        if (!path.isAbsolute(relativePath)) {
            const absolutePath = path.resolve(process.cwd(), relativePath);
            finalUrl = `file:${absolutePath}`;
        }
    }

    // 5. ADAPTER INITIALIZATION
    // Using explicit configuration object for PrismaLibSql
    const adapter = new PrismaLibSql({
        url: finalUrl,
        authToken: finalAuth,
    })

    const client = new PrismaClient({ adapter });
    console.log('[DB] New Prisma Client Initialized. Models:', Object.keys(client).filter(k => !k.startsWith('_') && !k.startsWith('$')));
    return client;
}

declare global {
    var prismaNew: undefined | ReturnType<typeof prismaClientSingleton>
}

// Self-healing: Clear global instance if models are missing (classic Next.js dev cache issue)
if (process.env.NODE_ENV !== 'production' && globalThis.prismaNew) {
    const p = globalThis.prismaNew as any;
    if (!p.training || !p.committeeMember) {
        console.warn('[DB] Stale Prisma instance detected (missing Training or CommitteeMember model). Clearing global cache...');
        globalThis.prismaNew = undefined;
    }
}

const prisma = globalThis.prismaNew ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaNew = prisma
