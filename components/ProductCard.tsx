'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Zap, Star } from 'lucide-react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useCart } from '@/context/CartContext';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    isFeatured?: boolean;
}

const ProductCard = ({ product, index }: { product: ProductProps; index: number }) => {
    const { secureCheckout, addToCart } = useCart();

    const handleBuyNow = () => {
        secureCheckout(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#0D0D0D] border border-white/5 rounded-[32px] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-orange-600/30 active:border-orange-600/50 cursor-pointer"
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 group-active:scale-110 transition-transform duration-500 saturate-[0.8] group-hover:saturate-100 group-active:saturate-100"
                />

                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black tracking-widest text-white uppercase">
                        {product.category}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                        <Star size={10} className="text-orange-500 fill-orange-500" />
                        <span className="text-[10px] font-black tracking-widest text-white">{product.rating}</span>
                    </div>
                </div>

                {/* Glass Blur Overlay on Hover */}
                <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white text-2xl font-black tracking-tight uppercase leading-tight group-hover:text-orange-500 group-active:text-orange-500 transition-colors duration-300">
                        {product.name}
                    </h3>
                    <div className="text-orange-500 font-black text-xl tracking-tighter">
                        ₹{product.price}
                    </div>
                </div>

                <p className="text-gray-500 text-sm font-sans font-medium mb-8 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto space-y-4">
                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-orange-600 text-white p-4 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-orange-700 active:bg-orange-800 active:scale-95 transition-all flex items-center justify-center gap-3 group/btn shadow-[0_15px_30px_-5px_rgba(234,88,12,0.3)]"
                    >
                        <Zap size={14} className="group-hover/btn:scale-125 transition-transform" />
                        Secure Checkout
                    </button>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-3 group/cart"
                    >
                        <ShoppingCart size={14} className="group-hover/cart:rotate-12 transition-transform" />
                        Add to Armory
                    </button>
                </div>
            </div>

            {/* Selection/Status Indicator */}
            {product.isFeatured && (
                <div className="absolute top-1/2 -right-12 translate-y-[-50%] rotate-90 pointer-events-none">
                    <span className="text-white/5 text-4xl font-black tracking-widest uppercase">FEATURED</span>
                </div>
            )}
        </motion.div>
    );
};

export default ProductCard;
