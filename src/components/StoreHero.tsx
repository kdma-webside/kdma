'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Sparkles } from 'lucide-react';

const StoreHero = ({ title = "FORGE YOUR STRENGTH" }: { title?: string }) => {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-24 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/stats-bg.png"
                    alt="Store Background"
                    fill
                    className="object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                {/* Cinematic Light Rays */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-orange-600/20 blur-[120px] -rotate-12" />
                <div className="absolute bottom-0 right-1/4 w-[2px] h-1/2 bg-orange-600/10 blur-[80px] rotate-12" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <ShoppingBag size={20} className="text-orange-500" />
                        <span className="text-orange-500 text-xs tracking-[1em] font-black uppercase">ACADEMY ARMORY</span>
                        <Sparkles size={20} className="text-orange-500" />
                    </div>

                    <h1 className="text-white text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase mb-8">
                        {title.split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-orange-600">{title.split(' ').slice(-1)}</span>
                    </h1>

                    <p className="text-gray-400 text-lg lg:text-xl font-sans font-medium max-w-2xl mx-auto italic leading-relaxed">
                        Equip yourself with professional Mallakhamb gear and official academy merchandise. Tested by masters, built for warriors.
                    </p>
                </motion.div>

                {/* Floating Decorative Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-white">
                    <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter">EQUIPMENT</h2>
                </div>
            </div>
        </section>
    );
};

export default StoreHero;
