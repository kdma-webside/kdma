'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleTouch = (e: TouchEvent) => {
            if (e.touches[0]) {
                cursorX.set(e.touches[0].clientX);
                cursorY.set(e.touches[0].clientY);
                if (!isVisible) setIsVisible(true);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('touchstart', handleTouch);
        window.addEventListener('touchmove', handleTouch);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
                <motion.div
                    style={{
                        translateX: cursorXSpring,
                        translateY: cursorYSpring,
                        opacity: isVisible ? 1 : 0,
                    }}
                    className="relative"
                >
                    {/* The glowing 'Tip' of the wand at the mouse coordinate */}
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316,0_0_30px_#f97316]" />

                    {/* Exterior Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -left-5 -top-5 w-10 h-10 bg-orange-600/30 rounded-full blur-xl"
                    />

                    {/* The Wand Handle - Extending from cursor point to bottom-right (standard angle) */}
                    <div
                        className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-orange-400 via-orange-800 to-transparent rotate-45 origin-left"
                        style={{
                            boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)',
                            borderRadius: '100% 0 0 100%'
                        }}
                    />

                    {/* Tiny Sparkles around the tip */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                x: [0, (i - 1) * 15, 0],
                                y: [0, (i - 1) * -15, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 1 + Math.random(),
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            className="absolute -left-1 -top-1 w-1 h-1 bg-white rounded-full"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Trail Effect - Only for desktop screens */}
            <div className="hidden lg:block">
                {isVisible && <Trail />}
            </div>
        </>
    );
};

const Trail = () => {
    const [trail, setTrail] = useState<{ x: number; y: number; id: number; isInteractive: boolean }[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"]') !== null;

            setTrail((prev) => [
                { x: e.clientX, y: e.clientY, id: Math.random(), isInteractive: interactive },
                ...prev.slice(0, 15),
            ]);
        };

        const handleTouch = (e: TouchEvent) => {
            if (e.touches[0]) {
                const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) as HTMLElement;
                const interactive = target?.closest('a, button, [role="button"]') !== null;

                setTrail((prev) => [
                    { x: e.touches[0].clientX, y: e.touches[0].clientY, id: Math.random(), isInteractive: interactive },
                    ...prev.slice(0, 15),
                ]);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouch);
        window.addEventListener('touchmove', handleTouch);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
        };
    }, []);

    return (
        <>
            {trail.map((point) => (
                <motion.div
                    key={point.id}
                    initial={{
                        opacity: point.isInteractive ? 1 : 0.8,
                        scale: point.isInteractive ? 1.5 : 0.8
                    }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`fixed rounded-full pointer-events-none z-[9998] ${point.isInteractive
                        ? "w-4 h-4 bg-orange-400 blur-[2px] shadow-[0_0_10px_#fb923c]"
                        : "w-2 h-2 bg-orange-500/50 blur-[1px]"
                        }`}
                    style={{
                        left: point.x,
                        top: point.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;
