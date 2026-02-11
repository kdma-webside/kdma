'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGravityScroll } from '@/hooks/useGravityScroll';
import Image from 'next/image';

const disciplines = [
    {
        id: 'pole',
        title: 'POLE',
        subtitle: 'The Pillar of Power',
        description: 'A fixed teak wood pole where athletes perform acrobatic feats requiring immense grip strength and core stability.',
        image: '/images/benefit-discipline.jpg'
    },
    {
        id: 'rope',
        title: 'ROPE',
        subtitle: 'The Thread of Grace',
        description: 'A suspended cotton rope that challenges balance and flexibility, demanding fluid transitions in mid-air.',
        image: '/images/heritage-master.png'
    },
    {
        id: 'hanging',
        title: 'HANGING',
        subtitle: 'The Suspended Challenge',
        description: 'A shorter wooden pole suspended with hooks and chains, swinging freely to test precision and timing.',
        image: '/images/hero-bg.jpg'
    }
];

const DisciplineCard = ({ item, index }: { item: any; index: number }) => {
    // Apply gravity effect
    const { containerRef, rotate, y } = useGravityScroll(5 + index * 2);

    return (
        <motion.div
            ref={containerRef as any}
            style={{ rotate, y }}
            className="relative h-[600px] flex-shrink-0 w-full md:w-[400px] group overflow-hidden rounded-[40px] border border-white/5 bg-[#080808]"
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-10 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4">
                    <span className="text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase">0{index + 1}</span>
                    <div className="h-px w-12 bg-orange-600/50" />
                </div>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
};

const Disciplines = () => {
    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Header */}
            <div className="mb-24 flex flex-col items-center text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-orange-600 text-[10px] font-black tracking-[0.4em] uppercase mb-6"
                >
                    THE TRINITY
                </motion.span>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter"
                >
                    The Three <span className="text-orange-600/80">Forms</span>
                </motion.h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20">
                {disciplines.map((item, index) => (
                    <DisciplineCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Disciplines;
