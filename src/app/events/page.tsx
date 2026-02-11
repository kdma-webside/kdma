import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import EventsHero from '@/components/EventsHero';
import EventSpotlightWrapper from '@/components/EventSpotlightWrapper';
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

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Suspense fallback={<div className="h-20 bg-black" />}>
                <Navbar />
                <EventsHero nextEvent={events[0]} />
                <EventSpotlightWrapper events={events} initialId={eventId as string} />
                <Footer />
                <ScrollToTop />
            </Suspense>
        </main>
    );
}
