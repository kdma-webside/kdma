'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventProps {
    title: string;
    description: string;
    date: { month: string; day: string };
    location: string;
    status: 'upcoming' | 'completed';
    image: string;
    index: number;
}

interface EventCardProps extends EventProps {
    onClick?: () => void;
    isActive?: boolean;
}

const EventCard = ({ title, description, date, location, status, image, index, onClick, isActive }: EventCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
            onClick={onClick}
            className={`group relative border rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch transition-all cursor-pointer shadow-2xl ${isActive
                ? 'bg-orange-600/10 border-orange-600/50'
                : 'bg-[#121212] border-white/5 hover:border-orange-600/30 active:border-orange-600/50'
                }`}
        >
            {/* Event Image */}
            <div className="relative w-full lg:w-[350px] min-h-[250px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={`object-cover transition-transform duration-500 ${isActive ? 'scale-110 grayscale-0' : 'group-hover:scale-110 group-active:scale-110'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121212] hidden lg:block" />

                {/* Date Badge Overlay */}
                <div className="absolute top-6 left-6 z-20">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl border border-white/10">
                        <span className="text-[10px] font-black tracking-widest uppercase opacity-80">{date.month}</span>
                        <span className="text-2xl font-black leading-none">{date.day}</span>
                    </div>
                </div>
            </div>

            {/* Event Content */}
            <div className="flex-grow p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                    {status === 'upcoming' ? (
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-orange-500">Booking Open</span>
                        </div>
                    ) : (
                        <span className="px-2 py-0.5 bg-yellow-600/20 text-yellow-500 text-[10px] font-black tracking-widest uppercase rounded border border-yellow-600/30">
                            Completed
                        </span>
                    )}
                    <div className="flex items-center text-white/40 text-[10px] font-black tracking-[0.2em] uppercase gap-1.5">
                        <MapPin size={12} className="text-orange-600/50" />
                        {location}
                    </div>
                </div>

                <h3 className={`text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter transition-colors duration-300 uppercase font-sans mb-4 ${isActive ? 'text-orange-500' : 'group-hover:text-orange-500 group-active:text-orange-500'}`}>
                    {title}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed max-w-xl font-sans font-medium mb-8">
                    {description}
                </p>

                <div>
                    <button className={`px-10 py-4 rounded-xl font-black tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-3
                        ${status === 'upcoming'
                            ? 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 active:scale-95 shadow-xl'
                            : 'bg-white/5 text-white/40 border border-white/5'
                        }`}
                    >
                        {status === 'upcoming' ? 'Register Now' : 'View Summary'}
                        <ArrowRight size={16} className={status === 'upcoming' ? 'group-hover:translate-x-1 group-active:translate-x-1 transition-transform' : ''} />
                    </button>
                </div>
            </div>

            {/* Selection Indicator */}
            {isActive && (
                <motion.div
                    layoutId="selection-indicator"
                    className="absolute top-0 right-0 w-2 h-full bg-orange-600"
                />
            )}
        </motion.div>
    );
};

export const defaultEventsData = [
    {
        id: "state-2024",
        title: "Annual State Championship",
        description: "A prestigious competition featuring the nation's top Mallakhamb athletes displaying raw power and calculated grace.",
        date: { month: "Oct", day: "15" },
        eventDate: new Date(2026, 9, 15).toISOString(), // Added eventDate for consistency
        location: "Main Stadium",
        status: "upcoming",
        image: "/images/unified-hero-athlete.png",
        daysRemaining: 12
    },
    {
        id: "heritage-2024",
        title: "Cultural Heritage Demo",
        description: "An open showcase at the City Square dedicated to preserving the 12th-century martial heritage through live performance.",
        date: { month: "Nov", day: "02" },
        eventDate: new Date(2026, 10, 2).toISOString(), // Added eventDate for consistency
        location: "City Square",
        status: "upcoming",
        image: "/images/heritage-master.png",
        daysRemaining: 28
    },
    {
        id: "intl-2024",
        title: "International Workshop",
        description: "Global training session with visiting practitioners focused on the blending of traditional techniques with modern agility.",
        date: { month: "Dec", day: "10" },
        eventDate: new Date(2026, 11, 10).toISOString(), // Added eventDate for consistency
        location: "Academy Grounds",
        status: "upcoming",
        image: "/images/benefit-discipline.jpg",
        daysRemaining: 65
    }
];

const Events = ({
    showHeader = true,
    onEventSelect,
    selectedEventId,
    initialEvents = [],
    title = "Events & Milestones",
    subTitle = "CHRONICLES"
}: {
    showHeader?: boolean,
    onEventSelect?: (eventId: string) => void,
    selectedEventId?: string,
    initialEvents?: any[],
    title?: string,
    subTitle?: string
}) => {
    const eventsToDisplay = initialEvents;

    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden flex flex-col items-center">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                {showHeader && (
                    <div className="flex flex-col mb-24 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                            <span className="text-orange-500 text-xs tracking-[1em] font-black uppercase">{subTitle}</span>
                            <div className="h-[1px] w-12 bg-orange-600" />
                        </div>

                        <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-tight md:leading-none font-sans mb-8">
                            {title.includes('&') ? (
                                <>
                                    {title.split('&')[0]} & <span className="text-orange-600">{title.split('&')[1]}</span>
                                </>
                            ) : title}
                        </h2>

                        <p className="text-gray-400 text-lg lg:text-xl font-sans font-medium max-w-2xl opacity-80 mb-8">
                            Witness the strength and grace of Mallakhambam in action. Join our community for these high-impact demonstrations.
                        </p>

                        <Link href="/events" className="inline-flex">
                            <button className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] border-b border-orange-500 pb-1 hover:text-orange-400 hover:border-orange-400 active:text-orange-300 active:border-orange-300 transition-all flex items-center gap-3 group">
                                VIEW FULL BOARD
                                <ArrowRight size={14} className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                )}

                {/* Event List */}
                <div className="flex flex-col gap-10">
                    {eventsToDisplay.map((event, index) => {
                        const Card = (
                            <EventCard
                                key={event.id}
                                {...event as any}
                                date={{ month: event.month, day: event.day }}
                                index={index}
                                onClick={() => onEventSelect?.(event.id)}
                                isActive={selectedEventId === event.id}
                            />
                        );

                        if (!onEventSelect) {
                            return (
                                <Link key={event.id} href={`/events?id=${event.id}`}>
                                    {Card}
                                </Link>
                            );
                        }

                        return Card;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Events;
