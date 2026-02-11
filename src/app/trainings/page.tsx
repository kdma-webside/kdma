import React from 'react';
import Navbar from '@/components/Navbar';
import TrainingsHero from '@/components/TrainingsHero';
import TrainingsGrid from '@/components/TrainingsGrid';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { getTrainings, getCamps } from '@/app/actions/trainings';

export const dynamic = 'force-dynamic';

export default async function TrainingsPage() {
    const trainings = await getTrainings();
    const camps = await getCamps();

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <TrainingsHero />

            {/* Content Section */}
            <TrainingsGrid trainings={trainings} camps={camps} />

            <Footer />
            <ScrollToTop />
        </main>
    );
}
