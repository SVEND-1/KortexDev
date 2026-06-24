import { useEffect } from 'react';
import styles from '../../style/ITUniverse.module.scss';

export const useScrollReveal = (deps: any[] = []) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add(styles.visible);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const animatedElements = document.querySelectorAll(`
            .${styles.reveal}, 
            .${styles.revealScale}, 
            .${styles.revealLeft}, 
            .${styles.revealRight},
            .${styles.revealBlur},
            .${styles.revealFlip},
            .${styles.staggerItem},
            .${styles.staggerScale},
            .${styles.benefitCard}
        `);

        animatedElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, deps);
};