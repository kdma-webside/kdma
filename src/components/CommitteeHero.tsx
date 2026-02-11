'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CommitteeHero = () => {
    return (
        <section className="relative min-h-[70vh] flex items-end pb-24 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/training-ground.png"
                    alt="Committee Background"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-6 mb-8"
                >
                    <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase font-sans">LEADERSHIP & GOVERNANCE</span>
                    <div className="h-[1px] w-12 bg-orange-600" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-4xl md:text-7xl lg:text-9xl font-black font-sans tracking-tighter leading-none uppercase mb-12"
                >
                    THE GUARDIANS <br />
                    <span className="text-orange-600">OF TRADITION</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg lg:text-2xl font-sans font-medium max-w-2xl leading-relaxed"
                >
                    Meet the dedicated leaders steering KDMA's vision forward, preserving our heritage while building the future of Mallakhamb.
                </motion.p>
            </div>
        </section>
    );
};

export default CommitteeHero;
