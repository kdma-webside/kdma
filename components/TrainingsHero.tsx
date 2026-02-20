'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Zap, Shield } from 'lucide-react';

const TrainingsHero = () => {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-6 lg:px-24 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 via-black to-black z-0" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/20 px-4 py-2 rounded-full text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8"
                    >
                        <Zap size={14} />
                        Elite Combat Education
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-white text-3xl md:text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8"
                    >
                        Forge Your <br />
                        <span className="text-orange-600">Legacy</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg lg:text-xl font-sans max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        From traditional Mallarkambam mastery to elite tactical conditioning.
                        Enter the arena and undergo the transformation from practitioner to warrior.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4">
                        {[
                            { icon: <Swords size={24} />, title: "Ancient Techniques", desc: "Authentic Mallarkambam traditions" },
                            { icon: <Zap size={24} />, title: "Modern Tactical", desc: "Contemporary combat strategies" },
                            { icon: <Shield size={24} />, title: "Warrior Mindset", desc: "Psychological resilience training" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:border-orange-600/30 transition-all group"
                            >
                                <div className="text-orange-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white text-sm font-black tracking-widest uppercase mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-xs font-sans">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainingsHero;
