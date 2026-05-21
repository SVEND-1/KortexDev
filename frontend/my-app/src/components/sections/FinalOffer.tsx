import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface FinalOfferProps {
    onRequestClick: () => void;
    onContactClick: () => void;
}

const FinalOffer: React.FC<FinalOfferProps> = ({ onRequestClick, onContactClick }) => {
    return (
        <div className={`${styles.finalOffer} ${styles.revealBlur}`}>
            <div className={styles.finalOfferContent}>
                <h3 className={styles.textGradientShift}>Готовы начать?</h3>
                <p>Создадим цифровой продукт, который будет приносить вам клиентов каждый день</p>
                <div className={styles.finalOfferButtons}>
                    <button className={`${styles.btn} ${styles.btnP} ${styles.hoverScaleLg} ${styles.glowPulse}`} onClick={onRequestClick}>
                        Заказать разработку
                    </button>
                    <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`} onClick={onContactClick}>
                        Связаться с нами
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalOffer;