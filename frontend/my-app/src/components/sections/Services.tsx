import React from 'react';
import type { ServiceCard } from '../../types';
import styles from '../../style/ITUniverse.module.scss';

type ServiceType = 'LANDING' | 'PLATFORM' | 'MOBILE';

interface ServicesProps {
    activeService: ServiceType;
    onServiceChange: (type: ServiceType) => void;
    currentService: ServiceCard;
    onRequestClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ 
    activeService, 
    onServiceChange, 
    currentService, 
    onRequestClick 
}) => {
    const getServiceIcon = () => {
        if (activeService === 'LANDING') return '📄';
        if (activeService === 'PLATFORM') return '⚙️';
        return '📱';
    };

    return (
        <section id="services" className={styles.services}>
            <div className={`${styles.servicesHeader} ${styles.revealBlur}`}>
                <span className={styles.sectionTag}>Наши услуги</span>
                <h2 className={styles.sectionTitle}>
                    Что мы <span className={styles.accent}>предлагаем</span>
                </h2>
            </div>

            <div className={`${styles.serviceToggle} ${styles.revealLeft}`}>
                {(['LANDING', 'PLATFORM', 'MOBILE'] as const).map(type => (
                    <button
                        key={type}
                        className={`${styles.serviceToggleBtn} ${activeService === type ? styles.active : ''} ${styles.hoverScale}`}
                        onClick={() => onServiceChange(type)}
                    >
                        {type === 'LANDING' ? '📄 Лендинг' : type === 'PLATFORM' ? '⚙️ Веб-платформа' : '📱 Мобильное'}
                    </button>
                ))}
            </div>

            <div className={`${styles.serviceCard} ${styles.revealFlip} ${styles.cardRaise}`}>
                <div className={styles.serviceHeader}>
                    <div>
                        <div className={`${styles.serviceIconLarge} ${styles.hoverRotate}`}>{getServiceIcon()}</div>
                        <h3 className={styles.serviceTitle}>{currentService.title}</h3>
                        <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                    </div>
                    {currentService.price && (
                        <div className={styles.servicePrice}>
                            <span className={`${styles.priceValue} ${styles.textGradientShift}`}>{currentService.price}</span>
                            <span className={styles.priceLabel}>Стоимость разработки</span>
                        </div>
                    )}
                </div>

                <div className={styles.serviceFeatures}>
                    {currentService.features.map((feature, idx) => (
                        <div key={idx} className={`${styles.featureItem} ${styles.staggerItem}`} style={{ '--i': idx } as React.CSSProperties}>
                            <div className={`${styles.featureIcon} ${styles.hoverRotate}`}>{feature.icon}</div>
                            <div className={styles.featureContent}>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.serviceExamples}>
                    <h4>Примеры для бизнеса</h4>
                    <div className={styles.examplesGrid}>
                        {currentService.examples.map((example, idx) => (
                            <div key={idx} className={`${styles.exampleItem} ${styles.staggerScale}`} style={{ '--i': idx } as React.CSSProperties}>
                                <span className={`${styles.exampleIcon} ${styles.hoverRotate}`}>{example.icon}</span>
                                <div>
                                    <strong>{example.industry}</strong>
                                    <span className={styles.exampleFeature}>{example.specialFeature}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className={`${styles.btn} ${styles.btnP} ${styles.serviceBtn} ${styles.glowPulse}`} onClick={onRequestClick}>
                    Рассчитать стоимость →
                </button>
            </div>
        </section>
    );
};

export default Services;