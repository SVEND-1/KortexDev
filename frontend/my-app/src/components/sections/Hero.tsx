import React, { useEffect, useState } from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface HeroProps {
    onRequestClick: () => void;
    onConsultationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRequestClick, onConsultationClick }) => {
    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const words = ['Лендинги', 'Веб-платформы', 'Мобильные приложения'];

    // Эффект печатающей машинки
    useEffect(() => {
        const currentWord = words[textIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setTypedText(currentWord.substring(0, typedText.length - 1));
                if (typedText.length === 0) {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % words.length);
                }
            }, 50);
        } else {
            timeout = setTimeout(() => {
                setTypedText(currentWord.substring(0, typedText.length + 1));
                if (typedText.length === currentWord.length) {
                    setIsDeleting(true);
                }
            }, 100);
        }

        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, textIndex]);

    return (
        <section className={styles.hero}>
            {/* Анимированный фон с частицами */}
            <div className={styles.heroParticles}>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            opacity: 0.1 + Math.random() * 0.3
                        }}
                    />
                ))}
            </div>

            {/* Левая колонка с текстом */}
            <div className={styles.heroLeft}>
                <div className={styles.eyebrow}>
                    <span className={styles.eyebrowDot}></span>
                    IT Universe · разработка под ключ
                </div>

                <h1 className={styles.heroTitle}>
                    Создаём<br />
                    цифровые<br />
                    <span className={styles.typedWrapper}>
                        <span className={styles.typedText}>{typedText}</span>
                        <span className={styles.cursor}>|</span>
                    </span>
                </h1>

                <p className={styles.heroSubtitle}>
                    Лендинги, веб-платформы и мобильные приложения под ключ.
                    Индивидуальный дизайн, админ-панель, онлайн оплата и не только.
                    Продукт, который работает на ваш бизнес 24/7.
                </p>

                <div className={styles.heroActions}>
                    <button className={styles.btnPrimary} onClick={onRequestClick}>
                        <span>Заказать разработку</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                    <button className={styles.btnSecondary} onClick={onConsultationClick}>
                        <span>Бесплатная консультация</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;