'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ValueCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0a0503] border border-white/10 rounded-3xl p-10 flex flex-col h-full overflow-hidden transition-all hover:bg-white/5 hover:border-orange-600/30"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[80px] rounded-full group-hover:bg-orange-600/20 transition-all" />

            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Icon size={32} strokeWidth={1.5} />
            </div>

            <h3 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter font-sans relative z-10">
                {title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium font-sans opacity-80 relative z-10 group-hover:opacity-100 transition-opacity">
                {description}
            </p>

            <Link href="#pledge" className="mt-auto pt-8 border-t border-white/5 flex items-center text-orange-600/60 font-bold text-[10px] tracking-[0.2em] uppercase group-hover:text-orange-500 transition-colors">
                <span className="group-hover:mr-2 transition-all">OUR PLEDGE</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
        </motion.div>
    );
};

const CoreValues = () => {
    const values = [
        {
            title: "Vision",
            description: "To reignite the sacred flame of Mallakhamb globally, establishing it not just as a sport, but as a premier discipline for holistic human potential and spiritual grounding.",
            icon: Eye,
            delay: 0
        },
        {
            title: "Mission",
            description: "To train a new generation of warriors who embody strength, agility, and wisdom. We preserve the purity of the 900-year-old tradition while adapting its teachings for modern mastery.",
            icon: Compass,
            delay: 0.2
        },
        {
            title: "Aim",
            description: "To create a worldwide ecosystem of academies where the pole becomes a universal symbol of resilience, aiming for Olympic recognition while maintaining our spiritual roots.",
            icon: Target,
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 px-8 lg:px-24 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase mb-4">THE TRINITY OF PURPOSE</span>
                    <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
                        Our <span className="text-orange-600">Guiding</span> Stars
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((val, index) => (
                        <ValueCard key={index} {...val} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
