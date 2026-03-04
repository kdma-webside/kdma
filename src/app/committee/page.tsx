import CommitteeHero from '../../components/CommitteeHero';
import CommitteeGrid from '../../components/CommitteeGrid';
import { Metadata } from 'next';
import { getCommitteeMembers } from '@/app/actions/committee';

export const metadata: Metadata = {
    title: 'Committee - Mallakhamb Kanyakumari',
    description: 'Meet the dedicated leadership and committee members of KDMA - the Kanyakumari District Mallakhamb Association. Our team is committed to preserving and promoting Mallakhamb.',
    keywords: 'KDMA committee, Mallakhamb leadership, committee members, organization structure, Kanyakumari sports committee',
};

export default async function CommitteePage() {
    const members = await getCommitteeMembers();

    return (
        <main className="bg-black">
            <CommitteeHero />
            <CommitteeGrid initialMembers={members} />
        </main>
    );
}
