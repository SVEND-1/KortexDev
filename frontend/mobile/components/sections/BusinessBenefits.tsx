// app/components/sections/BusinessBenefits.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const BusinessBenefits: React.FC = () => {
    const [activeMetric, setActiveMetric] = useState('revenue');
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const metricsData = {
        revenue: {
            title: 'Выручка',
            value: '580 тыс. ₽',
            change: '+480%',
            description: 'Рост выручки в 4.5 раза за первый год',
        },
        conversion: {
            title: 'Конверсия',
            value: '6.2%',
            change: '+416%',
            description: 'Конверсия увеличивается в 3-5 раз',
        },
        traffic: {
            title: 'Трафик',
            value: '2400 пос.',
            change: '+7900%',
            description: 'Рост трафика в 45 раз',
        },
        clients: {
            title: 'Клиенты',
            value: '335 чел.',
            change: '+6600%',
            description: 'Новых клиентов в 30 раз больше',
        },
        averageCheck: {
            title: 'Средний чек',
            value: '7000 ₽',
            change: '+180%',
            description: 'Средний чек растёт на 180%',
        },
        roi: {
            title: 'ROI',
            value: '1050 тыс. ₽',
            change: 'окупаемость',
            description: 'Окупаемость через 4-5 месяцев',
        },
    };

    const metrics = [
        { id: 'revenue', title: 'Выручка' },
        { id: 'conversion', title: 'Конверсия' },
        { id: 'traffic', title: 'Трафик' },
        { id: 'clients', title: 'Клиенты' },
        { id: 'averageCheck', title: 'Средний чек' },
        { id: 'roi', title: 'ROI' },
    ];

    const benefitsList = [
        'Снижение операционных расходов',
        'Бизнес работает 24/7 без выходных',
        'Автоматический сбор контактов клиентов',
        'Email и SMS рассылки для повторных продаж',
        'SEO-продвижение — бесплатный трафик',
        'Удобство для клиентов — онлайн запись 24/7',
        'Прозрачность — статус заказа онлайн',
        'Отзывы и рейтинги — социальное доказательство',
        'Аналитика продаж в реальном времени',
        'Масштабируемость — добавляйте новые функции без ограничений',
    ];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();

        benefitsList.forEach((_, idx) => {
            setTimeout(() => setVisibleItems(prev => [...prev, idx]), idx * 50);
        });
    }, []);

    const currentData = metricsData[activeMetric as keyof typeof metricsData];

    return (
        <ScrollView style={styles.container}>
            <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.tagWrapper}>
                    <Text style={styles.tag}>Почему это выгодно</Text>
                </View>
                <Text style={styles.title}>
                    Чем полезен <Text style={styles.accent}>сайт для бизнеса</Text>
                </Text>
                <Text style={styles.subtitle}>
                    Цифровые инструменты, которые реально увеличивают прибыль и оптимизируют процессы
                </Text>
            </Animated.View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metricToggles}>
                {metrics.map((metric) => (
                    <TouchableOpacity
                        key={metric.id}
                        style={[styles.metricBtn, activeMetric === metric.id && styles.metricBtnActive]}
                        onPress={() => setActiveMetric(metric.id)}
                    >
                        <Text style={[styles.metricBtnText, activeMetric === metric.id && styles.metricBtnTextActive]}>
                            {metric.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.chartSection}>
                <Text style={styles.chartTitle}>
                    {currentData.title}: {currentData.description}
                </Text>

                <View style={styles.chartStats}>
                    <View style={styles.chartStat}>
                        <Text style={styles.chartStatLabel}>Показатель</Text>
                        <Text style={styles.chartStatValue}>{currentData.value}</Text>
                    </View>
                    <View style={styles.chartStat}>
                        <Text style={styles.chartStatLabel}>Рост</Text>
                        <Text style={styles.chartStatValue}>{currentData.change}</Text>
                    </View>
                </View>

                <View style={styles.chartInsight}>
                    <View style={styles.insightCard}>
                        <Text style={styles.insightTitle}>📈 Ключевое открытие</Text>
                        <Text style={styles.insightText}>{currentData.description}</Text>
                    </View>
                    <View style={styles.insightCard}>
                        <Text style={styles.insightTitle}>⏱️ Точка безубыточности</Text>
                        <Text style={styles.insightText}>В среднем через 4-5 месяцев после запуска</Text>
                    </View>
                    <View style={styles.insightCard}>
                        <Text style={styles.insightTitle}>💰 ROI превышает 200%</Text>
                        <Text style={styles.insightText}>При правильной настройке и продвижении</Text>
                    </View>
                </View>
            </View>

            <View style={styles.benefitsListSection}>
                <Text style={styles.benefitsListTitle}>Что вы получаете</Text>
                <View style={styles.benefitsListGrid}>
                    {benefitsList.map((benefit, idx) => (
                        <Animated.View key={idx} style={[styles.benefitsListItem, visibleItems.includes(idx) && styles.animated]}>
                            <View style={styles.benefitsListBullet} />
                            <Text style={styles.benefitsListText}>{benefit}</Text>
                        </Animated.View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000000', paddingHorizontal: 20, paddingVertical: 60 },
    header: { alignItems: 'center', marginBottom: 40 },
    tagWrapper: { marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 16, paddingVertical: 6 },
    tag: { fontFamily: 'JetBrainsMono_500Medium', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.8, color: '#fff' },
    title: { fontFamily: 'Orbitron_700Bold', fontSize: width < 480 ? 28 : 36, textTransform: 'uppercase', textAlign: 'center', color: '#fff', marginBottom: 16 },
    accent: { color: '#fff' },
    subtitle: { fontSize: 14, textAlign: 'center', color: 'rgba(255,255,255,0.55)', lineHeight: 22 },
    metricToggles: { flexDirection: 'row', gap: 10, paddingVertical: 8, marginBottom: 24 },
    metricBtn: { paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 40, backgroundColor: 'transparent' },
    metricBtnActive: { backgroundColor: '#fff', borderColor: '#fff' },
    metricBtnText: { fontFamily: 'JetBrainsMono_500Medium', fontSize: 11, color: 'rgba(255,255,255,0.55)' },
    metricBtnTextActive: { color: '#000' },
    chartSection: { backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 24, padding: 20, marginBottom: 40 },
    chartTitle: { fontFamily: 'Orbitron_600SemiBold', fontSize: 16, color: '#fff', textAlign: 'center', marginBottom: 20, lineHeight: 24 },
    chartStats: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, marginBottom: 20 },
    chartStat: { alignItems: 'center' },
    chartStatLabel: { fontFamily: 'JetBrainsMono_500Medium', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', marginBottom: 8 },
    chartStatValue: { fontFamily: 'Orbitron_700Bold', fontSize: 22, color: '#fff' },
    chartInsight: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    insightCard: { flex: 1, minWidth: width < 600 ? '100%' : 150, padding: 14, backgroundColor: 'rgba(255,255,255,0.02)', borderLeftWidth: 2, borderLeftColor: '#fff', borderRadius: 8 },
    insightTitle: { fontFamily: 'JetBrainsMono_600SemiBold', fontSize: 11, color: '#fff', marginBottom: 6 },
    insightText: { fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 18 },
    benefitsListSection: { marginTop: 20 },
    benefitsListTitle: { fontFamily: 'Orbitron_700Bold', fontSize: 24, textAlign: 'center', color: '#fff', marginBottom: 32 },
    benefitsListGrid: { gap: 12 },
    benefitsListItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 12, opacity: 0, transform: [{ translateX: -20 }] },
    animated: { opacity: 1, transform: [{ translateX: 0 }] },
    benefitsListBullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
    benefitsListText: { fontSize: 13, color: 'rgba(255,255,255,0.7)', flex: 1, lineHeight: 18 },
});

export default BusinessBenefits;