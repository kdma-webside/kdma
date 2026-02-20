'use client';

import { useCallback } from 'react';

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string;
    handler: (response: any) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
}

export const useRazorpay = () => {
    const loadScript = useCallback((src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }, []);

    const processPayment = useCallback(async (options: Omit<RazorpayOptions, 'key'>) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // Get Razorpay key from environment variable
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        if (!razorpayKey) {
            alert('Payment gateway not configured. Please contact support.');
            console.error('NEXT_PUBLIC_RAZORPAY_KEY_ID environment variable is not set');
            return;
        }

        const rzpOptions: RazorpayOptions = {
            key: razorpayKey,
            ...options,
        };

        const rzp = new (window as any).Razorpay(rzpOptions);
        rzp.open();
    }, [loadScript]);

    return { processPayment };
};
