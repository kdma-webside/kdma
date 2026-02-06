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

        // In a real app, you would fetch order_id from your backend here
        const rzpOptions: RazorpayOptions = {
            key: 'rzp_test_YOUR_KEY_HERE', // This should be an env variable in production
            ...options,
        };

        const rzp = new (window as any).Razorpay(rzpOptions);
        rzp.open();
    }, [loadScript]);

    return { processPayment };
};
