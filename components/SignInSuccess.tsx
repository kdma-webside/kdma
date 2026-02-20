'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignInSuccess() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home after 3 seconds
        const timeout = setTimeout(() => {
            router.push('/');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0.1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600 rounded-full blur-[150px]"
                />
            </div>

            {/* Success content */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 text-center"
            >
                {/* Checkmark with pulse animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
                        />
                        <div className="relative w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
                            <CheckCircle2 className="w-14 h-14 text-green-500" strokeWidth={2.5} />
                        </div>
                    </div>
                </motion.div>

                {/* Success text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
                        Sign In <span className="text-green-500">Successful</span>
                    </h1>
                    <p className="text-neutral-400 text-lg font-medium mb-8">
                        Welcome back, warrior. Redirecting you to the academy...
                    </p>

                    {/* Loading bar */}
                    <div className="max-w-xs mx-auto">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-orange-600 to-green-500"
                            />
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-6 text-xs text-white/40 font-black tracking-widest uppercase"
                    >
                        Entering the arena...
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Particle effects */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: "50vw",
                        y: "50vh",
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        scale: Math.random() * 2 + 1,
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        ease: "easeOut",
                        delay: Math.random() * 0.5,
                    }}
                    className="absolute w-1 h-1 bg-orange-500 rounded-full"
                    style={{
                        filter: "blur(1px)",
                    }}
                />
            ))}
        </div>
    );
}
