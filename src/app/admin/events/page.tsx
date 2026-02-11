'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getEvents, updateEvent, deleteEvent, createEvent } from '@/app/actions/events';
import AdminCalendar from '@/components/AdminCalendar';
import { Edit2, Trash2, Plus, Save, X, Calendar as CalendarIcon, MapPin, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventsManagement = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const data = await getEvents();
        setEvents(data);
    };

    const handleEdit = (event: any) => {
        setEditingId(event.id);
        const date = new Date(event.eventDate);
        setFormData({
            ...event,
            eventDate: date.toISOString().split('T')[0] // Ensure date input format
        });
    };

    const handleSave = async () => {
        if (editingId) {
            await updateEvent(editingId, formData);
            setEditingId(null);
        } else {
            await createEvent(formData);
            setIsAdding(false);
        }
        loadEvents();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            loadEvents();
        }
    };

    const handleCalendarDateSelect = (date: Date) => {
        setIsAdding(true);
        const dateStr = date.toISOString().split('T')[0];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        setFormData({
            title: '',
            description: '',
            eventDate: dateStr,
            month: months[date.getMonth()],
            day: date.getDate().toString(),
            location: '',
            status: 'upcoming',
            image: '/images/unified-hero-athlete.png'
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">MILESTONE BOARD</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Event <span className="text-orange-600">Operations</span></h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#0A0A0A] p-1 rounded-xl border border-white/10 flex items-center">
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-3 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white/10 text-orange-500 shadow-sm' : 'text-gray-500 hover:text-white'}`}
                            >
                                <CalendarIcon size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-orange-500 shadow-sm' : 'text-gray-500 hover:text-white'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setIsAdding(true);
                                const today = new Date();
                                const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                                setFormData({
                                    title: '',
                                    description: '',
                                    eventDate: today.toISOString().split('T')[0],
                                    month: months[today.getMonth()],
                                    day: today.getDate().toString(),
                                    location: '',
                                    status: 'upcoming',
                                    image: '/images/unified-hero-athlete.png'
                                });
                            }}
                            className="bg-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                        >
                            <Plus size={18} />
                            Announce
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {(isAdding || editingId) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-orange-600/5 border border-orange-600/30 rounded-[32px] p-8 space-y-8 mb-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Event Title</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Brief Description</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Event Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.eventDate ? (typeof formData.eventDate === 'string' ? formData.eventDate.split('T')[0] : new Date(formData.eventDate).toISOString().split('T')[0]) : ''}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value);
                                                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                                                    if (!isNaN(date.getTime())) {
                                                        setFormData({
                                                            ...formData,
                                                            eventDate: e.target.value,
                                                            month: months[date.getMonth()],
                                                            day: date.getDate().toString()
                                                        });
                                                    } else {
                                                        setFormData({ ...formData, eventDate: e.target.value });
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Month Display</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.month}
                                                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Day Display</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.day}
                                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Event Image URL</label>
                                            <div className="flex gap-4 items-start">
                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                                    <img src={formData.image || '/images/placeholder.jpg'} className="object-cover w-full h-full" alt="Preview" />
                                                </div>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                    placeholder="/images/..."
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Location Arena</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-orange-500"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-span-2 space-y-4 pt-4 border-t border-white/10">
                                            <div className="flex items-center justify-between">
                                                <label className="text-orange-500 text-[10px] font-black uppercase tracking-widest ml-1">Registration Form Fields</label>
                                                <button
                                                    onClick={() => {
                                                        const currentConfig = typeof formData.formConfig === 'string' ? JSON.parse(formData.formConfig || '[]') : (formData.formConfig || []);
                                                        setFormData({
                                                            ...formData,
                                                            formConfig: [...currentConfig, { label: 'New Field', type: 'text' }]
                                                        });
                                                    }}
                                                    className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-bold uppercase text-orange-500 hover:bg-white/10 transition-colors"
                                                >
                                                    + Add Field
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                {(typeof formData.formConfig === 'string' ? JSON.parse(formData.formConfig || '[]') : (formData.formConfig || [])).map((field: any, index: number) => (
                                                    <div key={index} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                        <div className="flex-grow space-y-1">
                                                            <input
                                                                className="w-full bg-transparent border-b border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 py-1"
                                                                value={field.label}
                                                                onChange={(e) => {
                                                                    const newConfig = [...(typeof formData.formConfig === 'string' ? JSON.parse(formData.formConfig) : (formData.formConfig || []))];
                                                                    newConfig[index].label = e.target.value;
                                                                    setFormData({ ...formData, formConfig: newConfig });
                                                                }}
                                                                placeholder="Field Label"
                                                            />
                                                        </div>
                                                        <div className="w-32">
                                                            <select
                                                                className="w-full bg-[#0A0A0A] text-white text-xs border border-white/10 rounded-lg p-2 focus:outline-none"
                                                                value={field.type}
                                                                onChange={(e) => {
                                                                    const newConfig = [...(typeof formData.formConfig === 'string' ? JSON.parse(formData.formConfig) : (formData.formConfig || []))];
                                                                    newConfig[index].type = e.target.value;
                                                                    setFormData({ ...formData, formConfig: newConfig });
                                                                }}
                                                            >
                                                                <option value="text">Text</option>
                                                                <option value="number">Number</option>
                                                                <option value="email">Email</option>
                                                                <option value="textarea">Long Text</option>
                                                            </select>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const newConfig = [...(typeof formData.formConfig === 'string' ? JSON.parse(formData.formConfig) : (formData.formConfig || []))];
                                                                newConfig.splice(index, 1);
                                                                setFormData({ ...formData, formConfig: newConfig });
                                                            }}
                                                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!formData.formConfig || (typeof formData.formConfig === 'string' && formData.formConfig === '[]') || (Array.isArray(formData.formConfig) && formData.formConfig.length === 0)) && (
                                                    <p className="text-white/20 text-xs italic text-center py-4">No custom fields added. Default fields (Name, Email, Phone) are always included.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                                    <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="px-8 py-3 rounded-xl border border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                    <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-orange-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-orange-700 shadow-xl transition-all">Save Changes</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {viewMode === 'calendar' ? (
                        <AdminCalendar
                            events={events}
                            onDateSelect={handleCalendarDateSelect}
                            onEventSelect={handleEdit}
                        />
                    ) : (
                        events.map((event) => (
                            <motion.div
                                layout
                                key={event.id}
                                className="bg-[#080808] border border-white/5 rounded-[32px] p-8 flex flex-col lg:flex-row items-center gap-8 group hover:border-white/10 transition-all"
                            >
                                <div className="relative group/img w-24 h-24 shrink-0">
                                    <div className="absolute inset-0 bg-orange-600/20 rounded-2xl blur group-hover/img:blur-xl transition-all opacity-0 group-hover/img:opacity-100" />
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-transform group-hover/img:scale-105">
                                        <img src={event.image || '/images/unified-hero-athlete.png'} className="object-cover w-full h-full" alt="" />
                                    </div>
                                </div>

                                <div className="w-20 h-20 bg-orange-600/10 border border-orange-600/30 rounded-2xl flex flex-col items-center justify-center text-orange-500 shrink-0">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{event.month}</span>
                                    <span className="text-3xl font-black italic leading-none">{event.day}</span>
                                </div>
                                <div className="flex-grow space-y-2 text-center lg:text-left">
                                    <h4 className="text-white text-xl font-black uppercase tracking-tight">{event.title}</h4>
                                    <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                            <MapPin size={14} className="text-orange-600" />
                                            {event.location}
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                                            {event.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(event)} className="p-4 bg-white/5 text-gray-400 rounded-2xl hover:text-orange-500 transition-colors">
                                        <Edit2 size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(event.id)} className="p-4 bg-white/5 text-gray-400 rounded-2xl hover:text-red-500 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout >
    );
};

export default EventsManagement;
