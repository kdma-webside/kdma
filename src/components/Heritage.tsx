'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const Heritage = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <section ref={sectionRef} className="relative py-32 px-12 lg:px-24 bg-[#0a0a0a] overflow-hidden min-h-screen flex items-center">
            {/* Background cinematic texture (Extended from Benefits) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/training-ground.png"
                    alt="Background Texture"
                    fill
                    className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
            </div>

            {/* Parallax Motif Accent */}
            <motion.div
                style={{ y: parallaxY }}
                className="absolute right-0 top-1/4 opacity-[0.05] pointer-events-none z-0"
            >
                <svg width="600" height="600" viewBox="0 0 100 100" fill="white">
                    <path d="M50,10 A40,40 0 1,1 10,50 A40,40 0 1,1 90,50 A40,40 0 1,1 50,90 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                    <text x="50" y="55" fontSize="30" textAnchor="middle" fill="white" style={{ fontFamily: 'serif' }}>ॐ</text>
                </svg>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
                {/* Left: Image (Slides in from Left) */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] lg:aspect-auto h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
                >
                    <Image
                        src="/images/heritage-master.png"
                        alt="Mallakhamb Master"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    {/* Sepia/Duotone Overlay */}
                    <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </motion.div>

                {/* Right: Text (Slides in from Right) */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-orange-500 text-sm tracking-[0.6em] font-black uppercase font-sans flex items-center">
                            <span className="h-[1px] w-8 bg-orange-600 mr-4"></span>
                            OUR ROOTS
                        </span>
                        <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none font-sans">
                            A Legacy Carved in <br />
                            <span className="text-orange-600">Wood and Grit</span>
                        </h2>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed font-sans max-w-xl">
                        Rooted in the 12th-century <span className="text-white font-bold underline decoration-orange-600/50">Manasollasa</span>, Mallakhambam is more than a sport—it is a living tradition of discipline. Our academy preserves this ancient Indian martial art, blending physical mastery with mental fortitude.
                    </p>

                    <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-orange-500 font-black text-2xl font-sans">1135 AD</p>
                            <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">First Documentation</p>
                        </div>
                        <div>
                            <p className="text-orange-500 font-black text-2xl font-sans">900+</p>
                            <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">Students Trained</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Heritage;
