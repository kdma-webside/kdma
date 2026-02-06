'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4 text-orange-500">Something went wrong!</h2>
                    <p className="mb-6 text-gray-400 max-w-md text-center">
                        {error.message || 'A critical error occurred.'}
                    </p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors font-bold uppercase tracking-wider"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
