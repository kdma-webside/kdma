'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, unstable_noStore } from 'next/cache';

export async function getEvents() {
    unstable_noStore();
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                eventDate: true,
                month: true,
                day: true,
                location: true,
                status: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                formConfig: true
            }
        });
        if (!events) return [];

        // Sort manually in JS
        return events.sort((a: any, b: any) => {
            const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
            const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
            return dateA - dateB;
        });
    } catch (error) {
        console.error("Error fetching events during build:", error);
        return [];
    }
}

export async function getEventById(id: string) {
    return await prisma.event.findUnique({
        where: { id }
    });
}

export async function updateEvent(id: string, data: any) {
    if (data.eventDate && typeof data.eventDate === 'string') {
        data.eventDate = new Date(data.eventDate);
    }

    // Ensure formConfig is a string if it's an object
    if (data.formConfig && typeof data.formConfig !== 'string') {
        data.formConfig = JSON.stringify(data.formConfig);
    }

    const event = await prisma.event.update({
        where: { id },
        data
    });
    revalidatePath('/admin/events');
    revalidatePath('/events');
    revalidatePath('/');
    return event;
}

export async function createEvent(data: any) {
    if (data.eventDate && typeof data.eventDate === 'string') {
        data.eventDate = new Date(data.eventDate);
    }

    if (data.formConfig && typeof data.formConfig !== 'string') {
        data.formConfig = JSON.stringify(data.formConfig);
    }

    const event = await prisma.event.create({
        data
    });
    revalidatePath('/admin/events');
    revalidatePath('/events');
    revalidatePath('/');
    return event;
}

export async function deleteEvent(id: string) {
    await prisma.event.delete({
        where: { id }
    });
    revalidatePath('/admin/events');
    revalidatePath('/events');
}

export async function registerForEvent(eventId: string, data: any) {
    const registration = await prisma.eventRegistration.create({
        data: {
            eventId,
            userName: data.userName,
            userEmail: data.userEmail,
            userPhone: data.userPhone,
            responses: JSON.stringify(data.responses)
        }
    });
    return registration;
}

export async function getEventRegistrations() {
    return await prisma.eventRegistration.findMany({
        include: {
            event: true
        },
        orderBy: { createdAt: 'desc' }
    });
}
