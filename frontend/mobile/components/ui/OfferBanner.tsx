import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface OfferBannerProps {
    onRequestClick: () => void;
}

const OfferBanner: React.FC<OfferBannerProps> = ({ onRequestClick }) => {
    return (
        <div className={`${styles.offerBanner} ${styles.reveal}`}>
            <div className={styles.offerContent}>
                <span className={styles.offerIcon}>✦</span>
                <p className={styles.offerText}>
                    Закажите разработку сегодня и получите <strong>бесплатное SEO-продвижение</strong> на первый месяц
                </p>
                <button 
                    className={`${styles.btn} ${styles.btnP} ${styles.offerBtn} ${styles.hoverScale}`} 
                    onClick={onRequestClick}
                >
                    Заказать
                </button>
            </div>
        </div>
    );
};

export default OfferBanner;