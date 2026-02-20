'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, ChevronLeft, Loader2, CheckCircle } from 'lucide-react';
import { sendPasswordReset } from '@/app/actions/password';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await sendPasswordReset(email);
            setIsSent(true);
        } catch (err: any) {
            setError("Failed to initiate reset. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-8 lg:p-24">
            {/* Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 via-black to-black opacity-50" />

            {/* Back Link */}
            <Link
                href="/signin"
                className="absolute top-10 left-10 lg:left-24 flex items-center gap-3 text-white/40 hover:text-orange-500 transition-colors group z-20"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black tracking-widest uppercase">BACK TO ARENA</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 lg:p-14 shadow-2xl overflow-hidden relative group">
                    <div className="text-center mb-12">
                        <div className="mb-6 flex justify-center">
                            <span className="bg-white text-black px-3 py-1 text-2xl font-black tracking-tighter">K</span>
                            <span className="text-white text-2xl font-black tracking-tighter ml-1">DMA</span>
                        </div>
                        <h1 className="text-white text-3xl font-black tracking-tighter uppercase mb-2">Lost Your <span className="text-orange-600">Key?</span></h1>
                        <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">INITIATE RECOVERY PROTOCOL</p>
                    </div>

                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase p-4 rounded-xl text-center tracking-widest">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Registered Email</label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="hellokdma@gmail.com"
                                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] mt-4 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        Send Reset Link
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                    <CheckCircle size={40} />
                                </div>
                            </div>
                            <h3 className="text-white text-xl font-black mb-4">Transmission Sent</h3>
                            <p className="text-gray-400 text-sm font-sans mb-8">
                                If an account exists for <span className="text-white font-bold">{email}</span>,
                                you will receive recovery instructions shortly.
                            </p>
                            <Link
                                href="/reset-password"
                                className="inline-flex items-center gap-2 text-orange-500 font-black text-[10px] tracking-widest uppercase hover:text-white transition-colors"
                            >
                                I Have a Code <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </main>
    );
}
