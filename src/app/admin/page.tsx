import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ShoppingBag, Calendar, Users, Activity, TrendingUp, AlertCircle, LucideIcon } from 'lucide-react';
import { getDashboardStats } from '@/app/actions/dashboard';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    color: 'orange' | 'blue' | 'green' | 'purple';
}

const StatCard = ({ label, value, icon: Icon, trend, color }: StatCardProps) => (
    <div className="bg-[#080808] border border-white/5 p-8 rounded-[32px] space-y-6 hover:border-white/10 active:border-white/20 active:bg-white/5 active:scale-[0.98] transition-all duration-300 group cursor-pointer">
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl bg-${color}-600/10 text-${color}-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                <Icon size={24} />
            </div>
            {trend && (
                <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-full">
                    <TrendingUp size={12} />
                    {trend}
                </div>
            )}
        </div>
        <div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
            <h3 className="text-white text-4xl font-black tracking-tighter uppercase">{value}</h3>
        </div>
    </div>
);

function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

export const dynamic = 'force-dynamic';

const OverviewPage = async () => {
    const stats = await getDashboardStats();

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">COMMAND CENTER v1.0</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">Mission <span className="text-orange-600">Control</span></h2>
                    </div>
                    <div className="flex items-center gap-4 bg-orange-600/10 border border-orange-600/20 px-6 py-3 rounded-2xl">
                        <Activity size={16} className="text-orange-500" />
                        <span className="text-xs font-black text-orange-500 uppercase tracking-widest">System Protocols Nominal</span>
                    </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard label="Academy Armory Items" value={stats.productsCount} icon={ShoppingBag} trend="+2 NEW" color="orange" />
                    <StatCard label="Upcoming Milestones" value={stats.eventsCount} icon={Calendar} color="blue" />
                    <StatCard label="Warrior Leads" value={stats.enquiriesCount} icon={Users} trend="+12% AVG" color="green" />
                    <StatCard label="System Integrity" value="99.9%" icon={Activity} color="purple" />
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-[#080808] border border-white/5 rounded-[40px] p-10 space-y-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-white text-xl font-black uppercase tracking-tighter">Recent Activities</h4>
                            <button className="text-orange-500 text-[10px] font-black uppercase tracking-widest hover:text-orange-400 transition-colors">View All Logs</button>
                        </div>
                        <div className="space-y-6">
                            {stats.recentActivities.length > 0 ? (
                                stats.recentActivities.map((log, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/5 active:border-white/10 active:scale-[0.99] group cursor-pointer">
                                        <div className="w-2 h-2 rounded-full bg-orange-600 group-active:scale-125 transition-transform duration-300" />
                                        <p className="flex-grow text-gray-400 text-sm font-medium group-active:text-white transition-colors duration-300">{log.msg}</p>
                                        <span className="text-[10px] text-gray-600 font-bold uppercase whitespace-nowrap">{timeAgo(log.time)}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No recent activities found.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#080808] border border-white/5 rounded-[40px] p-10 space-y-8">
                        <h4 className="text-white text-xl font-black uppercase tracking-tighter">Quick Protocol</h4>
                        <div className="space-y-4">
                            <button className="w-full bg-white/5 border border-white/10 text-white p-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 active:bg-orange-700 active:border-orange-700 active:scale-95 transition-all duration-300 text-left flex items-center justify-between group">
                                Deploy New Product
                                <ShoppingBag size={18} className="group-hover:scale-110 group-active:scale-110 transition-transform duration-300" />
                            </button>
                            <button className="w-full bg-white/5 border border-white/10 text-white p-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 active:bg-orange-700 active:border-orange-700 active:scale-95 transition-all text-left flex items-center justify-between group">
                                Announce Event
                                <Calendar size={18} className="group-hover:scale-110 group-active:scale-110 transition-transform" />
                            </button>
                            <button className="w-full bg-white/5 border border-white/10 text-white p-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 active:bg-orange-700 active:border-orange-700 active:scale-95 transition-all text-left flex items-center justify-between group">
                                System Health Check
                                <AlertCircle size={18} className="group-hover:scale-110 group-active:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OverviewPage;
