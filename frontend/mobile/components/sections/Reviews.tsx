// app/components/sections/Reviews.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Review {
    id: number;
    name: string;
    review: string;
    createAt: string;
}

interface ReviewsProps {
    reviews: Review[];
    loading: boolean;
    onReviewClick: () => void;
}

export default function Reviews({ reviews, loading, onReviewClick }: ReviewsProps) {
    // Анимация для карточек
    const cardAnims = useRef(reviews.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        cardAnims.forEach((anim, idx) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 550,
                delay: idx * 80,
                useNativeDriver: true,
            }).start();
        });
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const renderReviewItem = ({ item, index }: { item: Review; index: number }) => {
        const translateY = cardAnims[index]?.interpolate({
            inputRange: [0, 1],
            outputRange: [24, 0],
        }) || 0;

        const opacity = cardAnims[index] || 0;

        return (
            <Animated.View
                style={[
                    styles.reviewCard,
                    {
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardTop}>
                        <LinearGradient
                            colors={['#ffffff', '#cccccc']}
                            style={styles.avatar}
                        >
                            <Text style={styles.avatarText}>
                                {item.name.charAt(0).toUpperCase()}
                            </Text>
                        </LinearGradient>

                        <View style={styles.cardMeta}>
                            <Text style={styles.reviewName}>{item.name}</Text>
                            <Text style={styles.reviewDate}>
                                {formatDate(item.createAt)}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.reviewText}>{item.review}</Text>

                    <View style={styles.cardFooter}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Проверенный клиент</Text>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loaderText}>Загрузка отзывов...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Glow эффект фона */}
            <View style={styles.bgGlow} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View>
                        <View style={styles.tagWrapper}>
                            <Text style={styles.tag}>Отзывы клиентов</Text>
                        </View>
                        <Text style={styles.title}>
                            Что говорят <Text style={styles.accent}>о нас</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Живые отзывы от людей, которые уже воспользовались услугой.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.reviewButton} onPress={onReviewClick}>
                        <Text style={styles.reviewButtonText}>Оставить отзыв</Text>
                    </TouchableOpacity>
                </View>

                {reviews.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Пока нет отзывов. Будьте первым!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={reviews}
                        renderItem={renderReviewItem}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={styles.reviewsGrid}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 60,
        overflow: 'hidden',
    },
    bgGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        opacity: 0.8,
    },
    content: {
        position: 'relative',
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 36,
        flexWrap: 'wrap',
        gap: 20,
        paddingBottom: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.07)',
    },
    tagWrapper: {
        marginBottom: 18,
    },
    tag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 28 : 36,
        textTransform: 'uppercase',
        color: '#ffffff',
        lineHeight: width < 480 ? 32 : 40,
    },
    accent: {
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 14,
        maxWidth: 540,
        color: 'rgba(255,255,255,0.62)',
        lineHeight: 20,
    },
    reviewButton: {
        paddingHorizontal: 24,
        paddingVertical: 13,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
        shadowOpacity: 0.18,
        elevation: 5,
    },
    reviewButtonText: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
    reviewsGrid: {
        gap: 22,
    },
    reviewCard: {
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
        shadowOpacity: 0.22,
        elevation: 5,
    },
    cardGradient: {
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        borderRadius: 24,
        overflow: 'hidden',
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
        shadowOpacity: 0.22,
        elevation: 5,
    },
    avatarText: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 18,
        color: '#000000',
    },
    cardMeta: {
        flex: 1,
    },
    reviewName: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 18,
        color: '#ffffff',
        lineHeight: 20,
    },
    reviewDate: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        color: 'rgba(255,255,255,0.42)',
        marginTop: 4,
    },
    reviewText: {
        fontSize: 15,
        lineHeight: 26,
        color: 'rgba(255,255,255,0.72)',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    badgeText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255,255,255,0.78)',
    },
    loaderContainer: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 12,
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 12,
        color: 'rgba(255,255,255,0.55)',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 80,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.26)',
        borderStyle: 'dashed',
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    emptyText: {
        fontSize: 14,
        fontFamily: 'JetBrainsMono_500Medium',
        color: 'rgba(255,255,255,0.44)',
    },
});