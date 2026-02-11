'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getTrainings, getCamps, createTraining, createCamp, updateTraining, updateCamp, deleteTraining, deleteCamp } from '@/app/actions/trainings';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrainingsManagement = () => {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [camps, setCamps] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'trainings' | 'camps'>('trainings');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [trainingsData, campsData] = await Promise.all([
            getTrainings(),
            getCamps()
        ]);
        setTrainings(trainingsData);
        setCamps(campsData);
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setIsAdding(true);
        if (activeTab === 'trainings') {
            setFormData({
                ...item,
                startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
                endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                ...item,
                startDate: new Date(item.startDate).toISOString().split('T')[0],
                endDate: new Date(item.endDate).toISOString().split('T')[0]
            });
        }
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                // Update existing
                if (activeTab === 'trainings') {
                    await updateTraining(editingId, formData);
                } else {
                    await updateCamp(editingId, formData);
                }
            } else {
                // Create new
                if (activeTab === 'trainings') {
                    await createTraining(formData);
                } else {
                    await createCamp(formData);
                }
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
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                if (activeTab === 'trainings') {
                    await deleteTraining(id);
                } else {
                    await deleteCamp(id);
                }
                loadData();
            } catch (error) {
                console.error('Error deleting:', error);
                alert('Failed to delete. Please try again.');
            }
        }
    };

    const currentData = activeTab === 'trainings' ? trainings : camps;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">WARRIOR PROGRAMS</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Trainings <span className="text-orange-600">Management</span></h2>
                    </div>

                    <button
                        onClick={() => {
                            setIsAdding(true);
                            setEditingId(null);
                            setFormData(activeTab === 'trainings' ? {
                                title: '',
                                description: '',
                                duration: '',
                                startDate: new Date().toISOString().split('T')[0],
                                endDate: new Date().toISOString().split('T')[0],
                                level: 'Beginner',
                                category: 'Traditional',
                                image: '/images/unified-hero-athlete.png',
                                isActive: true
                            } : {
                                title: '',
                                description: '',
                                startDate: new Date().toISOString().split('T')[0],
                                endDate: new Date().toISOString().split('T')[0],
                                location: '',
                                price: 0,
                                image: '/images/unified-hero-athlete.png',
                                isActive: true
                            });
                        }}
                        className="bg-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                    >
                        <Plus size={18} />
                        Add New
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                    <button
                        onClick={() => setActiveTab('trainings')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'trainings' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Trainings ({trainings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('camps')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'camps' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Camps ({camps.length})
                    </button>
                </div>

                {/* Add/Edit Form */}
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
                                        <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Title</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                            value={formData.title || ''}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                    {activeTab === 'trainings' ? (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Duration (Optional)</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                    placeholder="e.g., 3 Months"
                                                    value={formData.duration || ''}
                                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Start Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.startDate || ''}
                                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">End Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.endDate || ''}
                                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Level</label>
                                                    <select
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.level || 'Beginner'}
                                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                    >
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Category</label>
                                                    <select
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.category || 'Traditional'}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    >
                                                        <option value="Traditional">Traditional</option>
                                                        <option value="Modern">Modern</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Start Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.startDate || ''}
                                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">End Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.endDate || ''}
                                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Location</label>
                                                    <input
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.location || ''}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Price</label>
                                                    <input
                                                        type="number"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                        value={formData.price || 0}
                                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
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

                {/* List */}
                <div className="grid grid-cols-1 gap-6">
                    {currentData.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            className="bg-[#080808] border border-white/5 rounded-[32px] p-8 flex flex-col lg:flex-row items-center gap-8 group hover:border-white/10 transition-all"
                        >
                            <div className="relative group/img w-24 h-24 shrink-0">
                                <div className="absolute inset-0 bg-orange-600/20 rounded-2xl blur group-hover/img:blur-xl transition-all opacity-0 group-hover/img:opacity-100" />
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-transform group-hover/img:scale-105">
                                    <img src={item.image || '/images/unified-hero-athlete.png'} className="object-cover w-full h-full" alt="" />
                                </div>
                            </div>

                            <div className="flex-grow space-y-2 text-center lg:text-left">
                                <h4 className="text-white text-xl font-black uppercase tracking-tight">{item.title}</h4>
                                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 text-xs">
                                    {activeTab === 'trainings' ? (
                                        <>
                                            <span>{item.duration}</span>
                                            <span>•</span>
                                            <span>{item.level}</span>
                                            <span>•</span>
                                            <span>{item.category}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{new Date(item.startDate).toLocaleDateString('en-GB')}</span>
                                            <span>•</span>
                                            <span>{item.location}</span>
                                            <span>•</span>
                                            <span>₹{item.price}</span>
                                        </>
                                    )}
                                </div>
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

export default TrainingsManagement;
