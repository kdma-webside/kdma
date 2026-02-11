'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import { Sparkles, Timer, Globe, ChevronRight, ChevronLeft } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    eventDate: string | Date;
    location: string;
    image: string;
}

interface EventCalendarProps {
    events: Event[];
    onEventSelect: (id: string) => void;
    selectedEventId?: string;
}

const EventCalendar = ({ events, onEventSelect, selectedEventId }: EventCalendarProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const lastTickRef = useRef<number>(-1);
    const [containerWidth, setContainerWidth] = useState(0);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 40 });

    // Day item configuration
    const DAY_WIDTH = 220; // Significantly increased spacing for a cleaner, open look
    const BUFFER_ITEMS = 15; // Extra items to render outside viewport

    // Fetch today's date for reference
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // Generate days for 2024-2030 (full calendar range)
    const { days } = useMemo(() => {
        const startYear = 2024;
        const endYear = 2030;
        const days = [];
        const start = new Date(startYear, 0, 1);
        const end = new Date(endYear, 11, 31);

        let current = new Date(start);
        while (current <= end) {
            const dateStr = current.toISOString().slice(0, 10);
            const dayEvents = events.filter(e => {
                const ed = new Date(e.eventDate);
                return !isNaN(ed.getTime()) && ed.toISOString().slice(0, 10) === dateStr;
            });

            days.push({
                date: new Date(current),
                hasEvents: dayEvents.length > 0,
                eventId: dayEvents[0]?.id
            });
            current.setDate(current.getDate() + 1);
        }
        return { days };
    }, [events]);

    // Audio Feedback Logic
    const playTickSound = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = 'triangle'; // Crisper sound
            oscillator.frequency.setValueAtTime(400, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.05);
        } catch (e) { }
    };

    const x = useMotionValue(0);
    const [currentMonthYear, setCurrentMonthYear] = useState("");

    // Measure container width
    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Virtualization Logic
    useEffect(() => {
        const unsubscribe = x.on("change", (latestX) => {
            const width = containerWidth || 1000;
            const centerOffset = width / 2;

            // Calculate center index
            const centerIndex = Math.round((-latestX + centerOffset - DAY_WIDTH / 2) / DAY_WIDTH);

            // Safe index clamp
            const safeCenterIndex = Math.max(0, Math.min(days.length - 1, centerIndex));

            // Update Header & Audio
            if (safeCenterIndex >= 0 && safeCenterIndex < days.length) {
                const centerDate = days[safeCenterIndex].date;
                const my = centerDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                if (my !== currentMonthYear) setCurrentMonthYear(my);

                if (safeCenterIndex !== lastTickRef.current) {
                    playTickSound();
                    lastTickRef.current = safeCenterIndex;
                }
            }

            // Update Visible Range
            const start = Math.max(0, safeCenterIndex - BUFFER_ITEMS);
            const end = Math.min(days.length, safeCenterIndex + BUFFER_ITEMS);

            // Only update state if range changes to avoid extra renders
            setVisibleRange(prev => {
                if (prev.start !== start || prev.end !== end) {
                    return { start, end };
                }
                return prev;
            });
        });
        return () => unsubscribe();
    }, [x, days, currentMonthYear, containerWidth]);

    // Cleanup drag constraints
    const maxDrag = -((days.length * DAY_WIDTH) - (containerWidth / 2));

    // Helper to scroll to a specific index
    const scrollToIndex = (index: number) => {
        if (index !== -1 && containerWidth > 0) {
            const centerOffset = containerWidth / 2;
            const targetX = -(index * DAY_WIDTH) + centerOffset - (DAY_WIDTH / 2);
            animate(x, targetX, { type: "spring", stiffness: 50, damping: 15 });
        }
    };

    // Auto-scroll Trigger (Initial & External Selection)
    useEffect(() => {
        // Only run on mount or when external selection changes significantly
        // We keep the logic mostly for initial load and external prop changes
        if (containerWidth > 0 && selectedEventId) {
            const selectedEvent = events.find(e => e.id === selectedEventId);
            if (selectedEvent) {
                const eventDate = new Date(selectedEvent.eventDate);
                const idx = days.findIndex(d => d.date.toDateString() === eventDate.toDateString());
                scrollToIndex(idx);
            }
        }
        // Initial "Today" centering is handled by default state of x or could be added here if needed on first load only
    }, [selectedEventId, containerWidth, events]); // Removed 'days' and 'today' to avoid aggressive re-centering

    const handleTodayClick = () => {
        const idx = days.findIndex(d => d.date.toDateString() === today.toDateString());
        scrollToIndex(idx);
    };

    const handleEventClick = () => {
        // Find nearest event from today onwards
        const todayTime = today.getTime();
        let idx = days.findIndex(d => d.hasEvents && d.date.getTime() >= todayTime);

        // If no future events, wrap to the first event in the list (past)
        if (idx === -1) {
            idx = days.findIndex(d => d.hasEvents);
        }

        scrollToIndex(idx);
    };

    return (
        <section className="relative py-24 bg-black overflow-hidden select-none">
            {/* Base Timeline Line */}
            <div className="absolute top-[60%] left-0 w-full h-px bg-white/10 z-0" />

            {/* Background Texture - Subtle Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="max-w-full mx-auto w-full relative z-10">
                {/* Header */}
                <div className="flex flex-col mb-12 text-center px-6 relative h-32 justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={currentMonthYear || "init"}
                        className="relative z-10"
                    >
                        <div className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Timeline View</div>
                        <h2 className="text-white text-6xl lg:text-8xl font-sans font-black tracking-tighter uppercase leading-none">
                            {currentMonthYear ? (
                                <>
                                    {currentMonthYear.split(' ')[0]}
                                    <span className="text-orange-600 ml-4 opacity-50">
                                        {currentMonthYear.split(' ')[1]}
                                    </span>
                                </>
                            ) : <span className="opacity-0">LOADING</span>}
                        </h2>
                    </motion.div>
                </div>

                {/* Main Timeline Viewport */}
                <div
                    ref={containerRef}
                    className="relative h-[300px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
                >
                    {/* Center Focus Lens Overlay */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[120px] z-20 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-600/[0.05] to-transparent border-x border-orange-600/20" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-orange-600/30 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                    {/* Draggable Content */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: maxDrag, right: containerWidth / 2 }}
                        dragElastic={0.1}
                        style={{ x }}
                        className="relative h-full"
                    >
                        {days.slice(visibleRange.start, visibleRange.end).map((day, idx) => {
                            const realIndex = visibleRange.start + idx;
                            return (
                                <TimelineItem
                                    key={realIndex}
                                    day={day}
                                    index={realIndex}
                                    width={DAY_WIDTH}
                                    containerWidth={containerWidth}
                                    x={x}
                                    onSelect={() => day.hasEvents && day.eventId && onEventSelect(day.eventId)}
                                    isSelected={day.hasEvents && day.eventId === selectedEventId}
                                    isToday={day.date.toDateString() === today.toDateString()}
                                />
                            );
                        })}
                    </motion.div>
                </div>

                {/* Legend */}
                <div className="max-w-4xl mx-auto mt-12 px-6 flex justify-center gap-12 border-t border-white/10 pt-8">
                    <button
                        onClick={handleEventClick}
                        className="flex items-center gap-3 group transition-all hover:opacity-100 opacity-60 hover:scale-105"
                    >
                        <div className="w-2 h-2 rounded-full bg-orange-600 group-hover:shadow-[0_0_8px_orange]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-orange-500 transition-colors">Event</span>
                    </button>
                    <button
                        onClick={handleTodayClick}
                        className="flex items-center gap-3 group transition-all hover:opacity-100 opacity-60 hover:scale-105"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_#3b82f6]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">Today</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

interface TimelineItemProps {
    day: any;
    index: number;
    width: number;
    containerWidth: number;
    x: any;
    onSelect: () => void;
    isSelected: boolean;
    isToday: boolean;
}

const TimelineItem = ({ day, index, width, containerWidth, x, onSelect, isSelected, isToday }: TimelineItemProps) => {
    // Determine absolute position
    const left = index * width;

    // Calculate center offset for transforms
    const itemCenter = left + width / 2;

    const scale = useTransform(x, (latestX: number) => {
        if (!containerWidth) return 1;
        const relativeX = itemCenter + latestX - containerWidth / 2;
        const distance = Math.abs(relativeX);
        // Peak scale at 1.5 when centered, tapering to 0.8
        return Math.max(0.7, 1.8 - (distance / 300));
    });

    const opacity = useTransform(x, (latestX: number) => {
        if (!containerWidth) return 0.5;
        const relativeX = itemCenter + latestX - containerWidth / 2;
        const distance = Math.abs(relativeX);
        return Math.max(0.2, 1 - (distance / 500));
    });

    const y = useTransform(x, (latestX: number) => {
        if (!containerWidth) return 0;
        const relativeX = itemCenter + latestX - containerWidth / 2;
        // Subtle arc effect (unused here but good for future)
        return 0;
    });

    const color = useTransform(x, (latestX: number) => {
        const relativeX = itemCenter + latestX - containerWidth / 2;
        const distance = Math.abs(relativeX);
        // Color interpolation logic could go here, but CSS is cleaner for interaction
        return distance < 50 ? "#fff" : "#444";
    });

    return (
        <motion.div
            onClick={onSelect}
            style={{
                position: 'absolute',
                left: left,
                width: width,
                scale,
                opacity,
                y
            }}
            className={`
                h-full flex flex-col items-center justify-center cursor-pointer
                ${isSelected ? 'z-20' : 'z-10'}
            `}
        >
            <div className="relative flex flex-col items-center transition-colors duration-200">
                {/* Weekday */}
                <span className={`text-[10px] font-black uppercase tracking-widest mb-4 ${day.hasEvents ? 'text-orange-500' : 'text-white/40'
                    }`}>
                    {day.date.toLocaleString('default', { weekday: 'short' })}
                </span>

                {/* Big Number */}
                <div className={`text-7xl lg:text-8xl font-sans font-black tracking-tighter leading-none ${isSelected ? 'text-orange-600 drop-shadow-[0_0_20px_rgba(234,88,12,0.5)]' :
                    isToday ? 'text-blue-500' : 'text-white'
                    }`}>
                    {day.date.getDate()}
                </div>

                {/* Marker Dots */}
                <div className="mt-8 flex flex-col gap-2 items-center h-8">
                    {day.hasEvents && (
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600 shadow-[0_0_10px_orange]" />
                    )}
                    {isToday && !day.hasEvents && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventCalendar;
