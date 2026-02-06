import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import EventsHero from '@/components/EventsHero';
import EventSpotlightWrapper from '@/components/EventSpotlightWrapper';
import Events, { defaultEventsData } from '@/components/Events';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
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
    const resolvedEvents = events;
    // Find the next upcoming event
    const upcomingEvents = resolvedEvents
        .filter(e => new Date(e.eventDate).getTime() > Date.now())
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    const nextEvent = upcomingEvents[0];

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Suspense fallback={<div className="h-20 bg-black" />}>
                <Navbar />
                <EventsHero nextEvent={resolvedEvents[0]} />
                <EventSpotlightWrapper events={resolvedEvents} initialId={eventId as string} />
                <Events initialEvents={resolvedEvents} />
                <Footer />
                <ScrollToTop />
            </Suspense>
        </main>
    );
}
