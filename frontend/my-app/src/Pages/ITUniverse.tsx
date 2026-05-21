import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import type { Project, Review, ServiceCard } from '../types';
import RequestModal from '../components//modals/RequestModal';
import ReviewModal from '../components/modals/ReviewModal';

// Layout
import Navbar from '../components/layout/Navbar';
import MobileMenu from '../components/layout/MobileMenu';
import Footer from '../components/layout/Footer';

// Sections
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Benefits from '../components/sections/Benefits';
import BusinessBenefits from '../components/sections/BusinessBenefits';
import Portfolio from '../components/sections/Portfolio';
import Reviews from '../components/sections/Reviews';
import Contact from '../components/sections/Contact';
import FinalOffer from '../components/sections/FinalOffer';

// UI Components
import CustomCursor from '../components/ui/CustomCursor';
import ScrollProgressBar from '../components/ui/ScrollProgressBar';
import Toast from '../components/ui/Toast';
import BackgroundEffects from '../components/ui/BackgroundEffects';
import OfferBanner from '../components/ui/OfferBanner';

// Hooks
import { useScrollProgress } from '../components/hooks/useScrollProgress';
import { useScrollReveal } from '../components/hooks/useScrollReveal';
import { useTiltEffect } from '../components/hooks/useTiltEffect';

import styles from '../style/ITUniverse.module.scss';

