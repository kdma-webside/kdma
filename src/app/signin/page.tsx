'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import SignInSuccess from '../../components/SignInSuccess';

import { useRouter } from 'next/navigation';
import { verifyUser } from '@/app/actions/users';

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await verifyUser(formData);
            setShowSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to sign in. Please check your credentials.");
            setIsLoading(false);
        }
    };



    if (showSuccess) {
        return <SignInSuccess />;
    }

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col lg:flex-row">
            {/* Left Side: Cinematic Cover */}
            <div className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/unified-hero-athlete.png"
                        alt="Auth Cover"
                        fill
                        className="object-cover grayscale saturate-[0.5] brightness-75 transition-all duration-700 hover:scale-105"
                    />
                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </motion.div>

                {/* Cover Content */}
                <div className="relative z-10 p-24 flex flex-col justify-end w-full h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12 bg-orange-600" />
                            <span className="text-orange-500 text-xs tracking-[0.8em] font-black uppercase">THE ANCIENT PATH</span>
                        </div>
                        <h2 className="text-white text-7xl font-black tracking-tighter leading-none uppercase mb-6">
                            RETURN TO <br />
                            <span className="text-orange-600">STRENGTH</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-sans font-medium max-w-md leading-relaxed">
                            Access your training chronicles and rejoin the ranks of the elite Mallakhamb practitioners.
                        </p>
                    </motion.div>
                </div>

                {/* Floating Light Rays */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-orange-600/5 blur-[120px] rounded-full rotate-45" />
                </div>
            </div>

            {/* Right Side: Auth Portal */}
            <div className="relative flex-grow flex flex-col items-center justify-center p-8 lg:p-24 bg-black">
                {/* Back Link */}
                <Link
                    href="/"
                    className="absolute top-10 left-10 lg:left-24 flex items-center gap-3 text-white/40 hover:text-orange-500 transition-colors group z-20"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-widest uppercase">BACK TO LEGACY</span>
                </Link>

                {/* Mobile Background Atmosphere */}
                <div className="absolute inset-0 z-0 lg:hidden">
                    <Image
                        src="/images/stats-bg.png"
                        alt="Auth Background"
                        fill
                        className="object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Glass Container */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 lg:p-14 shadow-2xl overflow-hidden relative group">
                        {/* Animated Interior Light */}
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="text-center mb-12">
                            <div className="mb-6 flex justify-center">
                                <span className="bg-white text-black px-3 py-1 text-2xl font-black tracking-tighter">K</span>
                                <span className="text-white text-2xl font-black tracking-tighter ml-1">DMA</span>
                            </div>
                            <h1 className="text-white text-4xl font-black tracking-tighter uppercase mb-2">Welcome Back</h1>
                            <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">ACCESS THE SHRINE OF STRENGTH</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase p-4 rounded-xl text-center tracking-widest">
                                    {error}
                                </div>
                            )}
                            {/* Email Field */}
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

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-white/40 text-[9px] font-black tracking-widest uppercase">Secret Key</label>
                                    <Link href="/forgot-password" className="text-orange-600/60 hover:text-orange-500 text-[8px] font-black tracking-widest uppercase transition-colors">LOST KEY?</Link>
                                </div>
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
                                className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ENTERING...
                                    </>
                                ) : (
                                    <>
                                        Enter Arena
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>



                        <div className="mt-10 text-center text-[10px] font-black tracking-widest uppercase">
                            <span className="text-white/40">New to the academy? </span>
                            <Link href="/register" className="text-orange-500 hover:text-orange-400 transition-colors">Join Now</Link>
                        </div>
                    </div>
                </motion.div>

                {/* Copyright/Info */}
                <div className="absolute bottom-10 text-white/20 text-[8px] font-black tracking-[0.3em] uppercase">
                    © 2024 KDMA ACADEMY • THE SHRINE OF STRENGTH
                </div>
            </div>
        </main>
    );
}
