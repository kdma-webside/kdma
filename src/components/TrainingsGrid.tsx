'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Trophy, MapPin, ArrowRight, Filter } from 'lucide-react';
import Image from 'next/image';
import RegistrationModal from './RegistrationModal';
import { registerForTraining, registerForCamp } from '@/app/actions/trainings';

const TrainingsGrid = ({ trainings, camps }: { trainings: any[], camps: any[] }) => {
    const [filter, setFilter] = useState<'all' | 'courses' | 'camps'>('all');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredItems = filter === 'all'
        ? [...trainings.map(t => ({ ...t, itemType: 'course' })), ...camps.map(c => ({ ...c, itemType: 'camp' }))]
        : filter === 'courses'
            ? trainings.map(t => ({ ...t, itemType: 'course' }))
            : camps.map(c => ({ ...c, itemType: 'camp' }));

    return (
        <section className="py-24 px-6 lg:px-24 bg-black">
            <div className="container mx-auto">
                {/* Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-8 mb-16 border-b border-white/5 pb-10">
                    <div>
                        <h2 className="text-white text-3xl font-black tracking-tighter uppercase mb-2">Available <span className="text-orange-600">Modules</span></h2>
                        <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">CURRICULUM OF THE ANCIENTS</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                        {['all', 'courses', 'camps'].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setFilter(opt as any)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${filter === opt ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden hover:border-orange-600/30 transition-all flex flex-col"
                            >
                                {/* Image Wrapper */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    {/* Type Tag */}
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        <span className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase ${item.itemType === 'course' ? 'bg-orange-600 text-white' : 'bg-white text-black'}`}>
                                            {item.itemType}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-white text-2xl font-black tracking-tighter uppercase mb-4 group-hover:text-orange-600 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm font-sans mb-8 line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center justify-between text-[10px] font-black tracking-widest uppercase border-t border-white/5 pt-6">
                                            {item.itemType === 'course' ? (
                                                <>
                                                    {item.startDate && item.endDate ? (
                                                        <>
                                                            <div className="flex items-center gap-2 text-white/40">
                                                                <Calendar size={14} className="text-orange-500" />
                                                                <span>{new Date(item.startDate).toLocaleDateString('en-GB')} - {new Date(item.endDate).toLocaleDateString('en-GB')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-white/40">
                                                                <Trophy size={14} className="text-orange-500" />
                                                                <span>{item.level}</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center gap-2 text-white/40">
                                                                <Clock size={14} className="text-orange-500" />
                                                                <span>{item.duration || 'Duration TBD'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-white/40">
                                                                <Trophy size={14} className="text-orange-500" />
                                                                <span>{item.level}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-2 text-white/40">
                                                        <Calendar size={14} className="text-orange-500" />
                                                        <span>{new Date(item.startDate).toLocaleDateString('en-GB')} - {new Date(item.endDate).toLocaleDateString('en-GB')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/40">
                                                        <MapPin size={14} className="text-orange-500" />
                                                        <span>{item.location}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setIsModalOpen(true);
                                            }}
                                            className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-3xl font-black tracking-widest text-[10px] uppercase group-hover:bg-orange-600 group-hover:border-transparent transition-all flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Secure Enrollment <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <RegistrationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={selectedItem?.title || 'Join the Ranks'}
                    formConfig={selectedItem?.formConfig}
                    onSubmit={async (data) => {
                        if (!selectedItem) return;
                        if (selectedItem.itemType === 'course') {
                            await registerForTraining(selectedItem.id, data);
                        } else {
                            await registerForCamp(selectedItem.id, data);
                        }
                    }}
                />
            </div>
        </section>
    );
};

export default TrainingsGrid;
