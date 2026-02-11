'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/admin';
import {
    LayoutDashboard,
    ShoppingBag,
    Calendar,
    FileText,
    LogOut,
    Menu,
    X,
    Shield,
    Mail,
    Lock as LockIcon,
    Swords
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await logoutAdmin();
        router.push('/admin/login');
    };

    const navItems = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Store', href: '/admin/store', icon: ShoppingBag },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Documents', href: '/admin/documents', icon: FileText },
        { name: 'Users', href: '/admin/users', icon: Shield },
        { name: 'Trainings', href: '/admin/trainings', icon: Swords },
        { name: 'Registrations', href: '/admin/registrations', icon: FileText },
        { name: 'Enquiries', href: '/admin/enquiries', icon: FileText },
        { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
        { name: 'Committee', href: '/admin/committee', icon: Swords },
        { name: 'Security', href: '/admin/password', icon: LockIcon },
        { name: 'Content', href: '/admin/content', icon: FileText },
    ];

    if (pathname === '/admin/login') return <>{children}</>;

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="fixed lg:relative z-50 w-72 h-screen bg-[#080808] border-r border-white/5 flex flex-col pt-12"
                    >
                        <div className="px-8 mb-12 flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-black uppercase tracking-tighter leading-none">KDMA</h1>
                                <span className="text-[10px] text-orange-500 font-black tracking-[0.3em] uppercase opacity-60">Command Center</span>
                            </div>
                        </div>

                        <nav className="flex-grow px-4 space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${isActive
                                            ? 'bg-orange-600 text-white shadow-[0_10px_20px_rgba(234,88,12,0.2)]'
                                            : 'text-gray-500 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <item.icon size={20} className={isActive ? 'text-white' : 'text-orange-600/50 group-hover:text-orange-500'} />
                                        <span className="text-sm font-black uppercase tracking-widest">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-8 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 text-gray-500 hover:text-red-500 transition-colors group"
                            >
                                <LogOut size={20} />
                                <span className="text-sm font-black uppercase tracking-widest">Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 lg:px-12 bg-[#050505]/80 backdrop-blur-xl shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white"
                    >
                        {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black uppercase tracking-tighter">Command Master</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-900 border border-white/10" />
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto p-8 lg:p-12 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
