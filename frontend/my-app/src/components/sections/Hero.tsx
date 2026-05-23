import React from 'react';
import styles from '../../style/Hero.module.scss';

interface HeroProps {
    onRequestClick: () => void;
    onConsultationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRequestClick, onConsultationClick }) => {
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

            {/* Текстовый блок */}
            <div className={styles.heroLeft}>
                <div className={styles.eyebrow}>
                    <span className={styles.eyebrowDot}></span>
                    IT Universe · разработка под ключ
                </div>

                <h1 className={styles.heroTitle}>
                    Цифровые продукты,<br />
                    которые продают
                </h1>

                <p className={styles.heroSubtitle}>
                    Лендинги, веб-платформы и мобильные приложения под ключ — с дизайном,
                    логикой и запуском без лишней воды.
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