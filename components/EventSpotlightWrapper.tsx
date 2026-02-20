'use client';

import React, { useState, useMemo, useEffect } from 'react';
import EventSpotlight from './EventSpotlight';
import Events, { defaultEventsData } from './Events';
import EventCalendar from './EventCalendar';

interface EventSpotlightWrapperProps {
    events: any[];
    initialId?: string;
}

const EventSpotlightWrapper = ({ events, initialId }: EventSpotlightWrapperProps) => {
    const eventIdFromUrl = initialId;

    const now = new Date();
    // Sort events by date ascending, handling cases where eventDate might be missing (for demo data)
    const sortedEvents = useMemo(() => {
        // Use only fetched events to avoid duplicates with hardcoded dummy data
        const rawData = events;

        // Remove duplicates based on ID
        const uniqueEvents = Array.from(new Map(rawData.map(item => [item.id, item])).values());

        return uniqueEvents.map(e => ({
            ...e,
            eventDate: e.eventDate || new Date(2026, 9, 15).toISOString(), // Fallback
            month: e.month || new Date(e.eventDate).toLocaleString('default', { month: 'short' }),
            day: e.day || new Date(e.eventDate).getDate().toString()
        })).sort((a: any, b: any) => {
            const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
            const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
            return dateA - dateB;
        });
    }, [events]);

    // Separate upcoming and completed events
    const upcomingEvents = useMemo(() => {
        return sortedEvents.filter(e => e.status === 'upcoming');
    }, [sortedEvents]);

    const completedEvents = useMemo(() => {
        return sortedEvents.filter(e => e.status === 'completed');
    }, [sortedEvents]);

    // Find nearest upcoming event for default selection
    const nearestUpcomingEvent = useMemo(() => {
        return upcomingEvents.find(e => e.eventDate && new Date(e.eventDate) >= now) || upcomingEvents[0];
    }, [upcomingEvents]);

    const [selectedEventId, setSelectedEventId] = useState(eventIdFromUrl || nearestUpcomingEvent?.id);

    useEffect(() => {
        if (eventIdFromUrl) {
            setSelectedEventId(eventIdFromUrl);
        }
    }, [eventIdFromUrl]);

    const todayAtMidnight = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const activeEvent = useMemo(() => {
        const found = upcomingEvents.find(e => e.id === selectedEventId);
        const calculateDays = (dateStr: string | Date) => {
            const eventD = new Date(dateStr);
            eventD.setHours(0, 0, 0, 0);
            const diffTime = eventD.getTime() - todayAtMidnight.getTime();
            return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        };

        if (found) {
            return {
                ...found,
                date: { month: found.month, day: found.day },
                daysRemaining: calculateDays(found.eventDate)
            };
        }
        const defaultEvent = nearestUpcomingEvent || upcomingEvents[0];
        if (!defaultEvent) return null;

        return {
            ...defaultEvent,
            date: { month: defaultEvent?.month, day: defaultEvent?.day },
            daysRemaining: defaultEvent ? calculateDays(defaultEvent.eventDate) : 0
        };
    }, [selectedEventId, upcomingEvents, nearestUpcomingEvent, todayAtMidnight]);

    const handleEventSelect = (id: string) => {
        setSelectedEventId(id);
        const spotlightElement = document.getElementById('event-spotlight');
        if (spotlightElement) {
            spotlightElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div id="event-spotlight">
                {activeEvent && <EventSpotlight event={activeEvent} />}
            </div>

            <EventCalendar
                events={upcomingEvents}
                onEventSelect={handleEventSelect}
                selectedEventId={selectedEventId}
            />

            <Events
                showHeader={false}
                onEventSelect={handleEventSelect}
                selectedEventId={selectedEventId}
                initialEvents={upcomingEvents}
            />

            {completedEvents.length > 0 && (
                <div className="pt-20 border-t border-white/5">
                    <Events
                        showHeader={true}
                        title="Completed & Memories"
                        subTitle="MUSEUM"
                        initialEvents={completedEvents}
                    />
                </div>
            )}
        </>
    );
};

export default EventSpotlightWrapper;
