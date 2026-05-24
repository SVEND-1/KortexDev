import React from 'react';
import styles from '../../style/Hero.module.scss';
import heroImage from '../../assets/hero.webp'; // ← импорт картинки

interface HeroProps {
    onBookDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookDemo }) => {
    return (
        <section className={styles.hero}>
            {/* Анимированный фон с частицами */}
            <div className={styles.heroParticles}>
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${4 + Math.random() * 6}s`,
                            width: `${2 + Math.random() * 5}px`,
                            height: `${2 + Math.random() * 5}px`,
                            opacity: 0.1 + Math.random() * 0.4
                        }}
                    />
                ))}
            </div>

            {/* Контейнер с двумя колонками: текст + картинка */}
            <div className={styles.heroContainer}>
                {/* Левая колонка — текст */}
                <div className={styles.heroLeft}>
                    <div className={styles.eyebrow}>
                        <span className={styles.eyebrowDot}></span>
                        Monotree
                    </div>

                    <h1 className={styles.heroTitle}>
                        Put people first
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Fast, user-friendly and engaging - turn HR into people and culture
                        and streamline your daily operations with your own branded app.
                    </p>

                    <div className={styles.heroActions}>
                        <input
                            type="email"
                            placeholder="Enter work email"
                            className={styles.emailInput}
                        />
                        <button className={styles.btnPrimary} onClick={onBookDemo}>
                            <span>Book a demo</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    {/* Статистика — убрал 4.5 со звёздами */}
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>75.2%</div>
                            <div className={styles.statLabel}>Average daily activity</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>~20k</div>
                            <div className={styles.statLabel}>Average daily users</div>
                        </div>
                    </div>
                </div>

                {/* Правая колонка — картинка */}
                <div className={styles.heroRight}>
                    <img src={heroImage} alt="Monotree app preview" className={styles.heroImage} />
                </div>
            </div>


        </section>
    );
};

export default Hero;