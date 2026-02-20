'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiry } from '@/context/EnquiryContext';
import MagneticButton from '@/components/ui/MagneticButton';

const FireParticles = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: 100 + Math.random() * 20,
            size: Math.random() * 2.5 + 0.5,
            duration: Math.random() * 12 + 8,
            delay: Math.random() * 20,
            drift: Math.random() * 20 - 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: '105%', x: `${p.x}%` }}
                    animate={{
                        opacity: [0, 0.6, 0.4, 0],
                        y: ['105%', '-15%'],
                        x: [`${p.x}%`, `${p.x + p.drift}%`],
                    }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                    className="absolute bg-orange-400 rounded-full"
                    style={{ width: p.size, height: p.size, filter: 'blur(0.5px)', boxShadow: '0 0 4px #f97316' }}
                />
            ))}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-orange-950/20 to-transparent blur-3xl opacity-30 z-10" />
        </div>
    );
};

const Hero = ({
    headline = "BEST MALLAKHAMB ACADEMY IN TAMIL NADU",
    subheadline = "THE PREMIER SCHOOL FOR ANCIENT SPORTS, ESPECIALLY IN KANYAKUMARI DISTRICT",
    upcomingEvent
}: {
    headline?: string;
    subheadline?: string;
    upcomingEvent?: any;
}) => {
    const { openEnquiry } = useEnquiry();

    return (
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-black text-white">
            {/* Seamless Background Arena */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/training-ground.png"
                    alt="Ancient Arena"
                    fill
                    className="object-cover object-center opacity-60"
                    priority
                />
                {/* Global blend for text area */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </div>

            {/* Fire Dust Particles */}
            <FireParticles />

            {/* Core Athlete Image - FULL WIDTH CONTAINER to avoid center edges */}
            <div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 30%, black 70%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 30%, black 70%)'
                }}
            >
                <div className="absolute right-0 bottom-0 w-[95vw] md:w-[60vw] lg:w-[70vw] h-full">
                    <Image
                        src="/images/unified-hero-athlete.png"
                        alt="Mallakhamb Warrior"
                        fill
                        className="object-contain object-right-bottom scale-110 translate-y-12"
                        priority
                    />
                    {/* Shadow grounding for athlete base */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-80" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-40 w-full lg:max-w-5xl pt-24 flex flex-col items-center lg:items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-center lg:justify-start items-center space-x-6 mb-8 underline decoration-orange-600 underline-offset-8"
                >
                    <span className="text-orange-500 text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.8em] font-black uppercase font-sans text-center">KANYAKUMARI DISTRICT MALLKAMBH ASSOCIATION (KDMA)</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-white text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-black font-sans tracking-tighter leading-[0.95] md:leading-[0.85] uppercase mb-12 text-center lg:text-left">
                        {headline.split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-orange-600">{headline.split(' ').slice(-1)}</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16 space-y-4 max-w-2xl mx-auto lg:mx-0"
                >
                    <p className="text-white/70 text-base md:text-lg font-sans font-medium leading-relaxed text-center lg:text-left">
                        {subheadline}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-[8px] md:text-[10px] tracking-[0.4em] font-black text-orange-500/80 uppercase">
                        <p className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3" /> TRADITION</p>
                        <p className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3" /> MASTERY</p>
                        <p className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3" /> POWER</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center justify-center lg:justify-start"
                >
                    <MagneticButton>
                        <button
                            onClick={openEnquiry}
                            className="w-full sm:w-auto relative group overflow-hidden bg-orange-600 text-white px-10 md:px-14 py-4 md:py-5 font-black tracking-widest text-[11px] md:text-sm shadow-[0_10px_30px_rgba(249,115,22,0.3)] uppercase font-sans transition-all hover:scale-105 active:bg-orange-700 active:scale-95"
                        >
                            <span className="relative z-10">JOIN ASSOCIATION</span>
                            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
                        </button>
                    </MagneticButton>
                    <MagneticButton>
                        <button className="w-full sm:w-auto border-2 border-white/10 hover:border-orange-600/50 active:border-orange-600/70 backdrop-blur-xl px-10 md:px-14 py-4 md:py-5 font-black tracking-widest text-[11px] md:text-sm transition-all uppercase font-sans text-white hover:bg-orange-600/10 active:bg-orange-600/20 active:scale-95">
                            EXPLORE HERITAGE
                        </button>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Minimalist Scroll Indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-40 hidden lg:flex flex-col items-center opacity-30">
                <span className="text-[9px] tracking-[1.5em] font-black mb-6">SCROLL</span>
                <motion.div
                    animate={{ height: [12, 40, 12], opacity: [0.1, 1, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1.5px] bg-orange-600"
                />
            </div>

            {/* Upcoming Event Quick Tag (Bottom Right) */}
            {(upcomingEvent || true) && (
                <div className="absolute right-6 bottom-6 lg:right-12 lg:bottom-12 z-[100] flex items-center pointer-events-auto max-w-[calc(100vw-3rem)]">
                    <MagneticButton>
                        <Link href={`/events?id=${(upcomingEvent || {}).id || 'state-2024'}`}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="hidden sm:flex items-center gap-3 md:gap-5 bg-[#121212]/80 backdrop-blur-2xl border border-white/10 p-2 md:p-3 pr-4 md:pr-6 rounded-2xl group cursor-pointer hover:bg-orange-600/10 hover:border-orange-600/30 active:bg-orange-600/20 active:border-orange-600/50 active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                                    <Image
                                        src={(upcomingEvent || {}).image || "/images/unified-hero-athlete.png"}
                                        alt={(upcomingEvent || {}).title || "Next Event"}
                                        fill
                                        className="object-cover group-hover:scale-110 group-active:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                                        </span>
                                        <span className="text-orange-500 text-[10px] font-black tracking-[0.2em] uppercase">Upcoming Milestone</span>
                                    </div>
                                    <h4 className="text-white text-xs font-black tracking-tight uppercase leading-none mb-1.5 group-hover:text-orange-500 group-active:text-orange-500 transition-colors">
                                        {(upcomingEvent || {}).title || "Annual Championship"}
                                    </h4>
                                    <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                                        {(upcomingEvent || {}).month || (upcomingEvent || {}).date?.month || "Oct"} {(upcomingEvent || {}).day || (upcomingEvent || {}).date?.day || "15"} • {(upcomingEvent || {}).location || "Main Stadium"}
                                    </span>
                                </div>

                                <div className="ml-2 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </motion.div>
                        </Link>
                    </MagneticButton>
                </div>
            )}
        </section>
    );
};

export default Hero;
