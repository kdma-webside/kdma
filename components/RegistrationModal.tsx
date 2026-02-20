'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface FieldConfig {
    label: string;
    type: string;
    required?: boolean;
}

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    formConfig?: string | FieldConfig[];
    onSubmit: (data: any) => Promise<any>;
}

const RegistrationModal = ({ isOpen, onClose, title, formConfig, onSubmit }: RegistrationModalProps) => {
    const [formData, setFormData] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const fields: FieldConfig[] = formConfig
        ? (typeof formConfig === 'string' ? JSON.parse(formConfig) : formConfig)
        : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            await onSubmit({
                userName: formData['Name'] || formData['name'] || 'Anonymous',
                userEmail: formData['Email'] || formData['email'] || '',
                userPhone: formData['Phone'] || formData['phone'] || '',
                responses: formData
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({});
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-[0_20px_50px_rgba(234,88,12,0.3)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-8">
                            <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest block mb-2">Registration</span>
                            <h2 className="text-white text-3xl font-black uppercase tracking-tight">{title}</h2>
                        </div>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-white">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Registration Confirmed!</h3>
                                <p className="text-gray-400">Welcome to the training ground.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Default Fields */}
                                <div className="space-y-4">
                                    <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Your Details</h4>
                                    <div className="space-y-1">
                                        <label className="text-orange-500 text-[10px] font-bold uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-orange-500 text-[10px] font-bold uppercase tracking-widest ml-1">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-orange-500 text-[10px] font-bold uppercase tracking-widest ml-1">Phone</label>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                                onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Fields */}
                                {fields.length > 0 && (
                                    <div className="space-y-4 pt-4">
                                        <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Additional Info</h4>
                                        {fields.map((field, index) => (
                                            <div key={index} className="space-y-1">
                                                <label className="text-orange-500 text-[10px] font-bold uppercase tracking-widest ml-1">{field.label}</label>
                                                {field.type === 'textarea' ? (
                                                    <textarea
                                                        required={field.required !== false}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                                        rows={3}
                                                        onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                                    />
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        required={field.required !== false}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                                        onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-8"
                                >
                                    {isSubmitting ? 'Joining...' : 'Complete Registration'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center font-bold">Registration failed. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
