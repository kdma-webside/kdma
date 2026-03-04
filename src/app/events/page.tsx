import React, { Suspense } from 'react';
import EventsHero from '@/components/EventsHero';
import EventSpotlightWrapper from '@/components/EventSpotlightWrapper';
import Footer from '@/components/Footer';
import { getEvents } from '@/app/actions/events';
import { unstable_noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    unstable_noStore();
    const { id: eventId } = await searchParams;
    const events = await getEvents();
    const now = new Date();
    const futureEvents = events.filter(e => new Date(e.eventDate) >= now);
    const nextEvent = futureEvents.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())[0];

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Suspense fallback={<div className="h-20 bg-black" />}>
                <EventsHero nextEvent={nextEvent} />
                <EventSpotlightWrapper events={events} initialId={eventId as string} />
                <Footer />
            </Suspense>
        </main>
    );
}
