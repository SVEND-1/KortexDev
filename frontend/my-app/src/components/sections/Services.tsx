// Services.tsx - обновленная версия

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

const serviceOrder: ServiceType[] = ['LANDING', 'PLATFORM', 'MOBILE'];

const serviceLabels: Record<ServiceType, string> = {
    LANDING: 'Лендинг',
    PLATFORM: 'Веб-платформа',
    MOBILE: 'Мобильное приложение'
};

const Services: React.FC<ServicesProps> = ({
                                               activeService,
                                               onServiceChange,
                                               currentService,
                                               onRequestClick
                                           }) => {
    const currentIndex = serviceOrder.indexOf(activeService);
    const prevService = serviceOrder[(currentIndex - 1 + serviceOrder.length) % serviceOrder.length];
    const nextService = serviceOrder[(currentIndex + 1) % serviceOrder.length];

    // ОБНОВЛЕННЫЙ previewMap с новыми данными
    const previewMap: Record<ServiceType, {
        title: string;
        subtitle: string;
        badge: string;
        price: string;
        cardText: string[];
    }> = {
        LANDING: {
            title: 'Лендинг',
            subtitle: 'Быстрый запуск, заявки и проверка гипотез',
            badge: 'Старт',
            price: 'от 12 499 ₽',
            cardText: [
                'Информационные страницы',
                'Админ панель',
                'Ссылки на обратную связь',
                'Подходит для рекламы'
            ]
        },
        PLATFORM: {
            title: 'Веб-платформа',
            subtitle: 'Сложная логика, личные кабинеты и автоматизация',
            badge: 'Система',
            price: 'Цена договрная',
            cardText: [
                'Функционал под ключ',
                'Роли и права',
                'Регистрация',
                'Рассылки'
            ]
        },
        MOBILE: {
            title: 'Мобильное приложение',
            subtitle: 'Скоро',
            badge: 'App',
            price: 'Скоро',
            cardText: [
                'Скоро',
                'Следите за обновлениями',
                '',
                ''
            ]
        }
    };

    const renderSideCard = (type: ServiceType, side: 'left' | 'right') => {
        const data = previewMap[type];

        return (
            <button
                type="button"
                className={`${styles.sideCard} ${side === 'left' ? styles.sideLeft : styles.sideRight}`}
                onClick={() => onServiceChange(type)}
                aria-label={`Выбрать ${serviceLabels[type]}`}
            >
                <div className={styles.sideCardTop}>
                    <span className={styles.previewBadge}>{data.badge}</span>
                    <span className={styles.sidePrice}>{data.price}</span>
                </div>

                <h3 className={styles.sideTitle}>{data.title}</h3>
                <p className={styles.sideSubtitle}>{data.subtitle}</p>

                <div className={styles.sideCardsColumn}>
                    {data.cardText.map((item, idx) => (
                        item && ( // Показываем только непустые строки
                            <div key={idx} className={styles.sideMiniCard}>
                                <span className={styles.sideMiniDot}></span>
                                <span className={styles.sideMiniText}>{item}</span>
                            </div>
                        )
                    ))}
                </div>
            </button>
        );
    };

    return (
        <section id="services" className={styles.services}>
            <div className={styles.servicesInner}>
                <div className={styles.servicesHeader}>
                    <span className={styles.sectionTag}>Наши услуги</span>
                    <h2 className={styles.sectionTitle}>
                        Что мы <span className={styles.accent}>предлагаем</span>
                    </h2>
                </div>

                <div className={styles.serviceToggle}>
                    {serviceOrder.map(type => (
                        <button
                            key={type}
                            className={`${styles.serviceToggleBtn} ${activeService === type ? styles.active : ''}`}
                            onClick={() => onServiceChange(type)}
                        >
                            {serviceLabels[type]}
                        </button>
                    ))}
                </div>

                <div className={styles.serviceCarousel}>
                    {renderSideCard(prevService, 'left')}

                    <div className={styles.serviceCardWrap}>
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
                    </div>

                    {renderSideCard(nextService, 'right')}
                </div>
            </div>
        </section>
    );
};

export default Services;