'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getContent, updateContent, initializeContent } from '@/app/actions/content';
import { Save, RefreshCcw, Type, Image as ImageIcon, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const ContentManagement = () => {
    const [contents, setContents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        const data = await getContent();
        if (data.length === 0) {
            // Initial Seed for content if empty
            const initial = [
                { key: 'hero.headline', value: 'BEST MALLAKHAMB ACADEMY IN TAMIL NADU', area: 'Hero', type: 'text' },
                { key: 'hero.subheadline', value: 'THE PREMIER SCHOOL FOR ANCIENT SPORTS, ESPECIALLY IN KANYAKUMARI DISTRICT', area: 'Hero', type: 'text' },
                { key: 'about.title', value: 'A LEGACY ETCHED IN TEAK AND VALOR', area: 'About', type: 'text' },
                { key: 'store.hero_title', value: 'GET THE GEAR OF MODERN GLADIATORS', area: 'Store', type: 'text' },
            ];
            await initializeContent(initial);
            loadContent();
        } else {
            setContents(data);
        }
    };

    const handleUpdate = async (id: string, value: string) => {
        setIsLoading(true);
        await updateContent(id, value);
        await loadContent();
        setIsLoading(false);
    };

    const groupedContent = contents.reduce((acc: any, curr) => {
        if (!acc[curr.area]) acc[curr.area] = [];
        acc[curr.area].push(curr);
        return acc;
    }, {});

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">CONTENT PROTOCOL</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Cinematic <span className="text-orange-600">Refinement</span></h2>
                    </div>
                </div>

                <div className="space-y-12">
                    {Object.keys(groupedContent).map((area) => (
                        <div key={area} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] flex-grow bg-white/5" />
                                <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">{area} Area</h3>
                                <div className="h-[1px] flex-grow bg-white/5" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {groupedContent[area].map((item: any) => (
                                    <div key={item.id} className="bg-[#080808] border border-white/5 rounded-[32px] p-8 space-y-6 group hover:border-white/10 transition-all">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                {item.type === 'text' ? <Type size={14} className="text-orange-500" /> : <ImageIcon size={14} className="text-blue-500" />}
                                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.key}</span>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <textarea
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-600/50 transition-all resize-none"
                                                defaultValue={item.value}
                                                onBlur={(e) => {
                                                    if (e.target.value !== item.value) {
                                                        handleUpdate(item.id, e.target.value);
                                                    }
                                                }}
                                            />
                                            <div className="absolute bottom-4 right-4 text-white/10 group-hover:text-orange-500/50 transition-colors">
                                                <RefreshCcw size={14} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ContentManagement;
