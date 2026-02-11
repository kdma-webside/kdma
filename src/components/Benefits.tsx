'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, StretchHorizontal, Brain, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BenefitCard = ({ icon: Icon, title, text, image, index }: { icon: any, title: string, text: string, image: string, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98, y: -5 }}
            className="group relative bg-[#1a0f0a] border border-white/10 rounded-3xl flex flex-col h-[550px] shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] overflow-hidden cursor-pointer"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-60 group-hover:scale-110 group-active:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/80 to-transparent" />
            </div>

            <div className="relative z-10 p-10 mt-auto">
                <div className="w-14 h-14 bg-orange-600/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-orange-500 mb-8 border border-white/10 group-hover:bg-orange-600 group-hover:text-white group-active:bg-orange-600 group-active:text-white transition-all duration-300">
                    <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter font-sans lg:text-4xl leading-none">
                    {title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-medium font-sans opacity-90">
                    {text}
                </p>

                <Link href="/about#mission" className="flex items-center text-orange-500 font-bold text-xs tracking-[0.3em] uppercase transition-all transform group-hover:translate-x-2 group-active:translate-x-2">
                    EXPLORE MISSION <ArrowRight size={16} className="ml-3 group-active:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
    );
};

const Benefits = () => {
    const benefits = [
        {
            title: "Physical Strength",
            text: "Forge elite-level core power and explosive muscular endurance using the ancient 'Mother of all Sports' techniques.",
            image: "/images/benefit-strength.jpg",
            icon: Dumbbell
        },
        {
            title: "Flexibility & Balance",
            text: "Master the center of gravity. Develop a body that is as agile as it is powerful, with range of motion that defies limits.",
            image: "/images/benefit-flexibility.png",
            icon: StretchHorizontal
        },
        {
            title: "Mental Discipline",
            text: "The pole is a mirror for the mind. Sharp concentration and focus become your nature through rigorous practice.",
            image: "/images/benefit-discipline.jpg",
            icon: Brain
        }
    ];

    return (
        <section className="py-32 px-12 lg:px-24 bg-black relative overflow-hidden min-h-screen flex items-center">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/training-ground.png"
                    alt="Traditional Training Ground"
                    fill
                    className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="flex flex-col mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center space-x-6 mb-6"
                    >
                        <div className="h-[2px] w-20 bg-orange-600" />
                        <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase font-sans">THE JOURNEY THROUGH SHAKTI</span>
                        <div className="h-[2px] w-20 bg-orange-600" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-white text-4xl lg:text-9xl font-black tracking-tighter uppercase leading-none font-sans"
                    >
                        What Mallakhamb <br /> <span className="text-orange-600">Builds</span> In You
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {benefits.map((benefit, index) => (
                        <BenefitCard key={index} {...benefit} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
