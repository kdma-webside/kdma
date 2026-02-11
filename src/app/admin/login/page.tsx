'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { loginAdmin } from '@/app/actions/admin';

const AdminLoginPage = () => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(loginAdmin, { success: false, message: '' });

    // Redirect on success
    // Using a side effect to handle redirect after state update
    useEffect(() => {
        if (state?.success) {
            router.push('/admin');
        }
    }, [state, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1),transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600/20 to-transparent blur-xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-[#080808] border border-white/10 rounded-[40px] p-10 shadow-2xl space-y-12">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-orange-600 rounded-[24px] flex items-center justify-center mx-auto shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] mb-8">
                            <Shield size={40} className="text-white" />
                        </div>
                        <h1 className="text-white text-4xl font-black uppercase tracking-tighter leading-none">Command Center</h1>
                        <p className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">Security Protocol Active</p>
                    </div>

                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Administrator ID</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                <input
                                    required
                                    name="username"
                                    type="text"
                                    placeholder="COMMANDER"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/5"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Access Cipher</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/5"
                                />
                            </div>
                        </div>

                        {state?.message && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-[10px] font-black tracking-widest uppercase text-center"
                            >
                                {state.message}
                            </motion.p>
                        )}

                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-[0.3em] text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 shadow-[0_15px_30px_-5px_rgba(234,88,12,0.3)]"
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    AUTHORIZE ACCESS
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[8px] text-white/10 font-black tracking-[0.3em] uppercase leading-relaxed">
                        Authorized Personnel Only • Unauthorized Access Attempts Are Logged
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
