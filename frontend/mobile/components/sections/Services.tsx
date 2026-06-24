// app/components/sections/Services.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type ServiceType = 'LANDING' | 'PLATFORM' | 'MOBILE';

interface ServicesProps {
    activeService: ServiceType;
    onServiceChange: (type: ServiceType) => void;
    currentService: {
        title: string;
        subtitle: string;
        price?: string;
        features: { title: string; description: string }[];
        examples: { industry: string; specialFeature: string }[];
    };
    onRequestClick: () => void;
}

const serviceOrder: ServiceType[] = ['LANDING', 'PLATFORM', 'MOBILE'];

const serviceLabels: Record<ServiceType, string> = {
    LANDING: 'Лендинг',
    PLATFORM: 'Веб-платформа',
    MOBILE: 'Мобильное приложение',
};

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
        price: 'от 50 000 ₽',
        cardText: ['1 страница', 'Форма заявки', 'Быстрый запуск', 'Подходит для рекламы'],
    },
    PLATFORM: {
        title: 'Веб-платформа',
        subtitle: 'Сложная логика, личные кабинеты и автоматизация',
        badge: 'Система',
        price: 'от 300 000 ₽',
        cardText: ['Личный кабинет', 'Админ-панель', 'Интеграции', 'CRM-логика'],
    },
    MOBILE: {
        title: 'Мобильное приложение',
        subtitle: 'iOS и Android, пуши, авторизация и кабинет',
        badge: 'App',
        price: 'от 200 000 ₽',
        cardText: ['iOS / Android', 'Push-уведомления', 'Авторизация', 'Постоянный контакт'],
    },
};

