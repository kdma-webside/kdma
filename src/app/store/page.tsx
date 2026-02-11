import React from 'react';
import Navbar from '@/components/Navbar';
import StoreHero from '@/components/StoreHero';
import ProductGrid from '@/components/ProductGrid';
import ScrollToTop from '@/components/ScrollToTop';
import { getProducts } from '@/app/actions/store';
import { getContent } from '@/app/actions/content';

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const [products, storeContent] = await Promise.all([
        getProducts(),
        getContent('Store')
    ]);

    const storeData = storeContent.reduce((acc: Record<string, string>, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {});

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <ScrollToTop />
            <Navbar />

            <StoreHero title={storeData['store.hero_title']} />

            <div className="relative">
                {/* Aesthetic Separator */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-600/30 to-transparent" />

                <ProductGrid initialProducts={products} />
            </div>

            {/* Disclaimer / Shipping Area */}
            <section className="py-24 px-12 lg:px-24 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <span className="text-orange-600 text-[10px] font-black tracking-[0.3em] uppercase">GLOBAL DEPLOYMENT</span>
                        <h4 className="text-white text-2xl font-black uppercase">WORLDWIDE SHIPPING</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">We ship our professional poles and apparatus to warriors across the globe, safely crated and insured.</p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-orange-600 text-[10px] font-black tracking-[0.3em] uppercase">SECURE PROTOCOL</span>
                        <h4 className="text-white text-2xl font-black uppercase">RAZORPAY SECURED</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Industry standard 256-bit encryption for all equipment transactions. Elite privacy for the academy.</p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-orange-600 text-[10px] font-black tracking-[0.3em] uppercase">AUTHENTIC GEAR</span>
                        <h4 className="text-white text-2xl font-black uppercase">MASTER CERTIFIED</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Every piece of equipment is hand-tested at the academy grounds before being dispatched to your arena.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
