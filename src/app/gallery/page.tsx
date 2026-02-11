'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import GalleryHero from '@/components/GalleryHero';
import GalleryGrid from '@/components/GalleryGrid';
import ScrollToTop from '@/components/ScrollToTop';

export default function GalleryPage() {
    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <GalleryHero />
            <GalleryGrid />
        </main>
    );
}
