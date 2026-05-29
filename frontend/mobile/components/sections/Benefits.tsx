// app/components/sections/Benefits.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Benefit {
    title: string;
    description: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

export default function Benefits({ benefits }: BenefitsProps) {
    // Анимация для заголовка
    const headerFadeAnim = useRef(new Animated.Value(0)).current;
    const headerSlideAnim = useRef(new Animated.Value(30)).current;

    // Анимации для карточек
    const cardAnims = useRef(benefits.map(() => ({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
    }))).current;

    useEffect(() => {
        // Анимация заголовка
        Animated.parallel([
            Animated.timing(headerFadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(headerSlideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        // Анимация карточек с задержкой
        cardAnims.forEach((anim, idx) => {
            Animated.sequence([
                Animated.delay(idx * 100),
                Animated.parallel([
                    Animated.timing(anim.opacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.spring(anim.translateY, {
                        toValue: 0,
                        tension: 50,
                        friction: 7,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        });
    }, []);

    // Определяем ширину карточки
    const getCardWidth = () => {
        if (width < 768) return '100%';
        if (width < 1024) return '48%';
        return '31%';
    };

    return (
        <View style={styles.container}>
            {/* Заголовок */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        opacity: headerFadeAnim,
                        transform: [{ translateY: headerSlideAnim }],
                    },
                ]}
            >
                <View style={styles.tagWrapper}>
                    <Text style={styles.tag}>Почему это выгодно</Text>
                </View>
                <Text style={styles.title}>
                    Чем полезен <Text style={styles.accent}>сайт для бизнеса</Text>
                </Text>
            </Animated.View>

            {/* Сетка карточек */}
            <View style={styles.grid}>
                {benefits.map((benefit, idx) => (
                    <Animated.View
                        key={idx}
                        style={[
                            { width: getCardWidth(), minWidth: 250 },
                            styles.cardWrapper,
                            {
                                opacity: cardAnims[idx]?.opacity || 1,
                                transform: [{ translateY: cardAnims[idx]?.translateY || 0 }],
                            },
                        ]}
                    >
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{benefit.title}</Text>
                            <Text style={styles.cardDesc}>{benefit.description}</Text>
                        </View>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    tagWrapper: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    tag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        color: '#ffffff',
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 32,
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 38,
        color: '#ffffff',
    },
    accent: {
        color: '#ffffff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
    },
    cardWrapper: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        borderRadius: 24,
        padding: 28,
    },
    cardTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 20,
        marginBottom: 12,
        color: '#ffffff',
    },
    cardDesc: {
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(255,255,255,0.55)',
    },
});