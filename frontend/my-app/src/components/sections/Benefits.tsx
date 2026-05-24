import React, { useEffect, useRef, useState } from 'react';
import styles from '../../style/Benefits.module.scss';

interface Benefit {
    title: string;
    description: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());
    const [animationType, setAnimationType] = useState<'float' | 'wave' | 'spring' | 'pop' | 'rotate'>('float');

    useEffect(() => {
        const types = ['float', 'wave', 'spring', 'pop', 'rotate'] as const;
        const randomType = types[Math.floor(Math.random() * types.length)];
        setAnimationType(randomType);
    }, []);

    // Функция для получения класса анимации
    const getAnimationClass = (index: number) => {
        if (!animatedCards.has(index)) return '';

        switch (animationType) {
            case 'wave': return styles.waveIn;
            case 'spring': return styles.springIn;
            case 'pop': return styles.popIn;
            case 'rotate': return styles.rotateIn;
            default: return styles.animateIn;
        }
    };

    useEffect(() => {
        // Анимация для хедера
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const headerElement = document.querySelector(`.${styles.revealBlur}`);
        if (headerElement) observer.observe(headerElement);

        // Анимация для карточек с задержкой
        const cards = document.querySelectorAll(`.${styles.benefitCard}`);

        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt((entry.target as HTMLElement).dataset.index || '0');
                        setAnimatedCards(prev => new Set([...prev, index]));
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        cards.forEach((card, idx) => {
            (card as HTMLElement).style.setProperty('--idx', idx.toString());
            (card as HTMLElement).dataset.index = idx.toString();
            cardObserver.observe(card);
        });

        return () => {
            observer.disconnect();
            cardObserver.disconnect();
        };
    }, []); // Убрал animationType из зависимостей

    // Эффект слежения за мышью для 3D
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.benefitCard}`);

        const handleMouseMove = (e: globalThis.MouseEvent, card: Element) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            (card as HTMLElement).style.setProperty('--x', `${x}%`);
            (card as HTMLElement).style.setProperty('--y', `${y}%`);
        };

        const handleMouseLeave = (card: Element) => {
            (card as HTMLElement).style.setProperty('--x', '50%');
            (card as HTMLElement).style.setProperty('--y', '50%');
        };

        // Создаем обработчики с правильной типизацией
        const mouseMoveHandlers: Map<Element, (e: globalThis.MouseEvent) => void> = new Map();
        const mouseLeaveHandlers: Map<Element, () => void> = new Map();

        cards.forEach(card => {
            const onMouseMove = (e: globalThis.MouseEvent) => handleMouseMove(e, card);
            const onMouseLeave = () => handleMouseLeave(card);

            mouseMoveHandlers.set(card, onMouseMove);
            mouseLeaveHandlers.set(card, onMouseLeave);

            card.addEventListener('mousemove', onMouseMove as EventListener);
            card.addEventListener('mouseleave', onMouseLeave as EventListener);
        });

        return () => {
            cards.forEach(card => {
                const onMouseMove = mouseMoveHandlers.get(card);
                const onMouseLeave = mouseLeaveHandlers.get(card);

                if (onMouseMove) {
                    card.removeEventListener('mousemove', onMouseMove as EventListener);
                }
                if (onMouseLeave) {
                    card.removeEventListener('mouseleave', onMouseLeave as EventListener);
                }
            });
        };
    }, []);

    return (
        <section id="benefits" className={styles.benefits} ref={sectionRef}>
            <div className={`${styles.benefitsHeader} ${styles.revealBlur}`}>
                <span className={styles.sectionTag}>Почему это выгодно</span>
                <h2 className={styles.sectionTitle}>
                    Чем полезен <span className={styles.accent}>сайт для бизнеса</span>
                </h2>
            </div>

            <div className={styles.benefitsGrid}>
                {benefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        className={`${styles.benefitCard} ${styles.cardRaise} ${getAnimationClass(idx)}`}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                        <div className={styles.gradientOverlay}></div>
                        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                        <p className={styles.benefitDescription}>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;