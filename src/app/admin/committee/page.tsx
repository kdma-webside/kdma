'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getCommitteeMembers, createCommitteeMember, updateCommitteeMember, deleteCommitteeMember } from '@/app/actions/committee';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommitteeManagement = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getCommitteeMembers();
        setMembers(data);
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setIsAdding(true);
        setFormData({ ...item });
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await updateCommitteeMember(editingId, formData);
            } else {
                await createCommitteeMember(formData);
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({});
            loadData();
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this member?')) {
            try {
                await deleteCommitteeMember(id);
                loadData();
            } catch (error) {
                console.error('Error deleting:', error);
                alert('Failed to delete. Please try again.');
            }
        }
    };

    const categories = [
        "President",
        "Vice president",
        "Secretary",
        "Joint secretary",
        "Cordinator",
        "Tressurer",
        "Executive comittee"
    ];

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">GOVERNANCE</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Committee <span className="text-orange-600">Management</span></h2>
                    </div>

                    <button
                        onClick={() => {
                            setIsAdding(true);
                            setEditingId(null);
                            setFormData({
                                name: '',
                                position: '',
                                description: '',
                                image: '/images/heritage-master.png',
                                category: 'President',
                                order: 0
                            });
                        }}
                        className="bg-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                    >
                        <Plus size={18} />
                        Add Member
                    </button>
                </div>

                <AnimatePresence mode="popLayout">
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-orange-600/5 border border-orange-600/30 rounded-[32px] p-8 space-y-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Name</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Position</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.position || ''}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.description || ''}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Category</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500 text-white"
                                            value={formData.category || 'President'}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Order (Display sequence)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.order || 0}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Image URL</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.image || ''}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                                <button onClick={() => { setIsAdding(false); setEditingId(null); setFormData({}); }} className="px-8 py-3 rounded-xl border border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-orange-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-orange-700 shadow-xl transition-all">Save</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 gap-6">
                    {members.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            className="bg-[#080808] border border-white/5 rounded-[32px] p-8 flex flex-col lg:flex-row items-center gap-8 group hover:border-white/10 transition-all"
                        >
                            <div className="relative group/img w-24 h-24 shrink-0">
                                <div className="absolute inset-0 bg-orange-600/20 rounded-2xl blur group-hover/img:blur-xl transition-all opacity-0 group-hover/img:opacity-100" />
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-transform group-hover/img:scale-105">
                                    <img src={item.image || '/images/heritage-master.png'} className="object-cover w-full h-full" alt="" />
                                </div>
                            </div>

                            <div className="flex-grow space-y-2 text-center lg:text-left">
                                <div className="flex items-center gap-3 justify-center lg:justify-start">
                                    <h4 className="text-white text-xl font-black uppercase tracking-tight">{item.name}</h4>
                                    <span className="text-orange-500 text-[10px] font-black px-2 py-1 bg-orange-500/10 rounded-lg whitespace-nowrap">{item.category}</span>
                                </div>
                                <p className="text-orange-600 text-xs font-bold uppercase tracking-widest">{item.position}</p>
                                <p className="text-gray-400 text-sm line-clamp-2">{item.description || 'No description provided.'}</p>
                            </div>

                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-4 bg-white/5 text-gray-400 rounded-2xl hover:text-orange-500 transition-colors">
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-4 bg-white/5 text-gray-400 rounded-2xl hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CommitteeManagement;
