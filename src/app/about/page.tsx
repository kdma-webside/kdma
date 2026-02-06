'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/AboutHero';
import History from '@/components/History';
import Mission from '@/components/Mission';
import MasterDedication from '@/components/MasterDedication';
import ScrollToTop from '@/components/ScrollToTop';
import CoreValues from '@/components/CoreValues';
import Pledge from '@/components/Pledge';

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <AboutHero />
            <History />


            <CoreValues />
            <Mission />

            <MasterDedication />
            <Pledge />
        </main>
    );
}
