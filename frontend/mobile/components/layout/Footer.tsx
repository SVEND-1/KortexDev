    import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLogo}>KortexDev</div>
            <div className={styles.footerText}>© 2026 KortexDev — Разработка сайтов и мобильных приложений под ключ</div>
        </footer>
    );
};

export default Footer;