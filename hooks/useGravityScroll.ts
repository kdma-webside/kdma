'use client';

import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom hook to add "gravity-defying" swing/balance animations on scroll.
 * Returns motion values for rotation and y-offset based on scroll progress.
 */
export const useGravityScroll = (intensity = 5) => {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth out the scroll value
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate swing (rotation) - athlete "swings" as they balance
    const rotate = useTransform(smoothScroll, [0, 0.5, 1], [-intensity, intensity, -intensity]);

    // Subtle vertical "floating" effect
    const y = useTransform(smoothScroll, [0, 0.5, 1], [0, -intensity * 2, 0]);

    return { containerRef, rotate, y };
};
