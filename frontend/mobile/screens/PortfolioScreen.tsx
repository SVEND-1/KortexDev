// app/screens/PortfolioScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../utils/api/api';
import type { Project } from '../types/index';

const { width } = Dimensions.get('window');

// Выносим Card в отдельный компонент внутри файла, чтобы избежать конфликтов
const Card: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
    const { isDark } = useTheme();
    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

// Выносим Button в отдельный компонент
const Button: React.FC<{ title: string; onPress: () => void; variant?: 'primary' | 'outline'; style?: any }> = ({
                                                                                                                    title,
                                                                                                                    onPress,
                                                                                                                    variant = 'primary',
                                                                                                                    style
                                                                                                                }) => {
    const { isDark } = useTheme();
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: isPrimary
                        ? (isDark ? '#ffffff' : '#000000')
                        : 'transparent',
                    borderWidth: isPrimary ? 0 : 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.buttonText,
                    {
                        color: isPrimary
                            ? (isDark ? '#000000' : '#ffffff')
                            : (isDark ? '#ffffff' : '#000000'),
                    },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default function PortfolioScreen() {
    const { isDark } = useTheme();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await api.getProjects(50);
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextImage = (projectId: number, totalImages: number) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
        }));
    };

    const handlePrevImage = (projectId: number, totalImages: number) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages,
        }));
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('data:')) return imagePath;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8080/uploads/project/${imagePath}`;
    };

    const getProjectTypeBadge = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('лендинг') || lowerName.includes('landing')) {
            return { label: 'Лендинг', color: '#ffffff' };
        }
        if (lowerName.includes('платформ') || lowerName.includes('platform')) {
            return { label: 'Платформа', color: '#6D5CE8' };
        }
        if (lowerName.includes('мобильн') || lowerName.includes('mobile')) {
            return { label: 'Мобильное', color: '#4dd4e8' };
        }
        return { label: 'Проект', color: '#ffffff' };
    };

    const renderProjectCard = ({ item }: { item: Project }) => {
        const hasImages = item.images && item.images.length > 0;
        const images = item.images || [];
        const currentIndex = currentImageIndex[item.id] || 0;
        const currentImageUrl = hasImages ? getImageUrl(images[currentIndex]) : null;
        const totalImages = images.length;
        const badge = getProjectTypeBadge(item.name);

        return (
            <Card style={styles.projectCard}>
                <View style={styles.projectThumb}>
                    {hasImages && currentImageUrl ? (
                        <>
                            <Image
                                source={{ uri: currentImageUrl }}
                                style={styles.projectImage}
                                resizeMode="cover"
                            />
                            {totalImages > 1 && (
                                <View style={styles.carouselControls}>
                                    <TouchableOpacity
                                        style={[
                                            styles.carouselButton,
                                            { backgroundColor: 'rgba(0,0,0,0.7)' }
                                        ]}
                                        onPress={() => handlePrevImage(item.id, totalImages)}
                                    >
                                        <Text style={styles.carouselArrow}>‹</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.carouselButton,
                                            { backgroundColor: 'rgba(0,0,0,0.7)' }
                                        ]}
                                        onPress={() => handleNextImage(item.id, totalImages)}
                                    >
                                        <Text style={styles.carouselArrow}>›</Text>
                                    </TouchableOpacity>
                                    <View style={styles.counter}>
                                        <Text style={styles.counterText}>
                                            {currentIndex + 1} / {totalImages}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={[
                            styles.placeholder,
                            { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }
                        ]}>
                            <Text style={styles.placeholderIcon}>🖼️</Text>
                            <Text style={[
                                styles.placeholderText,
                                { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }
                            ]}>
                                {item.name}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.thumbLine, { backgroundColor: badge.color }]} />
                </View>

                <View style={styles.projectBody}>
                    <View style={styles.projectTags}>
                        <View style={[styles.tag, { borderColor: badge.color }]}>
                            <Text style={[styles.tagText, { color: badge.color }]}>
                                {badge.label}
                            </Text>
                        </View>
                        {hasImages && (
                            <Text style={[
                                styles.imageCount,
                                { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }
                            ]}>
                                📷 {totalImages} {getImageCountText(totalImages)}
                            </Text>
                        )}
                    </View>
                    <Text style={[styles.projectTitle, { color: isDark ? '#fff' : '#000' }]}>
                        {item.name}
                    </Text>
                    <Text style={[styles.projectDesc, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                        {item.description || 'Современный цифровой продукт под ключ.'}
                    </Text>
                </View>
            </Card>
        );
    };

    const getImageCountText = (count: number): string => {
        if (count === 1) return 'фото';
        if (count < 5) return 'фото';
        return 'фотографий';
    };

    if (loading) {
        return (
            <View style={[styles.centerContainer, { backgroundColor: isDark ? '#000' : '#fff' }]}>
                <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
                <Text style={[styles.loadingText, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                    Загрузка проектов...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: isDark ? '#000000' : '#ffffff' }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.tag, { color: isDark ? '#fff' : '#000' }]}>
                        Наши работы
                    </Text>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
                        Выполненные <Text style={styles.accent}>проекты</Text>
                    </Text>
                </View>

                {projects.length > 0 ? (
                    <FlatList
                        data={projects}
                        renderItem={renderProjectCard}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={styles.projectsGrid}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                            Пока нет реализованных проектов
                        </Text>
                        <Button
                            title="Станьте первым клиентом"
                            onPress={() => console.log('Заказать проект')}
                            variant="outline"
                            style={styles.emptyButton}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

// @ts-ignore
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 12,
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
    projectsGrid: {
        gap: 24,
    },
    projectCard: {
        padding: 0,
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
    carouselControls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    carouselButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselArrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    counter: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    counterText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        color: '#ffffff',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    placeholderText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    thumbLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        width: '0%',
    },
    projectBody: {
        padding: 20,
    },
    projectTags: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    // tag: {
    //     paddingHorizontal: 12,
    //     paddingVertical: 4,
    //     borderWidth: 1,
    //     borderRadius: 4,
    // },
    tagText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    imageCount: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
    },
    projectTitle: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 20,
        marginBottom: 8,
    },
    projectDesc: {
        fontSize: 13,
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 14,
        marginBottom: 20,
    },
    emptyButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    card: {
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});