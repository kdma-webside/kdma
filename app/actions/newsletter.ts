'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- Subscriptions ---

export async function subscribeToNewsletter(email: string) {
    try {
        // Debug check
        if (!(prisma as any).newsletterSubscriber) {
            console.error('[DB_ERROR] newsletterSubscriber not found in Prisma client. Keys:', Object.keys(prisma));
            return { success: false, message: "Server registry mismatch. Please restart the application." };
        }

        await (prisma as any).newsletterSubscriber.upsert({
            where: { email },
            update: {},
            create: { email }
        });
        return { success: true, message: "Welcome to the Inner Circle." };
    } catch (error: any) {
        console.error('[NEWSLETTER_ERROR]', error);
        return { success: false, message: error.message || "Protocol failure. Please try later." };
    }
}

export async function getSubscribers() {
    return await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

// --- Content Management ---

export async function getNewsletterContent() {
    return await prisma.newsletterContent.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function createNewsletterUpdate(data: { subject: string; content: string }) {
    const update = await prisma.newsletterContent.create({
        data: {
            subject: data.subject,
            content: data.content,
            status: 'draft'
        }
    });
    revalidatePath('/admin/newsletter');
    return update;
}

export async function updateNewsletterUpdate(id: string, data: Partial<{ subject: string; content: string; status: string }>) {
    const update = await prisma.newsletterContent.update({
        where: { id },
        data: {
            ...data,
            sentAt: data.status === 'sent' ? new Date() : undefined
        }
    });
    revalidatePath('/admin/newsletter');
    return update;
}

export async function deleteNewsletterUpdate(id: string) {
    await prisma.newsletterContent.delete({
        where: { id }
    });
    revalidatePath('/admin/newsletter');
}
