import React from 'react';
import type { ServiceCard } from '../../types';
import styles from '../../style/Services.module.scss';

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
    return (
        <section id="services" className={styles.services}>
            <div className={styles.servicesHeader}>
                <span className={styles.sectionTag}>Наши услуги</span>
                <h2 className={styles.sectionTitle}>
                    Что мы <span className={styles.accent}>предлагаем</span>
                </h2>
            </div>

            <div className={styles.serviceToggle}>
                {(['LANDING', 'PLATFORM', 'MOBILE'] as const).map(type => (
                    <button
                        key={type}
                        className={`${styles.serviceToggleBtn} ${activeService === type ? styles.active : ''}`}
                        onClick={() => onServiceChange(type)}
                    >
                        {type === 'LANDING' ? 'Лендинг' : type === 'PLATFORM' ? 'Веб-платформа' : 'Мобильное приложение'}
                    </button>
                ))}
            </div>

            <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                    <div>
                        <h3 className={styles.serviceTitle}>{currentService.title}</h3>
                        <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                    </div>
                    {currentService.price && (
                        <div className={styles.servicePrice}>
                            <span className={styles.priceValue}>{currentService.price}</span>
                            <span className={styles.priceLabel}>Стоимость разработки</span>
                        </div>
                    )}
                </div>

                <div className={styles.serviceFeatures}>
                    {currentService.features.map((feature, idx) => (
                        <div key={idx} className={styles.featureItem}>
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
                            <div key={idx} className={styles.exampleItem}>
                                <div>
                                    <strong>{example.industry}</strong>
                                    <span className={styles.exampleFeature}>{example.specialFeature}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.serviceBtn} onClick={onRequestClick}>
                    Рассчитать стоимость →
                </button>
            </div>
        </section>
    );
};

export default Services;