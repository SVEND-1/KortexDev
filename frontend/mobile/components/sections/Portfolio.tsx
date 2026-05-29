// app/components/sections/Portfolio.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Project {
    id: number;
    name: string;
    description?: string;
    images: string[];
}

interface PortfolioProps {
    projects: Project[];
    loading: boolean;
    currentImageIndex: { [key: number]: number };
    onNextImage: (projectId: number, totalImages: number) => void;
    onPrevImage: (projectId: number, totalImages: number) => void;
    onRequestClick: () => void;
}

export default function Portfolio({
                                      projects,
                                      loading,
                                      currentImageIndex,
                                      onNextImage,
                                      onPrevImage,
                                      onRequestClick,
                                  }: PortfolioProps) {
    // Анимация появления карточек
    const cardAnims = useRef(projects.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        cardAnims.forEach((anim, idx) => {
            Animated.spring(anim, {
                toValue: 1,
                delay: idx * 100,
                useNativeDriver: true,
                tension: 50,
                friction: 7,
            }).start();
        });
    }, [projects]);

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('data:')) return imagePath;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8080/uploads/project/${imagePath}`;
    };

    const getProjectTypeBadge = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('лендинг') || lowerName.includes('landing'))
            return { label: 'Лендинг', color: '#ffffff', bgColor: 'rgba(255,255,255,0.15)' };
        if (lowerName.includes('платформ') || lowerName.includes('platform'))
            return { label: 'Платформа', color: '#6D5CE8', bgColor: 'rgba(109,92,232,0.15)' };
        if (lowerName.includes('мобильн') || lowerName.includes('mobile'))
            return { label: 'Мобильное', color: '#4dd4e8', bgColor: 'rgba(77,212,232,0.15)' };
        return { label: 'Проект', color: '#ffffff', bgColor: 'rgba(255,255,255,0.15)' };
    };

    const getGradientColor = (name: string) => {
        const colors = [
            ['#3d2fa0', '#5a45cc'],
            ['#1a3a5c', '#2e6fad'],
            ['#1a4a2e', '#2d8a50'],
            ['#4a1a3a', '#8a2d6f'],
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash |= 0;
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const renderProjectCard = ({ item, index }: { item: Project; index: number }) => {
        const hasImages = item.images && item.images.length > 0;
        const images = item.images || [];
        const currentIndexValue = currentImageIndex[item.id] || 0;
        const currentImageUrl = hasImages ? getImageUrl(images[currentIndexValue]) : null;
        const totalImages = images.length;
        const badge = getProjectTypeBadge(item.name);
        const gradientColors = getGradientColor(item.name);

        const scale = cardAnims[index]?.interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
        }) || 1;

        const translateY = cardAnims[index]?.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
        }) || 0;

        return (
            <Animated.View
                style={[
                    styles.projectCard,
                    {
                        opacity: cardAnims[index] || 1,
                        transform: [{ scale }, { translateY }],
                    },
                ]}
            >
                <View style={styles.projectThumb}>
                    {hasImages && currentImageUrl ? (
                        <>
                            <Image
                                source={{ uri: currentImageUrl }}
                                style={styles.projectImage}
                                resizeMode="cover"
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(5,5,7,0.9)']}
                                style={styles.imageOverlay}
                            />
                            {totalImages > 1 && (
                                <View style={styles.carouselControls}>
                                    <TouchableOpacity
                                        style={styles.carouselButton}
                                        onPress={() => onPrevImage(item.id, totalImages)}
                                    >
                                        <Text style={styles.carouselArrow}>‹</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.carouselButton}
                                        onPress={() => onNextImage(item.id, totalImages)}
                                    >
                                        <Text style={styles.carouselArrow}>›</Text>
                                    </TouchableOpacity>
                                    <View style={styles.counter}>
                                        <Text style={styles.counterText}>
                                            {currentIndexValue + 1} / {totalImages}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </>
                    ) : (
                        <LinearGradient
                            colors={gradientColors}
                            style={styles.placeholder}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.placeholderIcon}>🖼️</Text>
                            <Text style={styles.placeholderText}>{item.name}</Text>
                        </LinearGradient>
                    )}
                    <LinearGradient
                        colors={['#ffffff', '#6D5CE8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.thumbLine, { width: '0%' }]}
                    />
                </View>

                <View style={styles.projectBody}>
                    <View style={styles.projectTags}>
                        <View style={[styles.tag, { backgroundColor: badge.bgColor, borderColor: badge.color }]}>
                            <Text style={[styles.tagText, { color: badge.color }]}>{badge.label}</Text>
                        </View>
                        {hasImages && (
                            <View style={styles.imageCountWrapper}>
                                <Text style={styles.imageCount}>📷 {totalImages} {getImageCountText(totalImages)}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.projectTitle}>{item.name}</Text>
                    <Text style={styles.projectDesc}>
                        {item.description || 'Современный цифровой продукт под ключ.'}
                    </Text>
                </View>
            </Animated.View>
        );
    };

    const getImageCountText = (count: number): string => {
        if (count === 1) return 'фото';
        if (count < 5) return 'фото';
        return 'фотографий';
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loaderText}>Загрузка проектов...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.sectionTag}>Наши работы</Text>
                    </View>
                    <Text style={styles.title}>
                        Выполненные <Text style={styles.accent}>проекты</Text>
                    </Text>
                </View>
                <TouchableOpacity style={styles.moreButton} onPress={onRequestClick}>
                    <Text style={styles.moreButtonText}>Хочу такой же →</Text>
                </TouchableOpacity>
            </View>

            {projects.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Пока нет реализованных проектов</Text>
                    <TouchableOpacity style={styles.emptyButton} onPress={onRequestClick}>
                        <Text style={styles.emptyButtonText}>Станьте первым клиентом</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={projects}
                    renderItem={renderProjectCard}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={styles.projectsGrid}
                />
            )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 48,
        flexWrap: 'wrap',
        gap: 20,
    },
    tagWrapper: {
        marginBottom: 16,
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
        alignSelf: 'flex-start',
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 28 : 32,
        textTransform: 'uppercase',
        color: '#ffffff',
    },
    accent: {
        color: '#ffffff',
    },
    moreButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 40,
        backgroundColor: 'transparent',
    },
    moreButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
    projectsGrid: {
        gap: 32,
    },
    projectCard: {
        backgroundColor: 'rgba(255,255,255,0.025)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        borderRadius: 16,
        overflow: 'hidden',
    },
    projectThumb: {
        position: 'relative',
        aspectRatio: 16 / 10,
        overflow: 'hidden',
    },
    projectImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    carouselControls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    carouselButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselArrow: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    counter: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    counterText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 12,
        color: '#ffffff',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderIcon: {
        fontSize: 64,
        opacity: 0.4,
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    thumbLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
    },
    projectBody: {
        padding: 24,
    },
    projectTags: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 6,
    },
    tagText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    imageCountWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 6,
    },
    imageCount: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        color: 'rgba(255,255,255,0.55)',
    },
    projectTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 20 : 24,
        color: '#ffffff',
        marginBottom: 12,
    },
    projectDesc: {
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(255,255,255,0.55)',
    },
    loaderContainer: {
        paddingVertical: 80,
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
    },
    emptyText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 24,
    },
    emptyButton: {
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 40,
    },
    emptyButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
});