'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, Timer, MapPin, ArrowRight } from 'lucide-react';
import EventRegistrationModal from './EventRegistrationModal';

interface EventSpotlightProps {
    event: {
        id: string;
        title: string;
        description: string;
        date: { month: string; day: string };
        location: string;
        image: string;
        daysRemaining: number;
        formConfig?: any;
    }
}

const EventSpotlight = ({ event }: EventSpotlightProps) => {
    if (!event || !event.title) return null;

    const [registeredCount, setRegisteredCount] = React.useState(0);
    const [mounted, setMounted] = React.useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

    React.useEffect(() => {
        setRegisteredCount(Math.floor(Math.random() * 500) + 100);
        setMounted(true);
    }, []);

    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden flex flex-col items-center">
            <EventRegistrationModal
                event={event}
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={event.id + "-bg"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={event.image}
                            alt="Spotlight Background"
                            fill
                            className="object-cover grayscale saturate-200"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Advanced Light Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                {/* Cinematic Spotlight Beams */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-orange-600/30 blur-[100px] -rotate-12" />
                <div className="absolute top-0 right-1/4 w-[2px] h-full bg-orange-600/20 blur-[60px] rotate-12" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
                >
                    {/* Visual Side: Featured Image & Badge */}
                    <div className="flex-1 relative group w-full lg:w-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(234,88,12,0.3)] bg-[#0A0A0A]"
                        >
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                            />

                            {/* Spotlight Badge Overlay */}
                            <div className="absolute top-10 left-10">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(234,88,12,0.5)]"
                                >
                                    <Award size={18} className="animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">SPOTLIGHT</span>
                                </motion.div>
                            </div>

                            {/* Bottom Info Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-active:opacity-60 transition-opacity duration-300" />
                        </motion.div>

                        {/* Background Floating Element */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 blur-3xl rounded-full" />
                    </div>

                    {/* Content Side: Info & CTA */}
                    <div className="flex-1 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <Timer className="text-orange-500" size={20} />
                                <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase">
                                    COMMENCING IN {event.daysRemaining} DAYS
                                </span>
                            </div>

                            <h2 className="text-white text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight md:leading-[0.85] uppercase mb-8 font-sans">
                                {event.title.split(' ').slice(0, -1).join(' ')} <br />
                                <span className="text-orange-600">{event.title.split(' ').slice(-1)}</span>
                            </h2>

                            <p className="text-gray-400 text-sm md:text-lg lg:text-xl font-sans font-medium leading-relaxed max-w-xl italic">
                                {event.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-y border-white/5 py-10">
                            <div className="space-y-2">
                                <span className="text-white/40 text-[9px] font-black tracking-widest uppercase block">STADIUM</span>
                                <div className="flex items-center gap-3 text-white text-lg md:text-xl font-black tracking-tight uppercase">
                                    <MapPin size={18} className="text-orange-600" />
                                    {event.location}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-white/40 text-[9px] font-black tracking-widest uppercase block">ATTENDANCE</span>
                                <div className="text-white text-lg md:text-xl font-black tracking-tight uppercase">
                                    {event.id === 'state-2024' ? '5,000+ EXPECTED' : '2,000+ EXPECTED'}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="w-full sm:w-auto px-8 md:px-12 py-5 bg-orange-600 text-white rounded-2xl font-black tracking-widest text-[10px] md:text-xs uppercase hover:bg-orange-700 active:bg-orange-800 active:scale-95 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)]"
                            >
                                REGISTER NOW
                                <ArrowRight size={18} className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden relative">
                                            <Image src={`/images/benefit-discipline.jpg`} alt="Participant" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                                    {mounted ? `+${registeredCount} REGISTERED` : '+... REGISTERED'}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-white">
                <h2 className="text-[25vw] font-black leading-none uppercase tracking-tighter">SPOTLIGHT</h2>
            </div>
        </section>
    );
};

export default EventSpotlight;
