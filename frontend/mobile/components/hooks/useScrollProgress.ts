import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScrollProgress = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScrollProgress);
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

    return scrollProgress;
};