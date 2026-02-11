'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, MapPin } from 'lucide-react';

interface AdminCalendarProps {
    events: any[];
    onDateSelect: (date: Date) => void;
    onEventSelect: (event: any) => void;
}

const AdminCalendar = ({ events, onDateSelect, onEventSelect }: AdminCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysCount = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Days of current month
        for (let i = 1; i <= daysCount; i++) {
            const date = new Date(year, month, i);
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = events.filter(e => {
                const eDate = new Date(e.eventDate);
                return eDate.toISOString().split('T')[0] === dateStr;
            });
            days.push({ date, dayEvents, dayNumber: i });
        }

        return days;
    }, [currentDate, events]);

    const changeMonth = (delta: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="bg-[#080808] border border-white/5 rounded-[32px] p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {monthNames[currentDate.getMonth()]} <span className="text-orange-600">{currentDate.getFullYear()}</span>
                    </h3>
                    <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1">
                        Select a date to schedule or an event to edit
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-3 rounded-xl bg-white/5 text-white hover:bg-orange-600 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-4 py-3 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-3 rounded-xl bg-white/5 text-white hover:bg-orange-600 hover:text-white transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center text-[10px] font-black text-white/30 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}

                {monthData.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} className="h-32 rounded-2xl bg-transparent" />;

                    const isToday = new Date().toDateString() === day.date.toDateString();

                    return (
                        <div
                            key={`day-${day.dayNumber}`}
                            onClick={() => onDateSelect(day.date)}
                            className={`
                                relative h-32 rounded-2xl border transition-all cursor-pointer group overflow-hidden
                                ${isToday
                                    ? 'bg-orange-600/10 border-orange-600/50'
                                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}
                            `}
                        >
                            <div className={`
                                absolute top-3 left-3 text-lg font-black leading-none
                                ${isToday ? 'text-orange-500' : 'text-white/50 group-hover:text-white'}
                            `}>
                                {day.dayNumber}
                            </div>

                            {/* Hover Add Button */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center">
                                    <Plus size={14} />
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="absolute bottom-2 left-2 right-2 space-y-1">
                                {day.dayEvents.slice(0, 2).map((event: any) => (
                                    <div
                                        key={event.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEventSelect(event);
                                        }}
                                        className="bg-[#0A0A0A] border border-white/10 rounded-lg p-2 flex items-center gap-2 hover:border-orange-500/50 transition-colors"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                                        <span className="text-[9px] font-bold text-gray-300 truncate tracking-wide uppercase">
                                            {event.title}
                                        </span>
                                    </div>
                                ))}
                                {day.dayEvents.length > 2 && (
                                    <div className="text-[9px] text-center font-bold text-white/30 uppercase tracking-widest">
                                        +{day.dayEvents.length - 2} More
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminCalendar;
