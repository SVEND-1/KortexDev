// app/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Benefits from '../components/sections/Benefits';
import Portfolio from '../components/sections/Portfolio';
import Reviews from '../components/sections/Reviews';
import BusinessBenefits from '../components/sections/BusinessBenefits';
import Contact from '../components/sections/Contact';
import FinalOffer from '../components/sections/FinalOffer';
import { benefitsData } from '../constants/data';
import type { Project, Review, ServiceCard } from '../types/index';
import { api } from '../utils/api/api';

export default function HomeScreen() {
    const { isDark } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

    const [activeService, setActiveService] = useState<'LANDING' | 'PLATFORM' | 'MOBILE'>('LANDING');

    const loadData = async () => {
        try {
            const [projectsData, reviewsData] = await Promise.all([
                api.getProjects(6),
                api.getReviews(6),
            ]);
            setProjects(projectsData);
            setReviews(reviewsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setProjectsLoading(false);
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleRequestPress = () => {
        console.log('Заказать проект');
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

    const currentService: ServiceCard = {
        id: activeService.toLowerCase(),
        title: activeService === 'LANDING' ? 'Лендинг' : activeService === 'PLATFORM' ? 'Веб-платформа' : 'Мобильное приложение',
        subtitle: activeService === 'LANDING'
            ? 'Быстрый запуск, заявки и проверка гипотез'
            : activeService === 'PLATFORM'
                ? 'Сложная логика, личные кабинеты и автоматизация'
                : 'iOS и Android, пуши, авторизация и кабинет',
        price: activeService === 'LANDING' ? 'от 50 000 ₽' : activeService === 'PLATFORM' ? 'от 150 000 ₽' : 'от 200 000 ₽',
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
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: isDark ? '#000000' : '#ffffff' }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={isDark ? '#fff' : '#000'} />
            }
        >
            <Hero onBookDemo={handleRequestPress} />
            <Services
                activeService={activeService}
                onServiceChange={setActiveService}
                currentService={currentService}
                onRequestClick={handleRequestPress}
            />
            <Benefits benefits={benefitsData} />
            <BusinessBenefits />
            <Portfolio
                projects={projects}
                loading={projectsLoading}
                currentImageIndex={currentImageIndex}
                onNextImage={handleNextImage}
                onPrevImage={handlePrevImage}
                onRequestClick={handleRequestPress}
            />
            <Reviews
                reviews={reviews}
                loading={reviewsLoading}
                onReviewClick={() => console.log('Оставить отзыв')}
            />
            <FinalOffer
                onRequestClick={handleRequestPress}
                onContactClick={() => console.log('Связаться')}
            />
            <Contact onRequestClick={handleRequestPress} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});