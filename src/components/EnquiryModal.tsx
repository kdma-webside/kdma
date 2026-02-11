'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import Image from 'next/image';
import { createEnquiry } from '@/app/actions/enquiries';

const EnquiryModal = () => {
    const { isOpen, closeEnquiry } = useEnquiry();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'Foundational'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createEnquiry(formState);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                closeEnquiry();
                setIsLoading(false);
            }, 3000);
        } catch (error) {
            console.error("Enquiry submission failed:", error);
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeEnquiry}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Portal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
                    >
                        {/* Left Side: Cinematic Visual */}
                        <div className="relative hidden lg:block lg:w-2/5 overflow-hidden">
                            <Image
                                src="/images/heritage-master.png"
                                alt="Master Athlete"
                                fill
                                className="object-cover grayscale saturate-50 opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]" />
                            <div className="absolute inset-x-8 bottom-12 z-10">
                                <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">ADMISSIONS 2026</span>
                                <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-4">FORGE YOUR<br /><span className="text-orange-600">LIMITS</span></h3>
                                <p className="text-gray-400 text-xs font-sans leading-relaxed italic">"The pole does not bend for the weak. You must become the strength."</p>
                            </div>
                        </div>

                        {/* Right Side: Recruitment Form */}
                        <div className="flex-grow p-8 lg:p-16 relative">
                            <button
                                onClick={closeEnquiry}
                                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                                >
                                    <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,88,12,0.4)]">
                                        <ShieldCheck size={40} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">Lead Captured</h4>
                                        <p className="text-gray-500 text-sm font-sans tracking-wide">A recruitment master will contact your signal shortly.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-orange-500 text-[10px] font-black tracking-[0.2em] uppercase">
                                        <Sparkles size={14} />
                                        PREPARING YOUR LEGACY
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-10">
                                    <div>
                                        <h2 className="text-white text-4xl font-black uppercase tracking-tighter mb-3">Recruitment <span className="text-orange-600">Portal</span></h2>
                                        <p className="text-gray-500 text-sm font-sans">Submit your credentials to enter the KDMA Academy.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name Input */}
                                            <div className="space-y-2 group">
                                                <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Warrior Name</label>
                                                <div className="relative">
                                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Vidyut Jamwal"
                                                        value={formState.name}
                                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="space-y-2 group">
                                                <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Signal Channel (Email)</label>
                                                <div className="relative">
                                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="warrior@legacy.com"
                                                        value={formState.email}
                                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Input - MANDATORY */}
                                        <div className="space-y-2 group">
                                            <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Frequency (Phone Number) *</label>
                                            <div className="relative">
                                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    value={formState.phone}
                                                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>

                                        {/* Interest Select */}
                                        <div className="space-y-2">
                                            <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Path of Interest</label>
                                            <select
                                                value={formState.interest}
                                                onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Foundational" className="bg-black">Foundational Pole</option>
                                                <option value="Professional" className="bg-black">Professional Competition</option>
                                                <option value="Heritage" className="bg-black">Heritage Yoga (Mallakhamb)</option>
                                                <option value="Children" className="bg-black">Gurukul (Children's Program)</option>
                                            </select>
                                        </div>

                                        {/* Privacy Disclaimer */}
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest text-center leading-relaxed">
                                            By entering the portal, you agree to our Code of Conduct and acknowledge that your signal will be verified.
                                        </p>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-[0.3em] text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    INITIATING...
                                                </>
                                            ) : (
                                                <>
                                                    INITIATE RECRUITMENT
                                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EnquiryModal;
