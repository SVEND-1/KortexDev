// app/components/sections/Hero.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Animated,
    ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface HeroProps {
    onBookDemo: () => void;
}

export default function Hero({ onBookDemo }: HeroProps) {
    const { isDark } = useTheme();

    // Анимации для появления
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const rightFadeAnim = useRef(new Animated.Value(0)).current;
    const rightSlideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        // Анимация появления левой колонки
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Анимация появления правой колонки
        Animated.parallel([
            Animated.timing(rightFadeAnim, {
                toValue: 1,
                duration: 800,
                delay: 400,
                useNativeDriver: true,
            }),
            Animated.timing(rightSlideAnim, {
                toValue: 0,
                duration: 800,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: '#000000' }]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.heroContainer}>
                {/* Левая колонка — текст */}
                <Animated.View
                    style={[
                        styles.heroLeft,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideUpAnim }],
                        },
                    ]}
                >
                    <View style={styles.eyebrow}>
                        <View style={styles.eyebrowDot} />
                        <Text style={styles.eyebrowText}>KortexDev</Text>
                    </View>

                    <Text style={styles.heroTitle}>
                        Разработка сайтов{' '}
                        <Text style={styles.highlight}>под ключ</Text>
                    </Text>

                    <Text style={styles.heroSubtitle}>
                        Создаём лендинги, веб-платформы и мобильные приложения, которые приносят реальные продажи.
                        Современный дизайн, админ-панель и онлайн-оплата — всё в одном месте.
                    </Text>

                    <TouchableOpacity style={styles.btnPrimary} onPress={onBookDemo} activeOpacity={0.8}>
                        <Text style={styles.btnText}>Заказать проект</Text>
                        <Text style={styles.btnArrow}>→</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Правая колонка — картинка */}
                <Animated.View
                    style={[
                        styles.heroRight,
                        {
                            opacity: rightFadeAnim,
                            transform: [{ translateX: rightSlideAnim }],
                        },
                    ]}
                >
                    <Image
                        source={require('../../assets/hero.webp')}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        minHeight: height,
    },
    heroContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 60,
        flexDirection: width < 900 ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    heroLeft: {
        flex: 1,
        maxWidth: width < 900 ? '100%' : 500,
    },
    heroRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: width < 900 ? '100%' : 200,
    },
    eyebrow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 24,
    },
    eyebrowDot: {
        width: 12,
        height: 12,
        backgroundColor: '#E9B70B',
        borderRadius: 6,
    },
    eyebrowText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#E9B70B',
    },
    heroTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 32 : width < 768 ? 40 : 48,
        lineHeight: width < 480 ? 38 : width < 768 ? 48 : 56,
        textTransform: 'uppercase',
        color: '#ffffff',
        marginBottom: 20,
    },
    highlight: {
        color: '#ffffff',
    },
    heroSubtitle: {
        fontSize: width < 768 ? 14 : 15,
        lineHeight: 24,
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 32,
    },
    btnPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#E9B70B',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 40,
        alignSelf: width < 900 ? 'center' : 'flex-start',
    },
    btnText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#000000',
    },
    btnArrow: {
        fontSize: 14,
        color: '#000000',
    },
    heroImage: {
        width: width < 900 ? width * 0.8 : 400,
        height: width < 900 ? width * 0.6 : 300,
        borderRadius: 24,
    },
});