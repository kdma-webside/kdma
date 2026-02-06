'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface EnquiryContextType {
    isOpen: boolean;
    openEnquiry: () => void;
    closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openEnquiry = useCallback(() => setIsOpen(true), []);
    const closeEnquiry = useCallback(() => setIsOpen(false), []);

    return (
        <EnquiryContext.Provider value={{ isOpen, openEnquiry, closeEnquiry }}>
            {children}
        </EnquiryContext.Provider>
    );
};

export const useEnquiry = () => {
    const context = useContext(EnquiryContext);
    if (!context) {
        throw new Error('useEnquiry must be used within an EnquiryProvider');
    }
    return context;
};
