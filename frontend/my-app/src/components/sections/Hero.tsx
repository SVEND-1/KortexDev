import React from 'react';
import styles from '../../style/Hero.module.scss';
import heroImage from '../../assets/hero.webp';

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
                        KortexDev
                    </div>

                    <h1 className={styles.heroTitle}>
                        Разработка сайтов <br />
                        <span style={{ color: '#ffffff' }}>под ключ</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Создаём лендинги, веб-платформы и мобильные приложения, которые приносят реальные продажи.
                        Современный дизайн, админ-панель и онлайн-оплата — всё в одном месте.
                    </p>

                    <div className={styles.heroActions}>
                        <button className={styles.btnPrimary} onClick={onBookDemo}>
                            <span>Заказать проект</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    {/* Статистика */}
                    {/*<div className={styles.stats}>*/}
                    {/*    <div className={styles.statItem}>*/}
                    {/*        <div className={styles.statValue}>75+</div>*/}
                    {/*        <div className={styles.statLabel}>Реализованных проектов</div>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.statDivider}></div>*/}
                    {/*    <div className={styles.statItem}>*/}
                    {/*        <div className={styles.statValue}>50+</div>*/}
                    {/*        <div className={styles.statLabel}>Довольных клиентов</div>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.statDivider}></div>*/}
                    {/*    <div className={styles.statItem}>*/}
                    {/*        <div className={styles.statValue}>4.9</div>*/}
                    {/*        <div className={styles.statLabel}>Средний рейтинг</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Правая колонка — картинка */}
                <div className={styles.heroRight}>
                    <img src={heroImage} alt="KortexDev preview" className={styles.heroImage} />
                </div>
            </div>
        </section>
    );
};

export default Hero;