'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface TrailPoint {
    id: number;
    x: number;
    y: number;
}

export default function MagicCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const trailIdCounter = useRef(0);

    // Precise coordinates for the leading dot
    const springX = cursorX;
    const springY = cursorY;

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            cursorX.set(clientX);
            cursorY.set(clientY);

            // Create a new trail point
            const newPoint = {
                id: trailIdCounter.current++,
                x: clientX,
                y: clientY
            };

            // Keep exactly 8 points for a "sharp" tail feel
            setTrail((prev) => [...prev.slice(-7), newPoint]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Hidden cursor style on ALL elements */}
            <style jsx global>{`
                body, a, button, [role="button"], input, select, textarea, * {
                    cursor: none !important;
                }
            `}</style>

            {/* The Sharp Tail (Trail) */}
            <AnimatePresence>
                {trail.map((point, index) => {
                    const progress = index / (trail.length - 1);
                    return (
                        <motion.div
                            key={point.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: progress * 0.8, scale: progress }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.1 }}
                            style={{
                                position: 'absolute',
                                left: point.x,
                                top: point.y,
                                x: '-50%',
                                y: '-50%',
                                width: 8,
                                height: 8,
                                background: '#fb923c', // orange-400
                                borderRadius: '50%',
                                filter: `blur(${2 * (1 - progress)}px)`,
                            }}
                        />
                    );
                })}
            </AnimatePresence>

            {/* The Celestial Core Assembly */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                    width: 30, // Increased hit area for orbits
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    rotate: -35, // More pronounced tilt
                }}
            >
                {/* Sharp Handle */}
                <svg
                    width="12"
                    height="40"
                    viewBox="0 0 12 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, 0) rotate(15deg)',
                        transformOrigin: 'top center',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        zIndex: -1
                    }}
                >
                    <path
                        d="M6 0L10 35C10 37 8 39 6 39C4 39 2 37 2 35L6 0Z"
                        fill="url(#handleGradient)"
                        stroke="#27272a"
                        strokeWidth="0.5"
                    />
                    <defs>
                        <linearGradient id="handleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#71717a" />
                            <stop offset="100%" stopColor="#18181b" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Orange Ember Core */}
                <div
                    style={{
                        position: 'relative',
                        width: 10,
                        height: 10,
                        background: '#f97316',
                        borderRadius: '50%',
                        boxShadow: '0 0 15px 4px rgba(249, 115, 22, 0.6)',
                        zIndex: 1
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            inset: -4,
                            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4), transparent)',
                            borderRadius: '50%',
                        }}
                    />
                </div>

                {/* Revolving Planet 1 */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: 25, // Orbit radius * 2
                        height: 25,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 4,
                            height: 4,
                            background: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 0 6px white'
                        }}
                    />
                </motion.div>

                {/* Revolving Planet 2 */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: 40, // Different orbit radius
                        height: 40,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 3,
                            height: 3,
                            background: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 0 4px white'
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
