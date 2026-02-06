'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getContent(area?: string) {
    if (area) {
        return await prisma.siteContent.findMany({
            where: { area },
            orderBy: { key: 'asc' }
        });
    }
    return await prisma.siteContent.findMany({
        orderBy: { area: 'asc' }
    });
}

export async function updateContent(id: string, value: string) {
    const content = await prisma.siteContent.update({
        where: { id },
        data: { value }
    });
    revalidatePath('/', 'layout');
    return content;
}

export async function initializeContent(data: any[]) {
    // Upsert initial content
    for (const item of data) {
        await prisma.siteContent.upsert({
            where: { key: item.key },
            update: {},
            create: item
        });
    }
    revalidatePath('/', 'layout');
}

