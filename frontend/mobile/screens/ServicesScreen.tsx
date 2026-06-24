// app/screens/ServicesScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

type ServiceType = 'LANDING' | 'PLATFORM' | 'MOBILE';

interface ServiceFeature {
    title: string;
    description: string;
}

interface ServiceExample {
    industry: string;
    specialFeature: string;
}

const servicesData: Record<ServiceType, {
    title: string;
    subtitle: string;
    price: string;
    features: ServiceFeature[];
    examples: ServiceExample[];
}> = {
    LANDING: {
        title: 'Лендинг',
        subtitle: 'Быстрый запуск, заявки и проверка гипотез',
        price: 'от 50 000 ₽',
        features: [
            { title: 'Адаптивный дизайн', description: 'Идеально выглядит на всех устройствах' },
            { title: 'Форма захвата контактов', description: 'Собирайте лиды 24/7' },
            { title: 'Интеграция с CRM', description: 'Автоматическая передача заявок' },
            { title: 'Аналитика и метрики', description: 'Отслеживайте эффективность' },
        ],
        examples: [
            { industry: 'Ритейл', specialFeature: 'Каталог + онлайн оплата' },
            { industry: 'Услуги', specialFeature: 'Онлайн запись' },
            { industry: 'Образование', specialFeature: 'Регистрация на курс' },
        ],
    },
    PLATFORM: {
        title: 'Веб-платформа',
        subtitle: 'Сложная логика, личные кабинеты и автоматизация',
        price: 'от 150 000 ₽',
        features: [
            { title: 'Личный кабинет', description: 'Управление профилем и заказами' },
            { title: 'Админ-панель', description: 'Полный контроль над контентом' },
            { title: 'База данных', description: 'Хранение и обработка данных' },
            { title: 'API интеграции', description: 'Подключение любых сервисов' },
        ],
        examples: [
            { industry: 'Маркетплейс', specialFeature: 'Товары + продавцы' },
            { industry: 'CRM-система', specialFeature: 'Управление клиентами' },
            { industry: 'Обучение', specialFeature: 'Курсы + вебинары' },
        ],
    },
    MOBILE: {
        title: 'Мобильное приложение',
        subtitle: 'iOS и Android, пуши, авторизация и кабинет',
        price: 'от 200 000 ₽',
        features: [
            { title: 'React Native', description: 'Кроссплатформенная разработка' },
            { title: 'iOS + Android', description: 'Одно приложение для двух платформ' },
            { title: 'Push уведомления', description: 'Удерживайте внимание клиентов' },
            { title: 'Офлайн режим', description: 'Работа без интернета' },
        ],
        examples: [
            { industry: 'Доставка', specialFeature: 'GPS трекинг' },
            { industry: 'Соцсеть', specialFeature: 'Лента + чат' },
            { industry: 'Фитнес', specialFeature: 'Тренировки + календарь' },
        ],
    },
};

export default function ServicesScreen() {
    const { isDark } = useTheme();
    const [activeService, setActiveService] = useState<ServiceType>('LANDING');

    const currentService = servicesData[activeService];

    const handleRequestPress = () => {
        console.log('Заказать услугу:', currentService.title);
        // TODO: Открыть модалку с заявкой
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: isDark ? '#000000' : '#ffffff' }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.tag, { color: isDark ? '#fff' : '#000' }]}>
                        Наши услуги
                    </Text>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
                        Что мы{' '}
                        <Text style={styles.accent}>предлагаем</Text>
                    </Text>
                </View>

                {/* Service Tabs */}
                <View style={styles.tabs}>
                    {(['LANDING', 'PLATFORM', 'MOBILE'] as ServiceType[]).map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.tab,
                                activeService === type && styles.tabActive,
                                {
                                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                                    backgroundColor: activeService === type && !isDark ? '#000' : 'transparent',
                                },
                            ]}
                            onPress={() => setActiveService(type)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    {
                                        color: activeService === type
                                            ? (isDark ? '#000' : '#fff')
                                            : (isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)'),
                                    },
                                ]}
                            >
                                {servicesData[type].title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Service Card */}
                <Card style={styles.serviceCard}>
                    <View style={styles.serviceHeader}>
                        <View>
                            <Text style={[styles.serviceTitle, { color: isDark ? '#fff' : '#000' }]}>
                                {currentService.title}
                            </Text>
                            <Text style={[styles.serviceSubtitle, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                                {currentService.subtitle}
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.priceValue, { color: isDark ? '#fff' : '#000' }]}>
                                {currentService.price}
                            </Text>
                            <Text style={[styles.priceLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }]}>
                                Стоимость разработки
                            </Text>
                        </View>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresGrid}>
                        {currentService.features.map((feature, idx) => (
                            <View key={idx} style={styles.featureItem}>
                                <View style={[styles.featureDot, { backgroundColor: isDark ? '#fff' : '#000' }]} />
                                <View>
                                    <Text style={[styles.featureTitle, { color: isDark ? '#fff' : '#000' }]}>
                                        {feature.title}
                                    </Text>
                                    <Text style={[styles.featureDesc, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                                        {feature.description}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Examples */}
                    <View style={styles.examplesSection}>
                        <Text style={[styles.examplesTitle, { color: isDark ? '#fff' : '#000' }]}>
                            Примеры для бизнеса
                        </Text>
                        <View style={styles.examplesGrid}>
                            {currentService.examples.map((example, idx) => (
                                <View key={idx} style={styles.exampleItem}>
                                    <Text style={[styles.exampleIndustry, { color: isDark ? '#fff' : '#000' }]}>
                                        {example.industry}
                                    </Text>
                                    <Text style={[styles.exampleFeature, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                                        {example.specialFeature}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Button
                        title="Рассчитать стоимость →"
                        onPress={handleRequestPress}
                        variant="primary"
                        style={styles.serviceButton}
                    />
                </Card>
            </View>
        </ScrollView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    tag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 32,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    accent: {
        color: '#ffffff',
    },
    tabs: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 28,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 40,
    },
    tabActive: {
        backgroundColor: '#ffffff',
    },
    tabText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    serviceCard: {
        padding: 24,
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
        fontSize: 28,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 8,
    },
    serviceSubtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
    priceContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    priceValue: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 32,
    },
    priceLabel: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 4,
    },
    featuresGrid: {
        gap: 12,
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 12,
    },
    featureDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
    },
    featureTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 15,
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: 12,
        lineHeight: 18,
    },
    examplesSection: {
        marginBottom: 28,
    },
    examplesTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    examplesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    exampleItem: {
        flex: 1,
        minWidth: width * 0.4,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 12,
        alignItems: 'center',
    },
    exampleIndustry: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 14,
        marginBottom: 4,
    },
    exampleFeature: {
        fontSize: 11,
        textAlign: 'center',
    },
    serviceButton: {
        marginTop: 8,
    },
});