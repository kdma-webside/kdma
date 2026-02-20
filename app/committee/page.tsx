import Navbar from '../../components/Navbar';
import CommitteeHero from '../../components/CommitteeHero';
import CommitteeGrid from '../../components/CommitteeGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Committee - Mallakhamb Kanyakumari',
    description: 'Meet the dedicated leadership and committee members of KDMA - the Kanyakumari District Mallakhamb Association. Our team is committed to preserving and promoting Mallakhamb.',
    keywords: 'KDMA committee, Mallakhamb leadership, committee members, organization structure, Kanyakumari sports committee',
};

export default function CommitteePage() {
    return (
        <main className="bg-black">
            <Navbar />
            <CommitteeHero />
            <CommitteeGrid />
        </main>
    );
}
