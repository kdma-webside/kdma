'use server';

import prisma from '@/lib/db';

export type DashboardStats = {
    productsCount: number;
    eventsCount: number;
    enquiriesCount: number;
    recentActivities: {
        msg: string;
        time: Date;
        type: 'recruit' | 'store' | 'event' | 'security' | 'other';
    }[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
    const [productsCount, eventsCount, enquiriesCount, recentEnquiries, recentEvents] = await Promise.all([
        prisma.product.count(),
        prisma.event.count({
            where: {
                eventDate: {
                    gte: new Date(),
                },
            },
        }),
        prisma.enquiry.count(),
        prisma.enquiry.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                name: true,
                interest: true,
                createdAt: true,
            },
        }),
        prisma.event.findMany({
            take: 2,
            orderBy: { createdAt: 'desc' },
            select: {
                title: true,
                status: true,
                createdAt: true,
            },
        }),
    ]);

    const activities: DashboardStats['recentActivities'] = [];

    recentEnquiries.forEach((enquiry) => {
        activities.push({
            msg: `New Enquiry from ${enquiry.name} regarding ${enquiry.interest}`,
            time: enquiry.createdAt,
            type: 'recruit',
        });
    });

    recentEvents.forEach((event) => {
        activities.push({
            msg: `Event "${event.title}" status is ${event.status}`,
            time: event.createdAt,
            type: 'event',
        });
    });

    // Sort by time desc
    activities.sort((a, b) => b.time.getTime() - a.time.getTime());

    return {
        productsCount,
        eventsCount,
        enquiriesCount,
        recentActivities: activities.slice(0, 5),
    };
}
