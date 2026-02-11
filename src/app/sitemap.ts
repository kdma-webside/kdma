import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/trainings`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/store`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    try {
        // Dynamic event pages
        const events = await prisma.event.findMany({
            select: { id: true, updatedAt: true },
            where: { status: 'upcoming' },
        });

        const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
            url: `${baseUrl}/events/${event.id}`,
            lastModified: event.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Dynamic training pages
        const trainings = await prisma.training.findMany({
            select: { id: true, updatedAt: true },
            where: { isActive: true },
        });

        const trainingPages: MetadataRoute.Sitemap = trainings.map((training) => ({
            url: `${baseUrl}/trainings/${training.id}`,
            lastModified: training.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...staticPages, ...eventPages, ...trainingPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return static pages only if database query fails
        return staticPages;
    }
}
