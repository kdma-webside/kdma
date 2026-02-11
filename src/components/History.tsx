'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { History as HistoryIcon, Award } from 'lucide-react';

const History = () => {
    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden flex items-center justify-center">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Content */}
                <div className="relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4"
                    >
                        <HistoryIcon className="text-orange-500" size={20} />
                        <span className="text-orange-500 text-xs tracking-[0.6em] font-black uppercase">JOURNEY THROUGH TIME</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] font-sans"
                    >
                        CENTURIES OF <br />
                        <span className="text-orange-600">STRENGTH</span>
                    </motion.h2>

                    <div className="space-y-6 text-gray-400 font-sans font-medium text-lg leading-relaxed max-w-xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Mallakhamb, derived from the Sanskrit words <span className="text-white italic">'Malla'</span> (wrestler) and <span className="text-white italic">'Khamb'</span> (pole), dates back to the 12th century, where it was mentioned in the Manasollasa by Someshvara Chalukya.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Originally developed as a conditioning exercise for wrestlers, it evolved into a sophisticated competitive sport. The Kanyakumari District Association was founded to provide a structured platform for practitioners in the southern tip of India, ensuring the art survives and thrives in the digital age.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            Today, we combine this ancient physical discipline with modern sports science, producing athletes who represent the pinnacle of human flexibility, balance, and raw power.
                        </motion.p>
                    </div>
                </div>

                {/* Right Side: Visual Image with Scroll Layering */}
                <div className="relative z-10 flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-full max-w-[550px] aspect-square rounded-[40px] overflow-hidden border border-white/10 group"
                    >
                        {/* Background Dark Layer */}
                        <div className="absolute inset-0 bg-[#0A0A0A]" />

                        {/* Animated Grid/Geometry (Modern Touch) */}
                        <div className="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="#f97316" strokeWidth="0.1" fill="none" />
                            </svg>
                        </div>

                        {/* Main Image: Ancient Scroll Art (Mockup behavior) */}
                        <div className="absolute inset-10 overflow-hidden rounded-2xl border border-orange-600/30">
                            <Image
                                src="/images/heritage-master.png"
                                alt="Ancient Mallakhamb Art"
                                fill
                                className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                            />
                            {/* Inner Scroll Glow */}
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,1)]" />
                        </div>

                        {/* Floating Labels and Badges */}
                        <div className="absolute top-4 left-6 text-white text-[10px] font-black tracking-widest uppercase opacity-40">
                            Ancient Mallakhamb Art
                        </div>

                        {/* Timeline Tags */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 flex justify-between text-white/40 text-[9px] font-black tracking-widest uppercase">
                            <span>12th Century</span>
                            <span>Today</span>
                        </div>

                        {/* "Cultural Heritage" Tag (Bottom Left) */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute bottom-8 left-8 bg-orange-600 p-6 pr-10 rounded-2xl shadow-2xl flex flex-col items-start gap-2 border border-white/20"
                        >
                            <Award size={24} className="text-white" />
                            <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase leading-none">CULTURAL <br /> HERITAGE</span>
                        </motion.div>

                        {/* Decorative Fire Dust / Particles on Right Image Area */}
                        <div className="absolute top-1/4 right-8 w-px h-24 bg-gradient-to-b from-transparent via-orange-600/40 to-transparent" />
                        <div className="absolute bottom-1/4 left-8 w-px h-24 bg-gradient-to-b from-transparent via-orange-600/40 to-transparent" />
                    </motion.div>

                    {/* Background floating decor */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 blur-3xl opacity-30 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default History;
