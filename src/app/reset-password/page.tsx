'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ChevronLeft, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import { resetPassword } from '@/app/actions/password';
import { useRouter } from 'next/navigation';
import OtpInput from '@/components/OtpInput';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Auto-fill from URL parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const tokenParam = params.get('token');

        if (emailParam) setEmail(emailParam);
        if (tokenParam) setToken(tokenParam);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token.length < 6) {
            setError("Please enter the 6-digit magic code.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const res = await resetPassword(email, token, newPassword);
            if (res.success) {
                alert("Password successfully reclaimed! You may now enter the arena.");
                router.push('/signin');
            } else {
                setError(res.message || "Reset failed.");
            }
        } catch (err: any) {
            setError("Recovery failed. Check your code.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-8 lg:p-24">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/5 via-black to-black opacity-50" />

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
                    <div className="text-center mb-10">
                        <div className="mb-6 flex justify-center">
                            <span className="bg-white text-black px-3 py-1 text-2xl font-black tracking-tighter">K</span>
                            <span className="text-white text-2xl font-black tracking-tighter ml-1">DMA</span>
                        </div>
                        <h1 className="text-white text-3xl font-black tracking-tighter uppercase mb-2">Reclaim <span className="text-orange-600">Access</span></h1>
                        <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">SEALING THE BREACH</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase p-4 rounded-xl text-center tracking-widest">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Warrior Email</label>
                            <div className="relative group/input">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="hellokdma@gmail.com"
                                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Magic Code</label>
                            <OtpInput length={6} onComplete={(val) => setToken(val)} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">New Secret Key</label>
                            <div className="relative group/input">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/input:text-orange-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10 text-sm"
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || token.length < 6}
                            className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] mt-4 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Complete Recovery
                                    <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
