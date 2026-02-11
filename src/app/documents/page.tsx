import React from 'react';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import DocumentCard from '@/components/DocumentCard';
import { getPublicDocuments } from '@/app/actions/document';
import { FileText, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

const categoryLabels: { [key: string]: string } = {
    REGISTRATION: 'Registration & Forms',
    LETTERPAD: 'Official Letterpad',
    RULES: 'Rules & Regulations',
    CERTIFICATES: 'Certificates & Achievements',
    GENERAL: 'General Documents',
};

// Custom category order - REGISTRATION first
const categoryOrder = ['REGISTRATION', 'LETTERPAD', 'RULES', 'CERTIFICATES', 'GENERAL'];

export default async function DocumentsPage() {
    const documentsByCategory = await getPublicDocuments();

    // Sort categories by custom order
    const categories = Object.keys(documentsByCategory).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        // If category is not in order array, put it at the end
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-600/10 border border-orange-600/20 mb-6">
                            <FileText size={40} className="text-orange-500" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Document <span className="text-orange-600">Library</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Access official documents, registration forms, guidelines, and important resources
                            </p>
                        </div>
                    </div>

                    {/* Categories and Documents */}
                    {categories.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                                <FileText size={32} className="text-gray-600" />
                            </div>
                            <p className="text-gray-500 text-lg font-medium">No documents available yet</p>
                            <p className="text-gray-600 text-sm mt-2">Check back later for updates</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {categories.map((category) => (
                                <div key={category} className="space-y-8">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">
                                            {categoryLabels[category] || category}
                                        </h2>
                                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    </div>

                                    {/* Document Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {documentsByCategory[category].map((document) => (
                                            <DocumentCard key={document.id} document={document} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <ScrollToTop />
        </main>
    );
}
