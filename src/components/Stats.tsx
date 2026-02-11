'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { History, Users, Award, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const StatItem = ({ number, label, icon: Icon, showPlus = true, isLast = false }: { number: number, label: string, icon: any, showPlus?: boolean, isLast?: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    const count = useSpring(0, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001
    });

    const display = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            count.set(number);
        }
    }, [isInView, count, number]);

    return (
        <div ref={ref} className="relative flex flex-col items-center justify-center p-8 group transition-all">
            <motion.div
                whileHover={{ rotate: 10, scale: 1.2 }}
                className="text-orange-600 mb-6 transition-colors group-hover:text-orange-400"
            >
                <Icon size={36} strokeWidth={1.5} />
            </motion.div>

            <div className="flex items-baseline">
                <motion.span
                    className="text-6xl lg:text-7xl font-black text-[#f97316] tracking-tighter transition-all group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                >
                    {display}
                </motion.span>
                {showPlus && <span className="text-4xl lg:text-5xl font-black text-[#f97316] ml-1">+</span>}
            </div>

            <span className="text-white text-[10px] lg:text-xs tracking-[0.4em] font-black uppercase mt-4 text-center opacity-80 group-hover:opacity-100 transition-opacity">
                {label}
            </span>

            {/* Desktop Vertical Divider */}
            {!isLast && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-20 bg-white/10" />
            )}
        </div>
    );
};

const Stats = () => {
    const statsData = [
        { number: 12, label: "Centuries of Heritage", icon: History },
        { number: 500, label: "Students Trained", icon: Users },
        { number: 15, label: "National Awards", icon: Award },
        { number: 10, label: "Expert Gurus", icon: GraduationCap }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-[#1a0f0a] flex flex-col items-center justify-center min-h-[70vh]">
            {/* Cinematic Background Image (Lightened) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/stats-bg.png"
                    alt="Academy Atmosphere"
                    fill
                    className="object-cover opacity-90 transition-all duration-[2000ms] ease-in-out hover:scale-110 pointer-events-none"
                    priority
                />
                {/* Softer, more transparent gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/90 via-[#1a0f0a]/40 to-[#1a0f0a]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0a]/80 via-transparent to-[#1a0f0a]/80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* Title Section */}
                <div className="text-center mb-20 relative overflow-hidden group">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-orange-300 text-xs tracking-[0.6em] font-black uppercase mb-4 transition-all group-hover:tracking-[1em] duration-500">NUMBERS THAT SPEAK</span>
                        <h2 className="text-white text-3xl lg:text-8xl font-black tracking-tighter uppercase leading-none font-sans transition-all group-hover:scale-[1.02]">
                            The Power of <br />
                            <span className="text-orange-500 group-hover:text-orange-400 transition-all">Impact</span>
                        </h2>
                        <div className="h-[2px] w-24 bg-orange-500 mt-10 transition-all group-hover:w-48 duration-500" />
                    </motion.div>
                </div>

                {/* Stats Grid - Light glassmorphism */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 items-center bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/20 py-10 shadow-2xl">
                    {statsData.map((stat, index) => (
                        <StatItem
                            key={index}
                            {...stat}
                            isLast={index === statsData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
