'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, Phone, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { createUser } from '@/app/actions/users';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError("Please fill in all mandatory fields.");
            return;
        }

        if (formData.phone.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await createUser(formData);
            router.push('/signin?registered=true');
        } catch (err: any) {
            setError(err.message || "Failed to register. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col lg:flex-row-reverse">
            {/* Right Side: Cinematic Cover */}
            <div className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/heritage-master.png"
                        alt="Join Cover"
                        fill
                        className="object-cover grayscale saturate-[0.8] brightness-[0.6] transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>

                <div className="relative z-10 p-24 flex flex-col justify-end items-end w-full h-full text-right">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <div className="flex items-center justify-end gap-4 mb-6">
                            <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase">THE WARRIOR INITIATION</span>
                            <div className="h-px w-12 bg-orange-600" />
                        </div>
                        <h2 className="text-white text-7xl font-black tracking-tighter leading-none uppercase mb-6">
                            FORGE YOUR <br />
                            <span className="text-orange-600">LEGACY</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-sans font-medium max-w-md leading-relaxed">
                            Begin your journey into the world of ancient Mallakhamb. Join the academy and transcend your physical limits.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Left Side: Register Form */}
            <div className="relative flex-grow flex flex-col items-center justify-center p-8 lg:p-24 bg-black">
                <Link
                    href="/"
                    className="absolute top-10 left-10 lg:left-24 flex items-center gap-3 text-white/40 hover:text-orange-500 transition-colors group z-20"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-widest uppercase">BACK TO LEGACY</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-xl"
                >
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 lg:p-14 shadow-2xl overflow-hidden relative group">
                        <div className="text-center mb-10">
                            <div className="mb-6 flex justify-center">
                                <span className="bg-white text-black px-3 py-1 text-2xl font-black tracking-tighter">K</span>
                                <span className="text-white text-2xl font-black tracking-tighter ml-1">DMA</span>
                            </div>
                            <h1 className="text-white text-4xl font-black tracking-tighter uppercase mb-2">Join the Academy</h1>
                            <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">INITIATE YOUR TRANSFORMATION</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {error && (
                                <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase p-4 rounded-xl text-center tracking-widest">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Warrior Name</label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Arjun Sharma"
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                        required
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Email Arena</label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="hellokdma@gmail.com"
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                        required
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1 flex justify-between">
                                    <span>Signal Frequency (Phone)</span>
                                    <span className="text-orange-500/60 font-black">Mandatory</span>
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="+91 99999 00000"
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm shadow-inner"
                                        required
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Secret Key (Password)</label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                        required
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="md:col-span-2 w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        PROCESSING...
                                    </>
                                ) : (
                                    <>
                                        Claim Your Identity
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>



                        <div className="mt-10 text-center text-[10px] font-black tracking-widest uppercase">
                            <span className="text-white/40">Already a practitioner? </span>
                            <Link href="/signin" className="text-orange-500 hover:text-orange-400 transition-colors">Sign In</Link>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 text-white/20 text-[8px] font-black tracking-[0.3em] uppercase">
                    KDMA ACADEMY • REGISTERED SINCE 1135 AD
                </div>
            </div>
        </main>
    );
}
