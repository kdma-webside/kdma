'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const { openEnquiry } = useEnquiry();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black overflow-hidden">
            {/* --- CTA Section --- */}
            <section className="relative py-16 md:py-32 px-6 lg:px-24 border-t border-white/5 overflow-hidden group">
                {/* Background Image/Texture with Spotlight */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/unified-hero-athlete.png"
                        alt="Join Academy"
                        fill
                        className="object-cover object-center opacity-60 group-hover:scale-105 transition-all duration-[3000ms]"
                    />
                    {/* Radial Spotlight Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-3xl text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center lg:justify-start space-x-4 mb-6"
                        >
                            <span className="text-orange-500 text-xs tracking-[0.6em] font-black uppercase">READY TO BEGIN?</span>
                            <div className="h-[1px] w-12 bg-orange-600" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] font-sans mb-8"
                        >
                            Forge Your <br />
                            <span className="text-orange-600">Legacy</span>
                        </motion.h2>

                        <p className="text-gray-400 text-lg lg:text-xl font-sans font-medium mb-10 max-w-xl">
                            Join the elite ranks of Mallakhamb practitioners. Master your body, sharpen your mind, and become part of a 900-year-old warrior tradition.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <button
                                onClick={openEnquiry}
                                className="bg-orange-600 text-white px-12 py-5 font-black tracking-widest text-sm shadow-[0_15px_40px_rgba(249,115,22,0.4)] hover:bg-orange-700 transition-all uppercase font-sans group"
                            >
                                <span className="flex items-center gap-3">
                                    START YOUR TRAINING
                                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </button>
                            <button
                                onClick={openEnquiry}
                                className="border border-white/10 hover:border-orange-600/50 backdrop-blur-xl px-12 py-5 font-black tracking-widest text-sm transition-all uppercase font-sans text-white hover:bg-orange-600/10"
                            >
                                CONTACT ADMISSIONS
                            </button>
                        </div>
                    </div>

                    {/* Stats/Badge in CTA */}
                    {/* Stats/Badge in CTA with Heartbeat and Live Pulse */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-64 h-64 flex items-center justify-center"
                    >
                        {/* Outer Rotating Glowing Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-orange-600/20 rounded-full"
                        />

                        {/* Inner Pulsing and Rotating Ring */}
                        <motion.div
                            animate={{
                                rotate: -360,
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute inset-4 border border-orange-500/40 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                        />

                        {/* Heartbeat Logic for Text */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                times: [0, 0.1, 0.2, 0.3, 1],
                                ease: "easeInOut"
                            }}
                            className="text-center z-10"
                        >
                            <span className="text-orange-500 text-5xl font-black block mb-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">2026</span>
                            <span className="text-white text-[10px] tracking-[0.4em] font-black uppercase">ADMISSIONS OPEN</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- Main Footer Bottom --- */}
            <div className="relative py-20 px-12 lg:px-24 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">

                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="text-white font-black text-4xl tracking-tighter flex items-center">
                            <span className="bg-white text-black px-2 mr-1">K</span>
                            <span className="text-orange-600">DMA</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Dedicated to the preservation and promotion of Mallakhambam, the ancient Indian sport that balances extreme strength with supreme flexibility.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-600/50 transition-all">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white text-xs tracking-[0.4em] font-black uppercase mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About', href: '/about' },
                                { name: 'Committee', href: '/committee' },
                                { name: 'Gallery', href: '/gallery' },
                                { name: 'Events', href: '/events' },
                                { name: 'Store', href: '/store' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-orange-500 text-sm font-bold transition-colors uppercase tracking-widest">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white text-xs tracking-[0.4em] font-black uppercase mb-8">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <MapPin size={20} className="text-orange-600 flex-shrink-0" />
                                <span className="text-gray-500 text-sm leading-relaxed">
                                    District Sports Complex,<br />
                                    Kanyakumari, Tamil Nadu
                                </span>
                            </li>
                            <li className="flex gap-4">
                                <Phone size={20} className="text-orange-600 flex-shrink-0" />
                                <span className="text-gray-500 text-sm font-bold tracking-widest">+91 98429 00900, +91 77082 44424</span>
                            </li>
                            <li className="flex gap-4">
                                <Mail size={20} className="text-orange-600 flex-shrink-0" />
                                <span className="text-gray-500 text-sm font-bold tracking-widest">hellokdma@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter/Legal Column */}
                    <div>
                        <h4 className="text-white text-xs tracking-[0.4em] font-black uppercase mb-8">Stay Updated</h4>
                        <div className="relative mb-6">
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const email = (e.target as any).email.value;
                                    const { subscribeToNewsletter } = await import('@/app/actions/newsletter');
                                    const res = await subscribeToNewsletter(email);
                                    alert(res.message);
                                    if (res.success) (e.target as any).reset();
                                }}
                            >
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-orange-600/50 transition-all font-sans"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 bg-orange-600 text-white px-4 rounded-lg flex items-center justify-center hover:bg-orange-700 transition-all"
                                >
                                    <ArrowUpRight size={18} />
                                </button>
                            </form>
                        </div>
                        <p className="text-[10px] text-gray-600 tracking-widest uppercase font-bold">
                            By subscribing, you agree to our Privacy Policy and Terms of Service.
                        </p>
                    </div>
                </div>

                {/* Copyright Line */}
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[10px] tracking-[0.3em] font-bold uppercase">
                        © {currentYear} KANYAKUMARI DISTRICT MALLKAMBH ASSOCIATION (KDMA). ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-12">
                        <Link href="#" className="text-gray-600 text-[10px] tracking-[0.3em] font-bold uppercase hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-600 text-[10px] tracking-[0.3em] font-bold uppercase hover:text-white transition-colors">Terms of Work</Link>
                    </div>
                </div>
            </div>

            {/* Absolute Bottom Branding Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent blur-xl" />
        </footer>
    );
};

export default Footer;
