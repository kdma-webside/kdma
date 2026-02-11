'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCommitteeMembers() {
    console.log('--- DEBUG: getCommitteeMembers ---');

    // Explicitly check for the model on the imported prisma instance
    const p = prisma as any;
    if (!p.committeeMember) {
        console.warn('CRITICAL: prisma.committeeMember is undefined. Attempting to reload global instance...');
        // In dev, the global singleton might be stale
        if (typeof global !== 'undefined' && (global as any).prismaNew) {
            console.log('Clearing global.prismaNew...');
            (global as any).prismaNew = undefined;
        }
        // Throw an error that the frontend can catch/display better
        throw new Error('Prisma Client is missing the CommitteeMember model. Please restart the development server (npm run dev).');
    }

    try {
        return await p.committeeMember.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });
    } catch (error: any) {
        console.error('Error in getCommitteeMembers:', error);
        throw error;
    }
}

export async function createCommitteeMember(data: any) {
    const member = await prisma.committeeMember.create({
        data: {
            name: data.name,
            position: data.position,
            image: data.image,
            description: data.description,
            category: data.category,
            order: parseInt(data.order) || 0,
        }
    });
    revalidatePath('/committee');
    revalidatePath('/admin/committee');
    return member;
}

export async function updateCommitteeMember(id: string, data: any) {
    const member = await prisma.committeeMember.update({
        where: { id },
        data: {
            name: data.name,
            position: data.position,
            image: data.image,
            description: data.description,
            category: data.category,
            order: parseInt(data.order) || 0,
        }
    });
    revalidatePath('/committee');
    revalidatePath('/admin/committee');
    return member;
}

export async function deleteCommitteeMember(id: string) {
    await prisma.committeeMember.delete({ where: { id } });
    revalidatePath('/committee');
    revalidatePath('/admin/committee');
}

export async function updateCommitteeOrder(id: string, newOrder: number) {
    await prisma.committeeMember.update({
        where: { id },
        data: { order: newOrder }
    });
    revalidatePath('/committee');
}
