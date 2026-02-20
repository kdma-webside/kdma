'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { setCursorType, setStickyElement } = useCursor();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const center = { x: left + width / 2, y: top + height / 2 };

        const distance = { x: clientX - center.x, y: clientY - center.y };

        // Magnetic pull strength
        setPosition({ x: distance.x * 0.1, y: distance.y * 0.1 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setCursorType('default');
        setStickyElement(null);
    };

    const handleMouseEnter = () => {
        setCursorType('button');
        setStickyElement(ref);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`cursor-none ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