const ITUniverse: React.FC = () => {
    const scrollProgress = useScrollProgress();
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [activeService, setActiveService] = useState<'LANDING' | 'PLATFORM' | 'MOBILE'>('LANDING');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navScrolled, setNavScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

    const services: ServiceCard[] = [
        {
            id: 'landing',
            title: 'ЛЕНДИНГ',
            subtitle: 'Продающий одностраничный сайт',
            price: 'от 50 000 ₽',
            features: [
                { icon: '📄', title: 'Информационные страницы', description: 'Главная, Услуги, О нас, Контакты, Блог' },
                { icon: '🔧', title: 'Админ панель', description: 'Управление контентом, фотогалереей, отзывами и акциями' },
                { icon: '📞', title: 'Ссылки на обратную связь', description: 'Telegram, WhatsApp, VK, форма обратной связи' },
                { icon: '📊', title: 'Аналитика', description: 'Подключение Яндекс.Метрики и Google Analytics' },
                { icon: '🎨', title: 'Уникальный дизайн', description: 'Разработанный под ваш бизнес и целевую аудиторию' },
                { icon: '📱', title: 'Адаптивность', description: 'Корректное отображение на всех устройствах' }
            ],
            examples: [
                { industry: 'Химчистка', specialFeature: 'До/После с реальными фото', icon: '🧼' },
                { industry: 'Ресторан', specialFeature: 'Интерактивное меню с ценами и составом', icon: '🍽️' },
                { industry: 'Автосервис', specialFeature: 'Прайс-лист и онлайн запись', icon: '🔧' },
                { industry: 'Салон красоты', specialFeature: 'Портфолио работ и цены', icon: '💇' },
                { industry: 'Строительство', specialFeature: 'Калькулятор стоимости работ', icon: '🏗️' },
                { industry: 'Юридические услуги', specialFeature: 'База знаний и документы онлайн', icon: '⚖️' }
            ]
        },
        {
            id: 'platform',
            title: 'ВЕБ-ПЛАТФОРМА',
            subtitle: 'Многофункциональный сервис',
            price: 'от 300 000 ₽',
            features: [
                { icon: '💳', title: 'Онлайн оплата', description: 'Интеграция с ЮKassa, Stripe, Tinkoff' },
                { icon: '🛒', title: 'Оформление заказа', description: 'Корзина, оформление, история заказов' },
                { icon: '🚚', title: 'Доставка', description: 'Страница для курьера, трекинг, уведомления' },
                { icon: '📧', title: 'Онлайн оповещение', description: 'Email и Telegram уведомления о статусах' },
                { icon: '📅', title: 'Запись на услугу', description: 'Календарь, управление временем, напоминания' },
                { icon: '📈', title: 'Личный кабинет', description: 'История, бонусы, избранное' },
                { icon: '🔐', title: 'Роли и права', description: 'Админ, менеджер, курьер, клиент' },
                { icon: '🤖', title: 'Функционал под ключ', description: 'Любая сложность по договорённости' }
            ],
            examples: [
                { industry: 'Доставка еды', specialFeature: 'Онлайн оплата, трекинг курьера, Push-уведомления', icon: '🍕' },
                { industry: 'Фитнес клуб', specialFeature: 'Запись на тренировки, абонементы, онлайн-оплата', icon: '💪' },
                { industry: 'Медицина', specialFeature: 'Запись к врачу, телемедицина, результаты анализов', icon: '🏥' },
                { industry: 'Маркетплейс', specialFeature: 'Продавцы и покупатели, рейтинги, отзывы', icon: '🛍️' }
            ]
        },
        {
            id: 'mobile',
            title: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
            subtitle: 'Нативные приложения для iOS и Android',
            price: 'от 200 000 ₽',
            features: [
                { icon: '📱', title: 'Нативная разработка', description: 'iOS (Swift) и Android (Kotlin/Java)' },
                { icon: '⚡', title: 'Высокая производительность', description: 'Плавная работа и оптимизация под устройства' },
                { icon: '🔔', title: 'Push-уведомления', description: 'Мгновенное оповещение пользователей' },
                { icon: '📴', title: 'Офлайн режим', description: 'Работа приложения без интернета' },
                { icon: '🔐', title: 'Биометрия', description: 'Вход по Face ID / Touch ID / отпечатку пальца' },
                { icon: '📷', title: 'Интеграция с камерой', description: 'Сканер QR-кодов, загрузка фото' },
                { icon: '📍', title: 'Геолокация', description: 'Карты, трекинг, маршруты' },
                { icon: '💳', title: 'Apple Pay / Google Pay', description: 'Быстрая и безопасная оплата' }
            ],
            examples: [
                { industry: 'Доставка', specialFeature: 'Приложение для клиентов и курьеров с трекингом', icon: '🚚' },
                { industry: 'Фитнес', specialFeature: 'Тренировки, отслеживание прогресса, чат с тренером', icon: '💪' },
                { industry: 'Медицина', specialFeature: 'Запись, телемедицина, напоминания о приёме', icon: '🏥' },
                { industry: 'Маркетплейс', specialFeature: 'Каталог, корзина, оплата, отзывы', icon: '🛍️' }
            ]
        }
    ];

    const businessBenefits = [
        { icon: '💰', title: 'Увеличение прибыли', description: 'Продажи 24/7 без выходных. Ваш бизнес работает даже когда вы спите, принося стабильный доход.' },
        { icon: '📉', title: 'Снижение расходов', description: 'Меньше ручного труда — меньше ошибок и затрат. Автоматизация сокращает операционные расходы на 30-50%.' },
        { icon: '📈', title: 'Быстрый ROI', description: 'Инвестиции в сайт окупаются за 3-6 месяцев за счёт роста продаж и оптимизации процессов.' },
        { icon: '📋', title: 'Сбор контактов', description: 'База клиентов растёт автоматически. Захват email, телефонов и соцсетей посетителей.' },
        { icon: '📧', title: 'Email и SMS рассылки', description: 'Информируйте клиентов об акциях, новинках и персональных предложениях. Повторные продажи.' },
        { icon: '🔍', title: 'SEO-продвижение', description: 'Привлечение клиентов из поиска Яндекс и Google. Рост органического трафика без рекламного бюджета.' },
        { icon: '🔄', title: 'Ретаргетинг', description: 'Возвращайте посетителей, которые не купили. Показывайте рекламу тем, кто уже интересовался вами.' },
        { icon: '⭐', title: 'Удобство для клиентов', description: 'Онлайн запись 24/7, заказ в один клик, оплата картой — клиенты выбирают тех, кто заботится о их времени.' },
        { icon: '📦', title: 'Прозрачность', description: 'Статус заказа, история покупок, отслеживание доставки — доверие клиентов растёт с каждым шагом.' },
        { icon: '🎁', title: 'Бонусы и лояльность', description: 'Персональные рекомендации, программа лояльности, скидки за отзывы — клиенты возвращаются снова.' },
        { icon: '🗣️', title: 'Отзывы и рейтинги', description: 'Социальное доказательство работает лучше любой рекламы. Собирайте и показывайте отзывы.' },
        { icon: '📊', title: 'Аналитика продаж', description: 'Отслеживайте, откуда приходят клиенты, какие услуги популярны, где теряете прибыль.' },
        { icon: '🔄', title: 'CRM интеграция', description: 'Все заказы и клиенты автоматически попадают в вашу CRM. Ничего не теряется, всё под контролем.' },
        { icon: '📑', title: 'Отчёты в 1 клик', description: 'Продажи, прибыль, популярные товары, эффективность рекламы — любые отчёты формируются мгновенно.' },
        { icon: '👥', title: 'Контроль персонала', description: 'Видите кто взял заказ, сколько времени заняла обработка, уровень удовлетворённости клиентов.' },
        { icon: '⚙️', title: 'Автоматизация процессов', description: 'Автоматическое выставление счетов, отправка чеков, уведомления клиентам — меньше рутины.' },
        { icon: '🚀', title: 'Масштабируемость', description: 'Легко добавляйте новые фичи: интернет-магазин, онлайн запись, интеграции. Сайт растёт вместе с вашим бизнесом.' },
        { icon: '🔗', title: 'Интеграция с 1С и кассами', description: 'Автоматический обмен данными с 1С, эквайринг, маркировка, ЕГАИС — всё работает "из коробки".' }
    ];

    useScrollReveal([projects, reviews]);
    useTiltEffect([projects]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoadingProjects(false);
            }
        };
        loadProjects();
    }, []);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await api.getReviews();
                setReviews(data);
            } catch (error) {
                console.error('Failed to load reviews:', error);
            } finally {
                setLoadingReviews(false);
            }
        };
        loadReviews();
    }, []);

    useEffect(() => {
        document.title = 'IT Universe | Разработка сайтов и мобильных приложений';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Разработка лендингов, веб-платформ и мобильных приложений под ключ.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Разработка лендингов, веб-платформ и мобильных приложений под ключ.';
            document.head.appendChild(meta);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 4500);
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const currentService = services.find(s =>
        s.id === (activeService === 'LANDING' ? 'landing' : activeService === 'PLATFORM' ? 'platform' : 'mobile')
    )!;

    const nextImage = (projectId: number, totalImages: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) + 1) % totalImages
        }));
    };

    const prevImage = (projectId: number, totalImages: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
        }));
    };

    return (
        <div className={styles.container}>
            <ScrollProgressBar progress={scrollProgress} />
            
            <meta name="keywords" content="разработка сайтов, лендинг, веб-платформа, мобильное приложение" />
            <meta property="og:title" content="IT Universe | Разработка сайтов и мобильных приложений" />

            <CustomCursor />

            {successMessage && <Toast message={successMessage} />}

            <Navbar 
                scrolled={navScrolled} 
                onRequestClick={() => setIsRequestModalOpen(true)} 
                onMenuToggle={toggleMobileMenu} 
            />
            
            <MobileMenu 
                isOpen={mobileMenuOpen} 
                onClose={closeMobileMenu} 
                onRequestClick={() => setIsRequestModalOpen(true)} 
            />

            <Hero 
                onRequestClick={() => setIsRequestModalOpen(true)} 
                onConsultationClick={scrollToContact} 
            />

            <OfferBanner onRequestClick={() => setIsRequestModalOpen(true)} />

            <div className={styles.sectionSep}></div>

            <Services 
                activeService={activeService}
                onServiceChange={setActiveService}
                currentService={currentService}
                onRequestClick={() => setIsRequestModalOpen(true)}
            />

            <div className={styles.sectionSep}></div>

            {/* Старая секция Benefits */}
            <Benefits benefits={businessBenefits} />

            <div className={styles.sectionSep}></div>

            {/* Новая секция BusinessBenefits с графиками и сравнениями */}
            <BusinessBenefits onRequestClick={() => setIsRequestModalOpen(true)} />

            <div className={styles.sectionSep}></div>

            <Portfolio 
                projects={projects}
                loading={loadingProjects}
                currentImageIndex={currentImageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
                onRequestClick={() => setIsRequestModalOpen(true)}
            />

            <Reviews 
                reviews={reviews}
                loading={loadingReviews}
                onReviewClick={() => setIsReviewModalOpen(true)}
            />

            <FinalOffer 
                onRequestClick={() => setIsRequestModalOpen(true)}
                onContactClick={scrollToContact}
            />

            <Contact onRequestClick={() => setIsRequestModalOpen(true)} />

            <Footer />

            <RequestModal 
                isOpen={isRequestModalOpen} 
                onClose={() => setIsRequestModalOpen(false)} 
                onSuccess={() => showSuccess('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')} 
            />
            
            <ReviewModal 
                isOpen={isReviewModalOpen} 
                onClose={() => setIsReviewModalOpen(false)} 
                onSuccess={() => { 
                    showSuccess('Спасибо за отзыв!'); 
                    api.getReviews().then(setReviews); 
                }} 
            />
        </div>
    );
};

export default ITUniverse;