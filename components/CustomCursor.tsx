'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, animate, transform } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

const CustomCursor = () => {
    const { cursorType, stickyElement } = useCursor();
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    // Smooth physics for the cursor
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    };

    const rotate = (distance: { x: number; y: number }) => {
        const angle = Math.atan2(distance.y, distance.x);
        animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });
    }

    // Ref for the cursor element
    const cursorRef = React.useRef(null);
    // Size of the cursor based on state
    const cursorSize = cursorType === 'button' ? 60 : 20;

    const manageMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        if (stickyElement && stickyElement.current) {
            // If sticking to an element, snap to its center
            const { left, top, width, height } = stickyElement.current.getBoundingClientRect();
            const center = { x: left + width / 2, y: top + height / 2 };
            mouse.x.set(center.x - cursorSize / 2);
            mouse.y.set(center.y - cursorSize / 2);
        } else {
            // Normal mouse movement
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);
        return () => window.removeEventListener("mousemove", manageMouseMove);
    }, [cursorType, stickyElement, cursorSize]);

    // Template for the cursor visuals
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            <motion.div
                ref={cursorRef}
                style={{
                    left: smoothMouse.x,
                    top: smoothMouse.y,
                }}
                animate={{
                    width: cursorSize,
                    height: cursorSize,
                    backgroundColor: cursorType === 'button' ? '#f97316' : '#f97316', // Orange-500
                    opacity: cursorType === 'button' ? 0.6 : 1,
                    scale: cursorType === 'button' ? 1.2 : 1,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
                className="absolute rounded-full pointer-events-none mix-blend-screen backdrop-blur-sm"
            >
                {/* Optional: Add a subtle glow or ring */}
                {cursorType === 'default' && (
                    <div className="absolute inset-0 rounded-full blur-[2px] bg-orange-400 opacity-50" />
                )}
            </motion.div>
        </div>
    );
};

export default CustomCursor;
