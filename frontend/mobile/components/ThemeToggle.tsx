// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
        </button>
    );
};

export default ThemeToggle;