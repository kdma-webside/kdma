'use client';

import { useEffect } from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        // Use a small delay to ensure the browser's scroll restoration doesn't override this
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return null;
};

export default ScrollToTop;
