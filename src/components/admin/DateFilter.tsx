import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DateFilterProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    label?: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    label = "Filter by Date Range"
}) => {
    return (
        <div className="flex flex-col space-y-2">
            <span className="text-white/40 text-[9px] font-black tracking-widest uppercase ml-1">{label}</span>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 px-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-orange-500" />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="bg-transparent text-white text-xs font-sans focus:outline-none [color-scheme:dark]"
                        placeholder="Start Date"
                    />
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="bg-transparent text-white text-xs font-sans focus:outline-none [color-scheme:dark]"
                        placeholder="End Date"
                    />
                </div>
                {(startDate || endDate) && (
                    <button
                        onClick={() => { onStartDateChange(''); onEndDateChange(''); }}
                        className="text-[10px] text-orange-500 font-black uppercase tracking-widest ml-2 hover:text-white transition-colors"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default DateFilter;
