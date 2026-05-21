import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface ContactProps {
    onRequestClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onRequestClick }) => {
    return (
        <section id="contact" className={styles.contact}>
            <span className={`${styles.sectionTag} ${styles.revealRight}`}>Контакты</span>
            <h2 className={`${styles.contactTitle} ${styles.revealLeft}`}>
                <span style={{ color: 'var(--text)' }}>Давайте</span><br />
                <span className={styles.gradientText}>обсудим проект</span>
            </h2>
            <p className={`${styles.contactSub} ${styles.revealScale}`}>
                Оставьте заявку — мы свяжемся с вами в течение 15 минут
            </p>
            <div className={`${styles.contactRow} ${styles.revealBlur}`}>
                <button className={`${styles.btn} ${styles.btnP} ${styles.hoverScaleLg}`} onClick={onRequestClick}>
                    Оставить заявку →
                </button>
                <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`}>hello@ituniverse.dev</button>
            </div>
            <div className={`${styles.contactSocials} ${styles.revealFlip}`}>
                <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>Telegram</a>
                <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>WhatsApp</a>
                <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>VK</a>
            </div>
        </section>
    );
};

export default Contact;