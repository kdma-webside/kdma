'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { Shield, Lock as LockIcon, Key, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { updateAdminPassword } from '@/app/actions/admin';

const AdminPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: null, message: '' });

        try {
            // For now, we assume 'admin' since the login page also uses it
            const result = await updateAdminPassword('admin', formData.currentPassword, formData.newPassword);

            if (result.success) {
                setStatus({ type: 'success', message: result.message });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setStatus({ type: 'error', message: result.message });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'System failure during protocol update' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-12 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">SECURITY PROTOCOL v2.4</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">Access <span className="text-orange-600">Cipher</span></h2>
                    </div>
                    <div className="flex items-center gap-4 bg-orange-600/10 border border-orange-600/20 px-6 py-3 rounded-2xl">
                        <LockIcon size={16} className="text-orange-500" />
                        <span className="text-xs font-black text-orange-500 uppercase tracking-widest">Encrypted Auth Layer</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form Side */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#080808] border border-white/5 p-10 rounded-[40px] space-y-8 shadow-2xl"
                        >
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Current Cipher</label>
                                    <div className="relative">
                                        <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            required
                                            type="password"
                                            placeholder="VERIFY CURRENT IDENTITY"
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/5"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">New Access Cipher</label>
                                    <div className="relative">
                                        <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            required
                                            type="password"
                                            placeholder="GENERATE NEW SEQUENCE"
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/5"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-orange-500 text-[10px] font-black tracking-widest uppercase ml-1">Confirm New Sequence</label>
                                    <div className="relative">
                                        <CheckCircle2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            required
                                            type="password"
                                            placeholder="VALIDATE SEQUENCE"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all placeholder:text-white/5"
                                        />
                                    </div>
                                </div>

                                {status.type && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                                            }`}
                                    >
                                        {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                        <p className="text-[10px] font-black uppercase tracking-widest">{status.message}</p>
                                    </motion.div>
                                )}

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full bg-orange-600 text-white p-6 rounded-2xl font-black tracking-[0.3em] text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 shadow-[0_15px_30px_-5px_rgba(234,88,12,0.3)]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            REWRITE ACCESS CIPHER
                                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Security Info Side */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#080808] border border-white/5 p-10 rounded-[40px] space-y-8">
                            <h4 className="text-white text-xl font-black uppercase tracking-tighter">Cipher Protocols</h4>
                            <div className="space-y-6">
                                {[
                                    { title: 'Entropy Requirements', desc: 'Secure passwords should exceed 12 characters with varied symbolic markers.' },
                                    { title: 'Identity Verification', desc: 'Current identity must be validated before any cipher override is authorized.' },
                                    { title: 'System Propagation', desc: 'Cipher changes propagate immediately through the entire Command Center node.' }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-orange-600 font-black text-xs pt-1">0{i + 1}</span>
                                        <div className="space-y-1">
                                            <p className="text-white text-xs font-black uppercase tracking-widest">{step.title}</p>
                                            <p className="text-gray-500 text-[10px] font-medium leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-orange-600/5 border border-orange-600/10 p-10 rounded-[40px] relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <Shield className="text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-500" size={32} />
                                <h4 className="text-white text-lg font-black uppercase tracking-tighter leading-none">Security Status</h4>
                                <p className="text-orange-500/60 text-[10px] font-black uppercase tracking-widest">Protocol: AES-256 Equivalent</p>
                            </div>
                            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <LockIcon size={160} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPasswordPage;
