'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getEventRegistrations } from '@/app/actions/events';
import { getTrainingRegistrations, getCampRegistrations } from '@/app/actions/trainings';
import { Download, Users, Calendar, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToExcel } from '@/lib/exportUtils';
import DateFilter from '@/components/admin/DateFilter';

const RegistrationsManagement = () => {
    const [eventRegs, setEventRegs] = useState<any[]>([]);
    const [trainingRegs, setTrainingRegs] = useState<any[]>([]);
    const [campRegs, setCampRegs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'events' | 'trainings' | 'camps'>('events');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [events, trainings, camps] = await Promise.all([
            getEventRegistrations(),
            getTrainingRegistrations(),
            getCampRegistrations()
        ]);
        setEventRegs(events);
        setTrainingRegs(trainings);
        setCampRegs(camps);
    };

    const filterByDate = (data: any[]) => {
        if (!startDate && !endDate) return data;

        return data.filter(item => {
            const itemDate = new Date(item.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(23, 59, 59, 999);

            if (start && itemDate < start) return false;
            if (end && itemDate > end) return false;
            return true;
        });
    };

    const handleExport = () => {
        const rawData = activeTab === 'events' ? eventRegs : activeTab === 'trainings' ? trainingRegs : campRegs;
        const data = filterByDate(rawData);

        if (data.length === 0) {
            alert('No data to export for the selected range');
            return;
        }

        const formattedData = data.map(reg => {
            const row: any = {
                'Name': reg.userName,
                'Email': reg.userEmail,
                'Phone': reg.userPhone,
                'Status': reg.status,
                'Date': new Date(reg.createdAt).toLocaleDateString('en-GB'),
            };

            if (activeTab === 'events') row['Event'] = reg.event?.title || 'N/A';
            if (activeTab === 'trainings') row['Training'] = reg.training?.title || 'N/A';
            if (activeTab === 'camps') row['Camp'] = reg.camp?.title || 'N/A';

            // Flatten responses
            try {
                const responses = typeof reg.responses === 'string' ? JSON.parse(reg.responses) : reg.responses;
                if (responses) {
                    Object.keys(responses).forEach(key => {
                        row[`Field: ${key}`] = responses[key];
                    });
                }
            } catch (e) {
                row['Responses Raw'] = reg.responses;
            }

            return row;
        });

        exportToExcel(formattedData, `${activeTab}_registrations`, activeTab.toUpperCase());
    };

    const currentData = filterByDate(activeTab === 'events' ? eventRegs : activeTab === 'trainings' ? trainingRegs : campRegs);

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">ENROLLMENT TRACKER</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Registration <span className="text-orange-600">Records</span></h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-end gap-6">
                        <DateFilter
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                        />
                        <button
                            onClick={handleExport}
                            className="bg-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                        >
                            <Download size={18} />
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'events' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <Calendar size={14} />
                        Events ({eventRegs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('trainings')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'trainings' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <Swords size={14} />
                        Trainings ({trainingRegs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('camps')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'camps' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <Users size={14} />
                        Camps ({campRegs.length})
                    </button>
                </div>

                {/* Table */}
                <div className="bg-[#080808] border border-white/5 rounded-[32px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Name</th>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Email</th>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Phone</th>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                                        {activeTab === 'events' ? 'Event' : activeTab === 'trainings' ? 'Training' : 'Camp'}
                                    </th>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Status</th>
                                    <th className="text-left px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                                            No registrations found
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((reg, index) => (
                                        <motion.tr
                                            key={reg.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-8 py-6 text-white text-sm font-bold">{reg.userName}</td>
                                            <td className="px-8 py-6 text-gray-400 text-sm">{reg.userEmail}</td>
                                            <td className="px-8 py-6 text-gray-400 text-sm">{reg.userPhone}</td>
                                            <td className="px-8 py-6 text-white text-sm font-bold">
                                                {activeTab === 'events' ? reg.event?.title : activeTab === 'trainings' ? reg.training?.title : reg.camp?.title}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${reg.status === 'registered' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-gray-400 text-sm">
                                                {new Date(reg.createdAt).toLocaleDateString('en-GB')}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default RegistrationsManagement;
