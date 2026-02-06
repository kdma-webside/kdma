'use client';

import React, { createContext, useContext, useState } from 'react';

type CursorType = 'default' | 'button' | 'text';

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
    stickyElement: React.RefObject<HTMLElement | null> | null;
    setStickyElement: (ref: React.RefObject<HTMLElement | null> | null) => void;
}

const CursorContext = createContext<CursorContextType>({
    cursorType: 'default',
    setCursorType: () => { },
    stickyElement: null,
    setStickyElement: () => { },
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [stickyElement, setStickyElement] = useState<React.RefObject<HTMLElement | null> | null>(null);

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType, stickyElement, setStickyElement }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);
