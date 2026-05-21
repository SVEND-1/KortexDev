import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface NavbarProps {
    scrolled: boolean;
    onRequestClick: () => void;
    onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onRequestClick, onMenuToggle }) => {
    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navLogo}>IT<span>.</span>UNIVERSE</div>
            <div className={styles.navLinks}>
                <a href="#services" className={styles.hoverScale}>Услуги</a>
                <a href="#benefits" className={styles.hoverScale}>Преимущества</a>
                <a href="#portfolio" className={styles.hoverScale}>Проекты</a>
                <a href="#reviews" className={styles.hoverScale}>Отзывы</a>
                <a href="#contact" className={styles.hoverScale}>Контакты</a>
            </div>
            <button className={`${styles.navCta} ${styles.glowPulse}`} onClick={onRequestClick}>
                Заказать проект
            </button>
            <div className={styles.mobileMenuToggle} onClick={onMenuToggle}>
                <span></span><span></span><span></span>
            </div>
        </nav>
    );
};

export default Navbar;