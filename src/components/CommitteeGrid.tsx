'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getCommitteeMembers } from '@/app/actions/committee';

interface CommitteeMemberProps {
    name: string;
    position: string;
    image: string;
    description?: string;
    index: number;
}

const CommitteeMemberCard = ({ name, position, image, description, index }: CommitteeMemberProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 bg-[#121212]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-1000"
                />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="h-px w-12 bg-orange-600 mb-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-orange-500 text-xs font-black tracking-[0.3em] uppercase mb-2">
                        {position}
                    </h4>
                    <h3 className="text-white text-2xl font-black tracking-tighter uppercase leading-none">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-gray-400 text-[10px] mt-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Background Glow on Hover */}
            <div className="absolute -inset-4 bg-orange-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-full" />
        </motion.div>
    );
};

const CommitteeGrid = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getCommitteeMembers();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching committee members:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const filterByCategory = (category: string) => members.filter(m => m.category === category);

    const sections = [
        { title: "President", members: filterByCategory("President") },
        { title: "Vice President", members: filterByCategory("Vice president") },
        { title: "Secretary", members: filterByCategory("Secretary") },
        { title: "Joint Secretary", members: filterByCategory("Joint secretary") },
        { title: "Coordinator", members: filterByCategory("Cordinator") },
        { title: "Treasurer", members: filterByCategory("Tressurer") },
        { title: "Executive Committee", members: filterByCategory("Executive comittee") }
    ];

    if (loading) {
        return (
            <div className="py-32 flex justify-center bg-black">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <section className="relative py-32 px-12 lg:px-24 bg-black overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {sections.map((section, sIdx) => (
                    section.members.length > 0 && (
                        <div key={section.title} className="mb-24 last:mb-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center space-x-6 mb-12"
                            >
                                <div className="h-[1px] w-12 bg-orange-600" />
                                <span className="text-orange-500 text-xs tracking-[1em] font-black uppercase">{section.title}</span>
                                <div className="h-[1px] w-12 bg-orange-600" />
                            </motion.div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${section.title === 'OPERATIONS' ? 'max-w-md mx-auto' : ''}`}>
                                {section.members.map((member, mIdx) => (
                                    <CommitteeMemberCard key={member.id} {...member} index={mIdx} />
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default CommitteeGrid;
