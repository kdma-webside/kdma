'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
    length?: number;
    onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        // Allow only one digit
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Check if full (trigger onComplete every time it changes? Or only when full? Standard is usually when full or let parent handle state)
        // Wait, the parent needs the value even if partial? The prompt says "onComplete", so I'll stick to that for now, 
        // but typically one might want `onChange` for parent state. 
        // However, looking at the previous page.tsx implementation, it used a single string state `otp`.
        // To make it compatible, I should probably also expose an `onChange` prop that sends the full string.

        const combinedOtp = newOtp.join('');
        // Let's assume onComplete acts as an onChange for the full string for now, or I'll add onChange prop.
        onComplete(combinedOtp);

        // Move to next input if value is entered
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste event separately to make it robust
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();
        if (!/^\d+$/.test(pastedData)) return; // Only allow digits

        const pastedDigits = pastedData.split('').slice(0, length);
        const newOtp = [...otp];

        pastedDigits.forEach((digit, i) => {
            newOtp[i] = digit;
        });

        setOtp(newOtp);

        const combinedOtp = newOtp.join('');
        onComplete(combinedOtp);

        // Focus the last filled input or the next empty one
        const focusIndex = Math.min(pastedDigits.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
    };


    return (
        <div className="flex gap-2 justify-between w-full">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-10 h-12 md:w-12 md:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white text-xl font-black focus:outline-none focus:border-orange-600/50 focus:bg-white/10 transition-all caret-orange-500 selection:bg-orange-500/30"
                />
            ))}
        </div>
    );
};

export default OtpInput;
