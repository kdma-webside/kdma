'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Mission = () => {
    const stats = [
        { label: "YEARS OF TRADITION", value: "900+" },
        { label: "LINEAGE AUTHENTICITY", value: "100%", highlight: true },
        { label: "ANCIENT MANUSCRIPTS", value: "50+" },
        { label: "SPIRITUAL GUIDANCE", value: "24/7" }
    ];

    return (
        <section id="mission" className="relative min-h-[80vh] flex items-center py-24 px-12 lg:px-24 overflow-hidden">
            {/* Cover Photo Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/training-ground.png"
                    alt="Mission Background"
                    fill
                    className="object-cover opacity-60"
                />
                {/* Advanced Multi-layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">
                {/* Left side: Text Content */}
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-12 h-[2px] bg-orange-600 mb-6"
                    />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-5xl lg:text-7xl font-black tracking-tight uppercase leading-[0.9] font-sans"
                    >
                        FORGING STRENGTH <br />
                        <span className="text-orange-600">PRESERVING RADIANCE</span>
                    </motion.h2>

                    <div className="space-y-6 text-gray-300 font-sans font-medium text-lg leading-relaxed max-w-xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Founded on the principles of the Manasollasa text from 1135 AD, the KDMA Academy stands as the premiere global center for Mallakhamb excellence. We believe that true athletic mastery is as much a mental pursuit as it is a physical one.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Our mission is to take this 900-year-old tradition and translate it into the modern era, ensuring that the fire of the strength-benders never goes out. We train not just athletes, but guardians of a cultural heritage.
                        </motion.p>
                    </div>
                </div>

                {/* Right side: Cinematic Stats Grid */}
                <div className="flex-1 w-full max-w-xl">
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-8 rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden group border ${stat.highlight
                                    ? 'bg-orange-600 border-white/20'
                                    : 'bg-black/40 backdrop-blur-2xl border-white/10'
                                    }`}
                            >
                                {/* Stat Glow */}
                                <div className={`absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${stat.highlight ? 'bg-white/10 blur-2xl' : 'bg-orange-600/10 blur-2xl'
                                    }`} />

                                <span className={`text-5xl font-black mb-3 block ${stat.highlight ? 'text-white' : 'text-orange-600'
                                    }`}>
                                    {stat.value}
                                </span>
                                <span className={`text-[9px] font-black tracking-[0.25em] uppercase leading-tight ${stat.highlight ? 'text-white/80' : 'text-gray-500'
                                    }`}>
                                    {stat.label}
                                </span>

                                {/* Animated Border */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/5 rounded-3xl transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section Edge Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    );
};

export default Mission;
