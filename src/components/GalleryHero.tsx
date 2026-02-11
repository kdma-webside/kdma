'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GalleryHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-end pb-24 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/stats-bg.png"
                    alt="Gallery Atmosphere"
                    fill
                    className="object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

                {/* Floating Glows */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-6 mb-8"
                >
                    <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase font-sans">SHRINE OF STRENGTH</span>
                    <div className="h-[1px] w-12 bg-orange-600" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-3xl md:text-7xl lg:text-9xl font-black font-sans tracking-tighter leading-none uppercase mb-8"
                >
                    THE <span className="text-orange-600">GALLERY</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg lg:text-2xl font-sans font-medium max-w-2xl leading-relaxed italic"
                >
                    "Where gravity bows to grit. Witness the lineage of the wind-benders."
                </motion.p>
            </div>
        </section>
    );
};

export default GalleryHero;
