import { useEffect } from 'react';
import styles from '../../style/ITUniverse.module.scss';

export const useTiltEffect = (deps: any[] = []) => {
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.projectCard}`);

        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const card = mouseEvent.currentTarget as HTMLElement;
            const rect = card.getBoundingClientRect();
            const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
            const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);

            const tiltX = ((mouseEvent.clientY - rect.top) / rect.height - 0.5) * -8;
            const tiltY = ((mouseEvent.clientX - rect.left) / rect.width - 0.5) * 8;
            card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        };

        const handleMouseLeave = (e: Event) => {
            const card = e.currentTarget as HTMLElement;
            card.style.transform = '';
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, deps);
};