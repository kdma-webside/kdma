'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Trash2, Search, Download } from 'lucide-react';
import { getUsers, deleteUser } from '@/app/actions/users';
import AdminLayout from '@/components/AdminLayout';
import { exportToExcel } from '@/lib/exportUtils';
import DateFilter from '@/components/admin/DateFilter';

const UsersManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const data = await getUsers();
        setUsers(data);
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
        const filtered = filterByDate(users).filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            alert('No practitioners to export for the selected range/search');
            return;
        }

        const formattedData = filtered.map(user => ({
            'Name': user.name,
            'Email': user.email,
            'Phone': user.phone,
            'Joined On': new Date(user.createdAt).toLocaleDateString('en-GB')
        }));

        exportToExcel(formattedData, 'registered_practitioners', 'USERS');
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this practitioner?')) {
            await deleteUser(id);
            fetchUsers();
        }
    };

    const filteredUsers = filterByDate(users).filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-grow">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase">Academy Roster</span>
                            <div className="h-px w-12 bg-orange-600/30" />
                        </div>
                        <h2 className="text-white text-5xl font-black tracking-tighter uppercase">Registered <span className="text-orange-600">Practitioners</span></h2>
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

                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search warriors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white font-sans text-sm focus:outline-none focus:border-orange-500/50 transition-all w-80"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#080808] border border-white/5 rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Practitioner</th>
                                <th className="px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Signal (Email)</th>
                                <th className="px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Frequency (Phone)</th>
                                <th className="px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest">Initiated On</th>
                                <th className="px-8 py-6 text-orange-500 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">
                                        Summoning Records...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-500 font-black uppercase tracking-widest">
                                        No warriors found in this arena.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={user.id}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-500">
                                                    <User size={18} />
                                                </div>
                                                <span className="text-white font-black uppercase tracking-tight">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-gray-400 font-sans text-sm">{user.email}</td>
                                        <td className="px-8 py-6 text-gray-400 font-sans text-sm">{user.phone}</td>
                                        <td className="px-8 py-6 text-gray-400 font-sans text-xs uppercase tracking-widest">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default function AdminUsersPage() {
    return (
        <AdminLayout>
            <UsersManagement />
        </AdminLayout>
    );
}
