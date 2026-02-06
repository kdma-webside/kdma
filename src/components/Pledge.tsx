'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, PenTool, Flame } from 'lucide-react';
import Link from 'next/link';

const Pledge = () => {
    return (
        <section id="pledge" className="relative py-32 px-12 lg:px-24 bg-[#050505] overflow-hidden flex flex-col items-center border-t border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
                <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-600/20 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <Flame size={20} className="text-orange-500 animate-pulse" />
                        <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase">THE FINAL COVENANT</span>
                        <Flame size={20} className="text-orange-500 animate-pulse" />
                    </div>

                    <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-12">
                        Our <span className="text-orange-600">Pledge</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-white/5 border border-white/10 rounded-[40px] p-12 lg:p-20 backdrop-blur-md"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-white/10 p-4 rounded-full text-orange-500">
                        <Scroll size={32} />
                    </div>

                    <div className="space-y-8 text-center">
                        <p className="text-white text-xl lg:text-2xl font-serif font-medium leading-relaxed italic text-white/90">
                            "We commit to honoring the wood, the soil, and the spirit. We see Mallakhamb not as a mere performance, but as a path to inner silence through outer chaos. We pledge to uplift every student, respect every tradition, and forge a community bound by strength and humility."
                        </p>

                        <div className="h-px w-24 bg-orange-600/50 mx-auto" />

                        <p className="text-gray-400 text-sm font-sans uppercase tracking-widest font-bold">
                            Signed, The Grandmasters Council
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link href="/register" className="group relative px-10 py-5 bg-orange-600 rounded-2xl overflow-hidden flex items-center gap-4 transition-all hover:bg-orange-700 hover:scale-105 shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)]">
                            <PenTool size={20} className="text-white relative z-10" />
                            <span className="text-white text-xs font-black tracking-widest uppercase relative z-10">Sign the Pledge (Join Us)</span>

                            {/* Shine Effect */}
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pledge;
