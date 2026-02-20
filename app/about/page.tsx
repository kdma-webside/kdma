import Navbar from '@/components/Navbar';
import AboutHero from '@/components/AboutHero';
import Heritage from '@/components/Heritage';
import Mission from '@/components/Mission';
import History from '@/components/History';
import MasterDedication from '@/components/MasterDedication';
import CoreValues from '@/components/CoreValues';
import Pledge from '@/components/Pledge';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Mallakhamb Kanyakumari',
    description: 'Learn about the heritage and mission of Mallakhamb in Kanyakumari - preserving a 900-year-old tradition through strength, discipline, and cultural pride.',
    keywords: 'Mallakhamb history, Kanyakumari tradition, martial arts heritage, ancient sport, about KDMA',
};

export default function AboutPage() {
    return (
        <main className="bg-black">
            <Navbar />
            <AboutHero />
            <Heritage />
            <Mission />
            <History />
            <MasterDedication />
            <CoreValues />
            <Pledge />
            <Footer />
        </main>
    );
}
