'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
    getNewsletterContent,
    getSubscribers,
    createNewsletterUpdate,
    updateNewsletterUpdate,
    deleteNewsletterUpdate
} from '@/app/actions/newsletter';
import { Mail, Send, Plus, Trash2, Edit3, Users, Clock, CheckCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToExcel } from '@/lib/exportUtils';
import DateFilter from '@/components/admin/DateFilter';

const NewsletterManagement = () => {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [updates, setUpdates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newUpdate, setNewUpdate] = useState({ subject: '', content: '' });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [subData, updateData] = await Promise.all([
            getSubscribers(),
            getNewsletterContent()
        ]);
        setSubscribers(subData);
        setUpdates(updateData);
        setIsLoading(false);
    };

    const filterByDate = (data: any[]) => {
        if (!startDate && !endDate) return data;

        return data.filter(item => {
            const itemDate = new Date(item.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(23, 59, 59, 999);

            if (start && itemDate < start) return false;
            if (end && itemDate > end) return false;
            return true;
        });
    };

    const handleExport = () => {
        const data = filterByDate(subscribers);

        if (data.length === 0) {
            alert('No subscribers to export for the selected range');
            return;
        }

        const formattedData = data.map((sub: any) => ({
            'Email': sub.email,
            'Joined On': new Date(sub.createdAt).toLocaleDateString('en-GB')
        }));

        exportToExcel(formattedData, 'newsletter_subscribers', 'SUBSCRIBERS');
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createNewsletterUpdate(newUpdate);
        setNewUpdate({ subject: '', content: '' });
        setIsCreating(false);
        await loadData();
        setIsLoading(false);
    };

    const handleSend = async (id: string) => {
        if (!confirm("Are you sure you want to broadcast this update to all subscribers?")) return;
        setIsLoading(true);
        await updateNewsletterUpdate(id, { status: 'sent' });
        alert("Broadcast initiated successfully!");
        await loadData();
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Destroy this transmission?")) return;
        await deleteNewsletterUpdate(id);
        await loadData();
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">NEWSLETTER PROTOCOL</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Stay <span className="text-orange-600">Updated</span></h2>
                    </div>

                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(234,88,12,0.3)]"
                    >
                        <Plus size={18} />
                        New Transmission
                    </button>
                </div>

                {/* Stats Grid & Subscriber List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Subscribers List */}
                    <div className="bg-[#080808] border border-white/5 rounded-[40px] p-8 space-y-8 lg:col-span-1 max-h-[600px] overflow-hidden flex flex-col">
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-white text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                    <Users size={20} className="text-blue-500" />
                                    Warriors <span className="text-blue-500/50">Joined</span>
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleExport}
                                        title="Export to Excel"
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-orange-500 transition-all"
                                    >
                                        <Download size={14} />
                                    </button>
                                    <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">{filterByDate(subscribers).length}</span>
                                </div>
                            </div>

                            <DateFilter
                                startDate={startDate}
                                endDate={endDate}
                                onStartDateChange={setStartDate}
                                onEndDateChange={setEndDate}
                                label="Join Date Range"
                            />
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-3 custom-scrollbar pr-2">
                            {filterByDate(subscribers).map((sub: any) => (
                                <motion.div
                                    key={sub.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-sm"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                                            <Mail size={14} />
                                        </div>
                                        <span className="text-gray-300 text-xs font-sans truncate font-medium">{sub.email}</span>
                                    </div>
                                    <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest hidden group-hover:block transition-all">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </span>
                                </motion.div>
                            ))}
                            {filterByDate(subscribers).length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                                        {(startDate || endDate) ? "No practitioners match the range." : "No practitioners in the circle yet."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: History & Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-600/10 rounded-[40px] p-8 flex items-center gap-8">
                            <div className="w-20 h-20 bg-orange-600 rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-orange-600/20">
                                <Send size={32} />
                            </div>
                            <div>
                                <h3 className="text-white text-3xl font-black uppercase tracking-tighter">Transmission Registry</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                    {updates.filter(u => u.status === 'sent').length} BROADCASTS SENT TO THE ALLIANCE
                                </p>
                            </div>
                        </div>

                        {/* Creation Button (Mobile Style) */}
                        {!isCreating && (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="w-full bg-white/5 border border-white/5 border-dashed rounded-[40px] p-12 flex flex-col items-center justify-center gap-4 group hover:border-orange-600/50 transition-all"
                            >
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-orange-500 group-hover:scale-110 transition-all">
                                    <Plus size={24} />
                                </div>
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Draft New Initiation</span>
                            </button>
                        )}

                        <AnimatePresence>
                            {isCreating && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="bg-[#080808] border border-orange-600/20 rounded-[40px] p-10 space-y-8 shadow-2xl"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white text-2xl font-black uppercase tracking-tight">Transmission <span className="text-orange-600">Forge</span></h3>
                                        <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-white uppercase text-[8px] font-black tracking-widest px-4 py-2 border border-white/5 rounded-lg">Abort</button>
                                    </div>
                                    <form onSubmit={handleCreate} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Subject Line</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="KDMA | Upcoming Warrior Initiation"
                                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all text-sm"
                                                value={newUpdate.subject}
                                                onChange={(e) => setNewUpdate({ ...newUpdate, subject: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">Transmission Content</label>
                                            <textarea
                                                required
                                                rows={6}
                                                placeholder="Greetings Warriors..."
                                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-sans focus:outline-none focus:border-orange-600/50 transition-all text-sm resize-none"
                                                value={newUpdate.content}
                                                onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/10"
                                        >
                                            Lock to Archives
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-grow bg-white/5" />
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">Transmission Archive</h3>
                        <div className="h-[1px] flex-grow bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {updates.map((update) => (
                            <div key={update.id} className="bg-[#080808] border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:border-white/10 transition-all">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            {update.status === 'sent' ? (
                                                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest">Broadcasted</div>
                                            ) : (
                                                <div className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-[8px] font-black uppercase tracking-widest">Draft</div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{new Date(update.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-white text-xl font-black uppercase tracking-tight line-clamp-1">{update.subject}</h4>
                                    <p className="text-gray-500 text-sm font-sans line-clamp-3 leading-relaxed">{update.content}</p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <button onClick={() => handleDelete(update.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    {update.status === 'draft' && (
                                        <button
                                            onClick={() => handleSend(update.id)}
                                            className="flex items-center gap-2 text-white bg-orange-600/10 hover:bg-orange-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                        >
                                            <Send size={14} />
                                            Initiate Broadcast
                                        </button>
                                    )}
                                    {update.status === 'sent' && (
                                        <div className="flex items-center gap-2 text-gray-500 text-[8px] font-black uppercase tracking-widest">
                                            <CheckCircle size={14} className="text-green-500" />
                                            Sent on {new Date(update.sentAt!).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsletterManagement;
