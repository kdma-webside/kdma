'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, PlayCircle } from 'lucide-react';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
    size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
    type: 'image' | 'video';
}

const galleryData: GalleryItem[] = [
    { id: 1, title: "State Championship 2024", category: "Championships", image: "/images/hero-athlete.jpg", size: "large", type: "image" },
    { id: 2, title: "Pole Technique Session", category: "Training", image: "/images/athlete-hero.png", size: "medium", type: "image" },
    { id: 3, title: "Centuries of Heritage", category: "Heritage", image: "/images/heritage-master.png", size: "tall", type: "image" },
    { id: 4, title: "Synchronized Strength", category: "Training", image: "/images/training-ground.png", size: "wide", type: "image" },
    { id: 5, title: "International Workshop", category: "International", image: "/images/unified-hero-athlete.png", size: "medium", type: "image" },
    { id: 6, title: "Flexibility Mastery", category: "Training", image: "/images/benefit-flexibility.png", size: "small", type: "image" },
    { id: 7, title: "Competition Intensity", category: "Championships", image: "/images/benefit-strength.jpg", size: "medium", type: "image" },
    { id: 8, title: "The Master's Gaze", category: "Heritage", image: "/images/benefit-discipline.jpg", size: "small", type: "image" },
];

const GalleryGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Championships", "Training", "Heritage", "International"];

    const filteredItems = selectedCategory === "All"
        ? galleryData
        : galleryData.filter(item => item.category === selectedCategory);

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'large': return 'sm:col-span-2 sm:row-span-2';
            case 'wide': return 'sm:col-span-2 sm:row-span-1';
            case 'tall': return 'sm:col-span-1 sm:row-span-2';
            default: return 'sm:col-span-1 sm:row-span-1';
        }
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 border ${selectedCategory === cat
                                ? 'bg-orange-600 border-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]'
                                : 'bg-transparent border-white/10 text-white/40 hover:border-orange-600/50 hover:text-white active:bg-orange-600/10 active:scale-95'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px] grid-flow-dense"
                >
                    <AnimatePresence mode='wait'>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className={`relative group overflow-hidden rounded-[32px] border border-white/5 bg-[#0A0A0A] transition-all hover:z-50 active:z-50 ${getSizeClasses(item.size)}`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-110 group-active:scale-110 transition-all duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
                                    <span className="text-orange-500 text-[9px] font-black tracking-widest uppercase mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="text-white text-xl font-black tracking-tight uppercase leading-none mb-4">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer">
                                            {item.type === 'video' ? <PlayCircle size={18} /> : <Maximize2 size={18} />}
                                        </div>
                                    </div>
                                </div>

                                {/* Frame Highlight */}
                                <div className="absolute inset-0 border-2 border-orange-600/0 group-hover:border-orange-600/20 group-active:border-orange-600/30 rounded-[32px] transition-all duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Load More Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center"
                >
                    <button className="px-12 py-4 rounded-full border border-white/10 text-white/40 text-[10px] font-black tracking-[0.5em] uppercase hover:bg-white hover:text-black hover:border-white active:bg-white active:text-black active:scale-95 transition-all">
                        Load More Archives
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default GalleryGrid;
