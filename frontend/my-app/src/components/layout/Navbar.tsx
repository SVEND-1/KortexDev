import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface NavbarProps {
    scrolled: boolean;
    onRequestClick: () => void;
    onMenuToggle: () => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
                                           scrolled,
                                           onRequestClick,
                                           onMenuToggle,
                                        //    theme,
                                        //     onThemeToggle
                                       }) => {
    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navLogo}>Kortex<span>.</span>Dev</div>
            <div className={styles.navLinks}>
                <a href="#services" className={styles.hoverScale}>Услуги</a>
                <a href="#benefits" className={styles.hoverScale}>Преимущества</a>
                <a href="#portfolio" className={styles.hoverScale}>Проекты</a>
                <a href="#reviews" className={styles.hoverScale}>Отзывы</a>
                <a href="#contact" className={styles.hoverScale}>Контакты</a>
            </div>
            <div className={styles.navRight}>
                {/* <button
                   className={styles.themeToggle}
                    onClick={onThemeToggle}
                   aria-label="Переключить тему"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button> */}
                <button className={`${styles.navCta} ${styles.glowPulse}`} onClick={onRequestClick}>
                    Заказать проект
                </button>
            </div>
            <div className={styles.mobileMenuToggle} onClick={onMenuToggle}>
                <span></span><span></span><span></span>
            </div>
        </nav>
    );
};

export default Navbar;