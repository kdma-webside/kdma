'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const EventsHero = ({ nextEvent }: { nextEvent?: any }) => {
    // Calculate days remaining
    const daysRemaining = React.useMemo(() => {
        if (!nextEvent) return 0;
        const now = new Date();
        const eventDate = new Date(nextEvent.eventDate);
        const diffTime = eventDate.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [nextEvent]);

    return (
        <section className="relative min-h-[70vh] flex items-end pb-24 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/stats-bg.png"
                    alt="Stadium Atmosphere"
                    fill
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

                {/* Visual "Stadium" Lights Effect */}
                <div className="absolute top-0 left-1/4 w-[2px] h-[500px] bg-gradient-to-b from-orange-600/50 via-orange-600/10 to-transparent -rotate-12 blur-sm" />
                <div className="absolute top-0 right-1/4 w-[2px] h-[500px] bg-gradient-to-b from-orange-600/50 via-orange-600/10 to-transparent rotate-12 blur-sm" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-6 mb-8"
                >
                    <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase font-sans">STADIUM OF DREAMS</span>
                    <div className="h-[1px] w-12 bg-orange-600" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-2xl md:text-7xl lg:text-9xl font-black font-sans tracking-tighter leading-tight md:leading-[0.85] uppercase mb-12"
                >
                    UPCOMING <br />
                    <span className="text-orange-600">CHALLENGES</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col lg:flex-row gap-8 lg:items-center"
                >
                    <p className="text-gray-400 text-lg lg:text-2xl font-sans font-medium max-w-2xl leading-relaxed">
                        From provincial qualifiers to international championships. Mark your calendars for the next era of Mallakhamb excellence.
                    </p>

                    {nextEvent ? (
                        <div className="flex flex-col sm:flex-row bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl items-center gap-6">
                            <div className="text-center sm:text-left">
                                <span className="block text-orange-500 text-3xl font-black">{daysRemaining}</span>
                                <span className="text-[9px] text-white/40 font-black tracking-widest uppercase">DAYS REMAINING</span>
                            </div>
                            <div className="hidden sm:block w-px h-10 bg-white/10" />
                            <div className="text-center sm:text-left">
                                <span className="block text-white text-xs font-black tracking-widest uppercase">NEXT EVENT</span>
                                <span className="block text-gray-400 text-[10px] font-bold uppercase">{nextEvent.title}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl items-center gap-6">
                            <div className="text-center sm:text-left">
                                <span className="block text-white/20 text-3xl font-black">--</span>
                            </div>
                            <div className="hidden sm:block w-px h-10 bg-white/10" />
                            <div className="text-center sm:text-left">
                                <span className="block text-white text-xs font-black tracking-widest uppercase">NO UPCOMING EVENTS</span>
                                <span className="block text-gray-400 text-[10px] font-bold uppercase">STAY TUNED</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default EventsHero;
