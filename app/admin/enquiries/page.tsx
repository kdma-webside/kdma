'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Trash2, CheckCircle2, Clock, Shield, Download } from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '@/app/actions/enquiries';
import AdminLayout from '@/components/AdminLayout';
import { exportToExcel } from '@/lib/exportUtils';
import DateFilter from '@/components/admin/DateFilter';

const EnquiriesManagement = () => {
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setIsLoading(true);
        const data = await getEnquiries();
        setEnquiries(data);
        setIsLoading(false);
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
        const data = filterByDate(enquiries);

        if (data.length === 0) {
            alert('No data to export for the selected range');
            return;
        }

        const formattedData = enquiries.map(item => ({
            'Name': item.name,
            'Email': item.email,
            'Phone': item.phone,
            'Interest': item.interest,
            'Status': item.status,
            'Date': new Date(item.createdAt).toLocaleDateString('en-GB')
        }));

        exportToExcel(formattedData, 'portal_enquiries', 'ENQUIRIES');
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        await updateEnquiryStatus(id, status);
        fetchEnquiries();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this lead?')) {
            await deleteEnquiry(id);
            fetchEnquiries();
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'enrolled': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'closed': return 'bg-white/5 text-gray-500 border-white/10';
            default: return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
        }
    };

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase">Recruitment Portal</span>
                        <div className="h-px w-12 bg-orange-600/30" />
                    </div>
                    <h2 className="text-white text-5xl font-black tracking-tighter uppercase text-orange-600">Portal <span className="text-white">Leads</span></h2>
                    <p className="text-gray-500 text-sm font-sans mt-4 max-w-xl">Track and manage potential practitioners who have submitted credentials through the recruitment portal.</p>
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

            {/* Enquiries Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">
                        Accessing Encryption...
                    </div>
                ) : filterByDate(enquiries).length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500 font-black uppercase tracking-widest">
                        {(startDate || endDate) ? "No leads found for the selected range." : "The recruitment portal is currently silent."}
                    </div>
                ) : (
                    filterByDate(enquiries).map((enquiry) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={enquiry.id}
                            className="bg-[#080808] border border-white/5 rounded-[32px] p-8 space-y-8 group hover:border-orange-600/30 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border w-fit ${getStatusStyle(enquiry.status)}`}>
                                        {enquiry.status}
                                    </div>
                                    <h3 className="text-white text-2xl font-black uppercase tracking-tight pt-2">{enquiry.name}</h3>
                                    <p className="text-orange-500 text-[10px] font-black tracking-widest uppercase">{enquiry.interest} Path</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(enquiry.id)}
                                        className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                                    <Mail size={16} className="text-white/20" />
                                    <div className="truncate">
                                        <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mb-0.5">Signal</p>
                                        <p className="text-xs text-white/80 font-sans truncate">{enquiry.email}</p>
                                    </div>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                                    <Phone size={16} className="text-white/20" />
                                    <div>
                                        <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mb-0.5">Frequency</p>
                                        <p className="text-xs text-white/80 font-sans">{enquiry.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-white/20">
                                    <Clock size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex gap-2">
                                    {enquiry.status !== 'enrolled' && (
                                        <button
                                            onClick={() => handleStatusUpdate(enquiry.id, 'enrolled')}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={12} />
                                            Enroll
                                        </button>
                                    )}
                                    {enquiry.status === 'new' && (
                                        <button
                                            onClick={() => handleStatusUpdate(enquiry.id, 'contacted')}
                                            className="px-4 py-2 bg-white/5 text-white/60 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Mark Contacted
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default function AdminEnquiriesPage() {
    return (
        <AdminLayout>
            <EnquiriesManagement />
        </AdminLayout>
    );
}