export default function Services({
                                     activeService,
                                     onServiceChange,
                                     currentService,
                                     onRequestClick,
                                 }: ServicesProps) {
    const currentIndex = serviceOrder.indexOf(activeService);
    const prevService = serviceOrder[(currentIndex - 1 + serviceOrder.length) % serviceOrder.length];
    const nextService = serviceOrder[(currentIndex + 1) % serviceOrder.length];

    const cardScale = useRef(new Animated.Value(0.98)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(cardScale, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, [activeService]);

    const isMobile = width < 1024;

    const renderSideCard = (type: ServiceType, side: 'left' | 'right') => {
        const data = previewMap[type];
        const isLeft = side === 'left';

        return (
            <TouchableOpacity
                style={[
                    styles.sideCard,
                    isLeft ? styles.sideLeft : styles.sideRight,
                ]}
                onPress={() => onServiceChange(type)}
                activeOpacity={0.9}
            >
                <View style={styles.sideCardTop}>
                    <View style={styles.previewBadge}>
                        <Text style={styles.previewBadgeText}>{data.badge}</Text>
                    </View>
                    <Text style={styles.sidePrice}>{data.price}</Text>
                </View>
                <Text style={styles.sideTitle}>{data.title}</Text>
                <Text style={styles.sideSubtitle}>{data.subtitle}</Text>
                <View style={styles.sideCardsColumn}>
                    {data.cardText.map((item, idx) => (
                        <View key={idx} style={styles.sideMiniCard}>
                            <View style={styles.sideMiniDot} />
                            <Text style={styles.sideMiniText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    const ServiceToggle = ({ type }: { type: ServiceType }) => (
        <TouchableOpacity
            style={[
                styles.serviceToggleBtn,
                activeService === type && styles.serviceToggleBtnActive,
            ]}
            onPress={() => onServiceChange(type)}
        >
            <LinearGradient
                colors={activeService === type ? ['#ffffff', '#6D5CE8'] : ['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.toggleGradient,
                    activeService === type && styles.toggleGradientActive,
                ]}
            >
                <Text
                    style={[
                        styles.serviceToggleBtnText,
                        activeService === type && styles.serviceToggleBtnTextActive,
                    ]}
                >
                    {serviceLabels[type]}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.servicesInner}>
                <View style={styles.servicesHeader}>
                    <View style={styles.sectionTagWrapper}>
                        <Text style={styles.sectionTag}>Наши услуги</Text>
                    </View>
                    <Text style={styles.sectionTitle}>
                        Что мы <Text style={styles.accent}>предлагаем</Text>
                    </Text>
                </View>

                <View style={styles.serviceToggle}>
                    {serviceOrder.map((type) => (
                        <ServiceToggle key={type} type={type} />
                    ))}
                </View>

                {!isMobile && (
                    <View style={styles.serviceCarousel}>
                        {renderSideCard(prevService, 'left')}

                        <Animated.View
                            style={[
                                styles.serviceCardWrap,
                                {
                                    opacity: cardOpacity,
                                    transform: [{ scale: cardScale }],
                                },
                            ]}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.01)']}
                                style={styles.serviceCard}
                            >
                                <View style={styles.serviceHeader}>
                                    <View>
                                        <Text style={styles.serviceTitle}>{currentService.title}</Text>
                                        <Text style={styles.serviceSubtitle}>{currentService.subtitle}</Text>
                                    </View>
                                    {currentService.price && (
                                        <View style={styles.servicePrice}>
                                            <Text style={styles.priceValue}>{currentService.price}</Text>
                                            <Text style={styles.priceLabel}>Стоимость разработки</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.serviceFeatures}>
                                    {currentService.features.map((feature, idx) => (
                                        <View key={idx} style={styles.featureItem}>
                                            <View style={styles.featureContent}>
                                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                                <Text style={styles.featureDesc}>{feature.description}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.serviceExamples}>
                                    <Text style={styles.examplesTitle}>Примеры для бизнеса</Text>
                                    <View style={styles.examplesGrid}>
                                        {currentService.examples.map((example, idx) => (
                                            <View key={idx} style={styles.exampleItem}>
                                                <View>
                                                    <Text style={styles.exampleIndustry}>{example.industry}</Text>
                                                    <Text style={styles.exampleFeature}>{example.specialFeature}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.serviceBtn} onPress={onRequestClick}>
                                    <Text style={styles.serviceBtnText}>Рассчитать стоимость →</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </Animated.View>

                        {renderSideCard(nextService, 'right')}
                    </View>
                )}

                {isMobile && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mobileCarousel}>
                        {serviceOrder.map((type) => {
                            return (
                                <View key={type} style={styles.mobileServiceCard}>
                                    <Text style={styles.mobileServiceTitle}>{previewMap[type].title}</Text>
                                    <Text style={styles.mobileServiceSubtitle}>{previewMap[type].subtitle}</Text>
                                    <Text style={styles.mobileServicePrice}>{previewMap[type].price}</Text>
                                    <TouchableOpacity style={styles.mobileServiceBtn} onPress={onRequestClick}>
                                        <Text style={styles.mobileServiceBtnText}>Рассчитать стоимость →</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        paddingVertical: 60,
    },
    servicesInner: {
        paddingHorizontal: 20,
    },
    servicesHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    sectionTagWrapper: {
        marginBottom: 20,
    },
    sectionTag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    sectionTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 28 : 36,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
    },
    accent: {
        color: '#ffffff',
    },
    serviceToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 40,
        flexWrap: 'wrap',
    },
    serviceToggleBtn: {
        borderRadius: 80,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    serviceToggleBtnActive: {
        borderColor: 'transparent',
    },
    toggleGradient: {
        paddingHorizontal: 28,
        paddingVertical: 14,
    },
    toggleGradientActive: {
        backgroundColor: 'transparent',
    },
    serviceToggleBtnText: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: width < 480 ? 12 : 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.55)',
    },
    serviceToggleBtnTextActive: {
        color: '#000000',
    },
    serviceCarousel: {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 20,
    },
    serviceCardWrap: {
        flex: 1,
    },
    serviceCard: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        padding: 28,
    },
    serviceHeader: {
        alignItems: 'center',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.07)',
    },
    serviceTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 28 : 34,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 8,
    },
    serviceSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 16,
    },
    servicePrice: {
        alignItems: 'center',
    },
    priceValue: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 36,
        color: '#ffffff',
    },
    priceLabel: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 4,
    },
    serviceFeatures: {
        gap: 12,
        marginBottom: 24,
    },
    featureItem: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
    },
    featureContent: {
        alignItems: 'center',
    },
    featureTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 15,
        color: '#ffffff',
        marginBottom: 6,
        textAlign: 'center',
    },
    featureDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        lineHeight: 18,
    },
    serviceExamples: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 18,
        marginBottom: 24,
    },
    examplesTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },
    examplesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    exampleItem: {
        flex: 1,
        minWidth: width * 0.35,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    exampleIndustry: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 4,
        textAlign: 'center',
    },
    exampleFeature: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
    },
    serviceBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 40,
        paddingVertical: 14,
        alignItems: 'center',
    },
    serviceBtnText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
    sideCard: {
        width: width * 0.22,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        borderRadius: 22,
        padding: 20,
        alignItems: 'center',
    },
    sideLeft: {
        transform: [{ translateX: 8 }, { scale: 0.98 }],
    },
    sideRight: {
        transform: [{ translateX: -8 }, { scale: 0.98 }],
    },
    sideCardTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    previewBadge: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    previewBadgeText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: '#ffffff',
    },
    sidePrice: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 14,
        color: '#ffffff',
    },
    sideTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#ffffff',
        marginBottom: 8,
        textAlign: 'center',
    },
    sideSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.78)',
        textAlign: 'center',
        marginBottom: 16,
    },
    sideCardsColumn: {
        width: '100%',
        gap: 8,
    },
    sideMiniCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 10,
    },
    sideMiniDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ffffff',
    },
    sideMiniText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.82)',
        textAlign: 'center',
    },
    mobileCarousel: {
        flexDirection: 'row',
    },
    mobileServiceCard: {
        width: width * 0.7,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        borderRadius: 24,
        padding: 20,
        marginRight: 16,
    },
    mobileServiceTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 22,
        color: '#ffffff',
        marginBottom: 8,
    },
    mobileServiceSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 16,
    },
    mobileServicePrice: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 20,
    },
    mobileServiceBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 40,
        paddingVertical: 12,
        alignItems: 'center',
    },
    mobileServiceBtnText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
});