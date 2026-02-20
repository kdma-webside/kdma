'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MasterProps {
    name: string;
    title: string;
    bio: string;
    image: string;
    index: number;
}

const MasterCard = ({ name, title, bio, image, index }: MasterProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative"
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 bg-[#121212]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover saturate-150 group-hover:saturate-200 group-hover:scale-110 transition-all duration-1000"
                />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-px w-12 bg-orange-600 mb-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-white text-xs font-black tracking-[0.3em] uppercase mb-1 opacity-60">
                        {title}
                    </h4>
                    <h3 className="text-white text-3xl font-black tracking-tighter uppercase mb-4 leading-none">
                        {name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {bio}
                    </p>
                </div>
            </div>

            {/* Background Glow on Hover */}
            <div className="absolute -inset-4 bg-orange-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-full" />
        </motion.div>
    );
};

const MasterDedication = () => {
    const masters = [
        {
            name: "Guru Vishnupant",
            title: "The Pioneer",
            bio: "Instrumental in reviving the traditional pole Mallakhamb in the early 20th century, setting the standard for modern grace.",
            image: "/images/heritage-master.png"
        },
        {
            name: "Master Rajesh",
            title: "Technique Grandmaster",
            bio: "Known for inventing over 50 complex transitions that are now core to the competitive curriculum worldwide.",
            image: "/images/unified-hero-athlete.png"
        },
        {
            name: "Guru Shanti Devi",
            title: "Strength Mentor",
            bio: "A visionary who integrated Yogic breathing with rope Mallakhamb, revolutionizing endurance training for female athletes.",
            image: "/images/benefit-discipline.jpg"
        }
    ];

    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden flex flex-col items-center">
            {/* Parallax Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
                <h2 className="text-[20vw] font-black text-white leading-none uppercase">LINEAGE</h2>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Section Header */}
                <div className="flex flex-col mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center space-x-6 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-orange-600" />
                        <span className="text-orange-500 text-xs tracking-[1em] font-black uppercase">VANDE GURUPARAMPARAAM</span>
                        <div className="h-[1px] w-12 bg-orange-600" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none font-sans mb-8"
                    >
                        Our <span className="text-orange-600 text-outline">Gurus</span>
                    </motion.h2>

                    <p className="text-gray-400 text-lg lg:text-xl font-sans font-medium max-w-3xl mx-auto opacity-70 italic leading-relaxed">
                        "The Guru is the pole that grounds us, while our strength is the spirit that allows us to soar."
                        <span className="block mt-4 not-italic text-sm text-orange-600 font-black tracking-widest">— ANCIENT ACADEMY PROVERB</span>
                    </p>
                </div>

                {/* Masters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {masters.map((master, index) => (
                        <MasterCard key={index} {...master} index={index} />
                    ))}
                </div>

                {/* Call Out Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-white/40 text-[10px] tracking-[0.5em] font-black uppercase mb-8">Honor the tradition that chose you</p>
                    <div className="inline-block px-12 py-3 border border-orange-600/30 rounded-full text-orange-500 text-[10px] font-black tracking-widest uppercase hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
                        View Full Lineage Archives
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MasterDedication;
