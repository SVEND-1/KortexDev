import { useEffect } from 'react';
import styles from '../../style/ITUniverse.module.scss';

export const useParticles = () => {
    useEffect(() => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        const colors = ['rgba(109,92,232,0.5)', 'rgba(77,212,232,0.4)', 'rgba(77,232,168,0.4)', 'rgba(232,146,77,0.3)'];
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = styles.particle;
            p.style.cssText = `--x:${Math.random() * 100}%;--y:${Math.random() * 100}%;--s:${(Math.random() * 2 + 1).toFixed(1)}px;--c:${colors[i % 4]};--d:${(Math.random() * 5 + 4).toFixed(1)}s;--dl:${(Math.random() * 10).toFixed(1)}s`;
            particlesContainer.appendChild(p);
        }
    }, []);
};