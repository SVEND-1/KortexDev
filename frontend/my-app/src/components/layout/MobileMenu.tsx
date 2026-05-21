import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onRequestClick }) => {
    return (
        <>
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                <a href="#services" onClick={onClose}>Услуги</a>
                <a href="#benefits" onClick={onClose}>Преимущества</a>
                <a href="#portfolio" onClick={onClose}>Проекты</a>
                <a href="#reviews" onClick={onClose}>Отзывы</a>
                <a href="#contact" onClick={onClose}>Контакты</a>
                <button 
                    className={`${styles.btn} ${styles.btnP} ${styles.mobileCta}`} 
                    onClick={() => { onClose(); onRequestClick(); }}
                >
                    Заказать проект
                </button>
            </div>
            <div className={`${styles.mobileOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}></div>
        </>
    );
};

export default MobileMenu;