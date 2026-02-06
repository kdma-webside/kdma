import React from 'react';
import Navbar from '@/components/Navbar';
import EventsHero from '@/components/EventsHero';
import EventSpotlightWrapper from '@/components/EventSpotlightWrapper';
import Events, { defaultEventsData } from '@/components/Events';
import ScrollToTop from '@/components/ScrollToTop';
import { getEvents } from '@/app/actions/events';

export default async function EventsPage() {
    const events = await getEvents();
    const resolvedEvents = events;
    // Find the next upcoming event
    const upcomingEvents = resolvedEvents
        .filter(e => new Date(e.eventDate).getTime() > Date.now())
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    const nextEvent = upcomingEvents[0];

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <EventsHero nextEvent={nextEvent} />

            <EventSpotlightWrapper events={resolvedEvents} />
        </main>
    );
}
