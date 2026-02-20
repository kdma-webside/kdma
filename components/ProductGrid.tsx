'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';


const ProductGrid = ({ initialProducts = [] }: { initialProducts?: any[] }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    // Dynamically derive categories from products
    const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = activeFilter === "All"
        ? initialProducts
        : initialProducts.filter(p => p.category === activeFilter);

    return (
        <section className="relative py-24 px-12 lg:px-24 bg-black">
            <div className="max-w-7xl mx-auto w-full">
                {/* Product Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all
                                ${activeFilter === cat
                                    ? 'bg-orange-600 text-white shadow-[0_10px_20px_-5px_rgba(234,88,12,0.4)]'
                                    : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProductCard product={product} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center text-white/20 font-black tracking-widest uppercase">
                        No equipment found in this category
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
