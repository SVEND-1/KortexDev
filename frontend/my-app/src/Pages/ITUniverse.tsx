import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api/api';
import type { Project, Review, ServiceCard } from '../types';
import RequestModal from '../components/RequestModal';
import ReviewModal from '../components/ReviewModal';
import styles from '../style/ITUniverse.module.scss';

const ITUniverse: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const codeAreaRef = useRef<HTMLDivElement>(null);
    const monitorWrapRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

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

    // Разбиваем текст на буквы для анимации
    const heroTitleWords = ['Создаём', 'цифровые', 'продукты'];

    // Анимированный заголовок с волной
    const AnimatedWaveText = ({ text }: { text: string }) => (
        <span className={styles.textWaveContainer}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={styles.textWaveLetter}
                    style={{ '--i': i } as React.CSSProperties}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );

    // Прогресс скролла
    useEffect(() => {
        const handleScrollProgress = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScrollProgress);
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

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

    // Custom cursor
    useEffect(() => {
        let mx = 0, my = 0;
        let rx = 0, ry = 0;
        let animFrame: number;

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.left = mx + 'px';
                cursorRef.current.style.top = my + 'px';
            }
        };

        const animateRing = () => {
            rx += (mx - rx) * 0.09;
            ry += (my - ry) * 0.09;
            if (ringRef.current) {
                ringRef.current.style.left = rx + 'px';
                ringRef.current.style.top = ry + 'px';
            }
            animFrame = requestAnimationFrame(animateRing);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateRing();

        const interactiveEls = document.querySelectorAll('a, button');
        const onEnter = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px'; }
            if (ringRef.current) { ringRef.current.style.width = '48px'; ringRef.current.style.height = '48px'; ringRef.current.style.borderColor = 'rgba(109,92,232,0.5)'; }
        };
        const onLeave = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '5px'; cursorRef.current.style.height = '5px'; }
            if (ringRef.current) { ringRef.current.style.width = '28px'; ringRef.current.style.height = '28px'; ringRef.current.style.borderColor = 'rgba(255,255,255,0.18)'; }
        };

        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrame);
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    // Code lines in monitor
    useEffect(() => {
        if (!codeAreaRef.current) return;
        const codeLines = [
            "// Разработка сайтов и мобильных приложений",
            "function createLanding(business) {",
            "  return {",
            "    design: 'modern',",
            "    adminPanel: true,",
            "    feedback: ['tg', 'vk', 'whatsapp'],",
            "    specialFeatures: getFeatures(business)",
            "  };",
            "}",
            "class WebPlatform {",
            "  constructor() {",
            "    this.payments = new OnlinePayments();",
            "    this.delivery = new DeliveryTracking();",
            "    this.bookings = new OnlineBooking();",
            "  }",
            "}",
            "class MobileApp {",
            "  constructor() {",
            "    this.ios = new SwiftApp();",
            "    this.android = new KotlinApp();",
            "    this.pushNotifications = new Push();",
            "    this.biometrics = true;",
            "  }",
            "}",
            "// Закажи разработку уже сегодня!",
            "const product = await createDigitalProduct();",
            "console.log('Продукт приносит прибыль 📈');"
        ];
        codeAreaRef.current.innerHTML = '';
        codeLines.forEach((line, i) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = styles.cl;
            lineDiv.style.animationDelay = `${i * 0.10}s`;
            lineDiv.innerHTML = `<span class="${styles.ln}">${String(i + 1).padStart(2, '0')}</span><span class="${styles.lc}">${line}</span>`;
            codeAreaRef.current?.appendChild(lineDiv);
        });
    }, []);

    // Particles
    useEffect(() => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        const colors = ['rgba(109,92,232,0.5)', 'rgba(77,212,232,0.4)', 'rgba(77,232,168,0.4)', 'rgba(232,146,77,0.3)'];
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = styles.particle;
            p.style.cssText = `--x:${Math.random() * 100}%;--y:${Math.random() * 100}%;--s:${(Math.random() * 2 + 1).toFixed(1)}px;--c:${colors[i % 4]};--d:${(Math.random() * 5 + 4).toFixed(1)}s;--dl:${(Math.random() * 10).toFixed(1)}s`;
            particlesContainer.appendChild(p);
        }
    }, []);

    // Scroll reveal — IntersectionObserver для всех анимаций
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add(styles.visible);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        // Наблюдаем за всеми элементами с анимациями
        const animatedElements = document.querySelectorAll(`
            .${styles.reveal}, 
            .${styles.revealScale}, 
            .${styles.revealLeft}, 
            .${styles.revealRight},
            .${styles.revealBlur},
            .${styles.revealFlip},
            .${styles.staggerItem},
            .${styles.staggerScale},
            .${styles.benefitCard}
        `);

        animatedElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [projects, reviews]);

    // Stagger animation for benefit cards on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const siblings = Array.from(el.parentElement?.children || []);
                        const index = siblings.indexOf(el);
                        el.style.transitionDelay = `${Math.min(index * 0.05, 0.6)}s`;
                        el.classList.add(styles.visible);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );

        document.querySelectorAll(`.${styles.benefitCard}`).forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // 3D Tilt effect on project cards
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.projectCard}`);

        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const card = mouseEvent.currentTarget as HTMLElement;
            const rect = card.getBoundingClientRect();
            const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
            const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);

            const tiltX = ((mouseEvent.clientY - rect.top) / rect.height - 0.5) * -8;
            const tiltY = ((mouseEvent.clientX - rect.left) / rect.width - 0.5) * 8;
            card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        };

        const handleMouseLeave = (e: Event) => {
            const card = e.currentTarget as HTMLElement;
            card.style.transform = '';
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [projects]);

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

    const getServiceIcon = () => {
        if (activeService === 'LANDING') return '📄';
        if (activeService === 'PLATFORM') return '⚙️';
        return '📱';
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('data:')) return imagePath;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8080/uploads/project/${imagePath}`;
    };

    const getProjectType = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('лендинг') || lowerName.includes('landing')) return 'LANDING';
        if (lowerName.includes('платформ') || lowerName.includes('platform')) return 'PLATFORM';
        if (lowerName.includes('мобильн') || lowerName.includes('mobile')) return 'MOBILE';
        return 'LANDING';
    };

    const getProjectTypeIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('лендинг') || lowerName.includes('landing')) return '📄';
        if (lowerName.includes('платформ') || lowerName.includes('platform')) return '⚙️';
        if (lowerName.includes('мобильн') || lowerName.includes('mobile')) return '📱';
        return '🌐';
    };

    const getProjectTypeLabel = (type: string) => {
        switch (type) {
            case 'LANDING': return 'Лендинг';
            case 'PLATFORM': return 'Платформа';
            case 'MOBILE': return 'Мобильное';
            default: return 'Проект';
        }
    };

    const getProjectTypeBadgeClass = (type: string) => {
        switch (type) {
            case 'LANDING': return styles.landingBadge;
            case 'PLATFORM': return styles.platformBadge;
            case 'MOBILE': return styles.mobileBadge;
            default: return styles.landingBadge;
        }
    };

    const getGradientColor = (name: string) => {
        const colors = [
            'linear-gradient(135deg, #3d2fa0 0%, #5a45cc 100%)',
            'linear-gradient(135deg, #1a3a5c 0%, #2e6fad 100%)',
            'linear-gradient(135deg, #1a4a2e 0%, #2d8a50 100%)',
            'linear-gradient(135deg, #4a1a3a 0%, #8a2d6f 100%)',
            'linear-gradient(135deg, #3a2a10 0%, #8a6a25 100%)',
            'linear-gradient(135deg, #2a1a4a 0%, #5a3d8f 100%)',
            'linear-gradient(135deg, #0a3040 0%, #1a6080 100%)',
            'linear-gradient(135deg, #3a1020 0%, #7a2040 100%)',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash |= 0;
        }
        return colors[Math.abs(hash) % colors.length];
    };

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

    const marqueeReviews = reviews.length > 0 ? [...reviews, ...reviews] : [];

    return (
        <div className={styles.container}>
            {/* Прогресс-бар скролла */}
            <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }}></div>

            <meta name="keywords" content="разработка сайтов, лендинг, веб-платформа, мобильное приложение" />
            <meta property="og:title" content="IT Universe | Разработка сайтов и мобильных приложений" />

            <div id="cursor" ref={cursorRef} className={styles.cursor}></div>
            <div id="cursor-ring" ref={ringRef} className={styles.cursorRing}></div>
            <div className={styles.gridBg}></div>
            <div className={styles.gridLines}></div>
            <div className={styles.particles} id="particles"></div>

            {successMessage && <div className={styles.toast}>{successMessage}</div>}

            {/* NAV */}
            <nav className={`${styles.nav} ${navScrolled ? styles.scrolled : ''}`}>
                <div className={styles.navLogo}>IT<span>.</span>UNIVERSE</div>
                <div className={styles.navLinks}>
                    <a href="#services" className={styles.hoverScale}>Услуги</a>
                    <a href="#benefits" className={styles.hoverScale}>Преимущества</a>
                    <a href="#portfolio" className={styles.hoverScale}>Проекты</a>
                    <a href="#reviews" className={styles.hoverScale}>Отзывы</a>
                    <a href="#contact" className={styles.hoverScale}>Контакты</a>
                </div>
                <button className={`${styles.navCta} ${styles.glowPulse}`} onClick={() => setIsRequestModalOpen(true)}>
                    Заказать проект
                </button>
                <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
                    <span></span><span></span><span></span>
                </div>
            </nav>

            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                <a href="#services" onClick={closeMobileMenu}>Услуги</a>
                <a href="#benefits" onClick={closeMobileMenu}>Преимущества</a>
                <a href="#portfolio" onClick={closeMobileMenu}>Проекты</a>
                <a href="#reviews" onClick={closeMobileMenu}>Отзывы</a>
                <a href="#contact" onClick={closeMobileMenu}>Контакты</a>
                <button className={`${styles.btn} ${styles.btnP} ${styles.mobileCta}`} onClick={() => { closeMobileMenu(); setIsRequestModalOpen(true); }}>
                    Заказать проект
                </button>
            </div>
            <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.open : ''}`} onClick={closeMobileMenu}></div>

            {/* HERO */}
            <section id="hero" className={styles.hero}>
                <div className={styles.monitorWrap} ref={monitorWrapRef}>
                    <div className={`${styles.monitor} ${styles.cardRaise}`}>
                        <div className={styles.monitorBar}>
                            <div className={`${styles.dot} ${styles.r}`}></div>
                            <div className={`${styles.dot} ${styles.y}`}></div>
                            <div className={`${styles.dot} ${styles.g}`}></div>
                            <span className={styles.tab}>IT Universe — Ваш цифровой продукт</span>
                        </div>
                        <div className={styles.codeArea} ref={codeAreaRef}></div>
                    </div>
                    <div className={styles.monitorNeck}></div>
                    <div className={styles.monitorFoot}></div>
                    <div className={styles.monitorGlowBase}></div>

                    <div className={styles.devices}>
                        <div className={`${styles.devItem} ${styles.hoverRotate}`} style={{ top: '15%', right: '3%', '--fd': '7s', '--fdelay': '0s', '--fx': '8px', '--fy': '-14px', '--rot': '-6deg', '--rot2': '2deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '50px', '--dh': '50px', '--dfs': '22px' } as React.CSSProperties}>🌐</div>
                            <div className={styles.devLabel}>Landing</div>
                        </div>
                        <div className={`${styles.devItem} ${styles.hoverRotateNeg}`} style={{ top: '55%', right: '-4%', '--fd': '5.5s', '--fdelay': '1s', '--fx': '-5px', '--fy': '-10px', '--rot': '8deg', '--rot2': '-3deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '46px', '--dh': '46px', '--dfs': '20px' } as React.CSSProperties}>📱</div>
                            <div className={styles.devLabel}>Mobile</div>
                        </div>
                        <div className={`${styles.devItem} ${styles.hoverRotate}`} style={{ top: '72%', left: '5%', '--fd': '8s', '--fdelay': '2s', '--fx': '10px', '--fy': '-8px', '--rot': '4deg', '--rot2': '-2deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '46px', '--dh': '46px', '--dfs': '20px' } as React.CSSProperties}>⚙️</div>
                            <div className={styles.devLabel}>Platform</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroText} ref={heroTextRef}>
                    <div className={`${styles.badge} ${styles.pulse}`}>Разработка сайтов и приложений</div>
                    <h1 className={styles.heroTitle}>
                        {heroTitleWords.map((word, wordIdx) => (
                            <span key={wordIdx} className={styles.htLine}>
                                <AnimatedWaveText text={word} />
                            </span>
                        ))}
                    </h1>
                    <p className={`${styles.heroDesc} ${styles.revealFast}`}>
                        Лендинги, веб-платформы и мобильные приложения под ключ.
                        Индивидуальный дизайн, админ-панель, онлайн оплата и не только.
                        Продукт, который работает на ваш бизнес 24/7.
                    </p>
                    <div className={styles.ctaRow}>
                        <button className={`${styles.btn} ${styles.btnP} ${styles.hoverScaleLg}`} onClick={() => setIsRequestModalOpen(true)}>
                            Заказать разработку →
                        </button>
                        <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`} onClick={scrollToContact}>
                            Бесплатная консультация
                        </button>
                    </div>
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={`${styles.snum} ${styles.textGradientShift}`}>50+</span>
                            <span className={styles.slabel}>Проектов</span>
                        </div>
                        <div className={styles.sdiv}></div>
                        <div className={styles.stat}>
                            <span className={`${styles.snum} ${styles.textGradientShift}`}>100%</span>
                            <span className={styles.slabel}>Довольных клиентов</span>
                        </div>
                        <div className={styles.sdiv}></div>
                        <div className={styles.stat}>
                            <span className={`${styles.snum} ${styles.textGradientShift}`}>24/7</span>
                            <span className={styles.slabel}>Поддержка</span>
                        </div>
                    </div>
                </div>

                <div className={styles.scrollHint}>
                    <span>Scroll</span>
                    <div className={styles.scrollArrow}></div>
                </div>
            </section>

            {/* OFFER BANNER */}
            <div className={`${styles.offerBanner} ${styles.reveal}`}>
                <div className={styles.offerContent}>
                    <span className={styles.offerIcon}>✦</span>
                    <p className={styles.offerText}>
                        Закажите разработку сегодня и получите <strong>бесплатное SEO-продвижение</strong> на первый месяц
                    </p>
                    <button className={`${styles.btn} ${styles.btnP} ${styles.offerBtn} ${styles.hoverScale}`} onClick={() => setIsRequestModalOpen(true)}>
                        Заказать
                    </button>
                </div>
            </div>

            <div className={styles.sectionSep}></div>

            {/* SERVICES */}
            <section id="services" className={styles.services}>
                <div className={`${styles.servicesHeader} ${styles.revealBlur}`}>
                    <span className={styles.sectionTag}>Наши услуги</span>
                    <h2 className={styles.sectionTitle}>
                        Что мы <span className={styles.accent}>предлагаем</span>
                    </h2>
                </div>

                <div className={`${styles.serviceToggle} ${styles.revealLeft}`}>
                    {(['LANDING', 'PLATFORM', 'MOBILE'] as const).map(type => (
                        <button
                            key={type}
                            className={`${styles.serviceToggleBtn} ${activeService === type ? styles.active : ''} ${styles.hoverScale}`}
                            onClick={() => setActiveService(type)}
                        >
                            {type === 'LANDING' ? '📄 Лендинг' : type === 'PLATFORM' ? '⚙️ Веб-платформа' : '📱 Мобильное'}
                        </button>
                    ))}
                </div>

                <div className={`${styles.serviceCard} ${styles.revealFlip} ${styles.cardRaise}`}>
                    <div className={styles.serviceHeader}>
                        <div>
                            <div className={`${styles.serviceIconLarge} ${styles.hoverRotate}`}>{getServiceIcon()}</div>
                            <h3 className={styles.serviceTitle}>{currentService.title}</h3>
                            <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                        </div>
                        {currentService.price && (
                            <div className={styles.servicePrice}>
                                <span className={`${styles.priceValue} ${styles.textGradientShift}`}>{currentService.price}</span>
                                <span className={styles.priceLabel}>Стоимость разработки</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.serviceFeatures}>
                        {currentService.features.map((feature, idx) => (
                            <div key={idx} className={`${styles.featureItem} ${styles.staggerItem}`} style={{ '--i': idx } as React.CSSProperties}>
                                <div className={`${styles.featureIcon} ${styles.hoverRotate}`}>{feature.icon}</div>
                                <div className={styles.featureContent}>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.serviceExamples}>
                        <h4>Примеры для бизнеса</h4>
                        <div className={styles.examplesGrid}>
                            {currentService.examples.map((example, idx) => (
                                <div key={idx} className={`${styles.exampleItem} ${styles.staggerScale}`} style={{ '--i': idx } as React.CSSProperties}>
                                    <span className={`${styles.exampleIcon} ${styles.hoverRotate}`}>{example.icon}</span>
                                    <div>
                                        <strong>{example.industry}</strong>
                                        <span className={styles.exampleFeature}>{example.specialFeature}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={`${styles.btn} ${styles.btnP} ${styles.serviceBtn} ${styles.glowPulse}`} onClick={() => setIsRequestModalOpen(true)}>
                        Рассчитать стоимость →
                    </button>
                </div>
            </section>

            <div className={styles.sectionSep}></div>

            {/* BENEFITS */}
            <section id="benefits" className={styles.benefits}>
                <div className={`${styles.benefitsHeader} ${styles.revealBlur}`}>
                    <span className={styles.sectionTag}>Почему это выгодно</span>
                    <h2 className={styles.sectionTitle}>
                        Чем полезен <span className={styles.accent}>сайт для бизнеса</span>
                    </h2>
                </div>

                <div className={styles.benefitsGrid}>
                    {businessBenefits.map((benefit, idx) => (
                        <div key={idx} className={`${styles.benefitCard} ${styles.cardRaise}`}>
                            <div className={`${styles.benefitIcon} ${styles.hoverRotate}`}>{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className={styles.sectionSep}></div>

            {/* PORTFOLIO */}
            <section id="portfolio" className={styles.portfolio}>
                <div className={`${styles.portfolioHeader} ${styles.revealRight}`}>
                    <div>
                        <span className={styles.sectionTag}>Наши работы</span>
                        <h2 className={styles.sectionTitle}>
                            Выполненные <span className={styles.accent}>проекты</span>
                        </h2>
                    </div>
                    <button className={`${styles.portfolioMore} ${styles.hoverScale}`} onClick={() => setIsRequestModalOpen(true)}>
                        Хочу такой же →
                    </button>
                </div>

                {loadingProjects ? (
                    <div className={styles.loader}>Загрузка проектов...</div>
                ) : projects.length > 0 ? (
                    <div className={styles.projectsGrid}>
                        {projects.map((project, projectIdx) => {
                            const projectType = getProjectType(project.name);
                            const projectTypeLabel = getProjectTypeLabel(projectType);
                            const hasImages = project.images && project.images.length > 0;
                            const images = project.images || [];
                            const currentIndex = currentImageIndex[project.id] || 0;
                            const currentImageUrl = hasImages ? getImageUrl(images[currentIndex]) : null;
                            const totalImages = images.length;
                            const isFeatured = projectIdx === 0;

                            return (
                                <div key={project.id} className={`${styles.projectCard} ${isFeatured ? styles.featured : ''} ${styles.revealScale}`}>
                                    <div className={styles.projectThumb}>
                                        {hasImages && currentImageUrl ? (
                                            <>
                                                <img src={currentImageUrl} alt={project.name} className={styles.projectImage} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                <div className={styles.projectImageOverlay}></div>
                                                {totalImages > 1 && (
                                                    <>
                                                        <button className={`${styles.projectCarouselPrev} ${styles.hoverScale}`} onClick={(e) => { e.stopPropagation(); prevImage(project.id, totalImages); }}>‹</button>
                                                        <button className={`${styles.projectCarouselNext} ${styles.hoverScale}`} onClick={(e) => { e.stopPropagation(); nextImage(project.id, totalImages); }}>›</button>
                                                        <div className={styles.projectCarouselCounter}>{currentIndex + 1} / {totalImages}</div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <div className={styles.projectPlaceholder} style={{ background: getGradientColor(project.name), width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                                                <span style={{ fontSize: '40px', opacity: 0.6 }}>{getProjectTypeIcon(project.name)}</span>
                                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '-0.01em' }}>{project.name}</span>
                                            </div>
                                        )}
                                        <div className={styles.thumbLine}></div>
                                    </div>
                                    <div className={styles.projectBody}>
                                        <div className={styles.projectTags}>
                                            <span className={`${styles.tag} ${getProjectTypeBadgeClass(projectType)}`}>{projectTypeLabel}</span>
                                            {hasImages && <span className={styles.imageCount}>📷 {totalImages} {totalImages === 1 ? 'фото' : totalImages < 5 ? 'фото' : 'фотографий'}</span>}
                                        </div>
                                        <div className={styles.projectTitle}>{project.name}</div>
                                        <p className={styles.projectDesc}>{project.description || 'Современный цифровой продукт под ключ.'}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.emptyProjectsMessage}>
                        <p>Пока нет реализованных проектов</p>
                        <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`} onClick={() => setIsRequestModalOpen(true)}>
                            Станьте первым клиентом
                        </button>
                    </div>
                )}
            </section>

            {/* REVIEWS */}
            <section id="reviews" className={styles.reviews}>
                <div className={`${styles.reviewsHeader} ${styles.revealLeft}`}>
                    <div>
                        <span className={styles.sectionTag}>Отзывы клиентов</span>
                        <h2 className={styles.sectionTitle}>
                            Что говорят <span className={styles.accent}>о нас</span>
                        </h2>
                    </div>
                    <button className={`${styles.btn} ${styles.btnG} ${styles.reviewBtn} ${styles.glowPulse}`} onClick={() => setIsReviewModalOpen(true)}>
                        Оставить отзыв
                    </button>
                </div>

                {loadingReviews ? (
                    <div className={styles.loader}>Загрузка отзывов...</div>
                ) : reviews.length === 0 ? (
                    <div className={styles.emptyState}>Пока нет отзывов. Будьте первым!</div>
                ) : reviews.length < 3 ? (
                    <div className={styles.reviewsGrid}>
                        {reviews.map((review) => (
                            <div key={review.id} className={`${styles.reviewCard} ${styles.cardRaise}`}>
                                <div className={styles.reviewHeader}>
                                    <div className={`${styles.reviewAvatar} ${styles.hoverRotate}`}>{review.name.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <div className={styles.reviewName}>{review.name}</div>
                                        <div className={styles.reviewDate}>{new Date(review.createAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                    </div>
                                </div>
                                <div className={styles.reviewStars}>{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
                                <p className={styles.reviewText}>{review.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.reviewsMarqueeWrap}>
                        <div className={styles.reviewsMarquee}>
                            {marqueeReviews.map((review, idx) => (
                                <div key={`${review.id}-${idx}`} className={`${styles.reviewCard} ${styles.cardRaise}`}>
                                    <div className={styles.reviewHeader}>
                                        <div className={`${styles.reviewAvatar} ${styles.hoverRotate}`}>{review.name.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <div className={styles.reviewName}>{review.name}</div>
                                            <div className={styles.reviewDate}>{new Date(review.createAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        </div>
                                    </div>
                                    <div className={styles.reviewStars}>{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
                                    <p className={styles.reviewText}>{review.review}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* FINAL OFFER */}
            <div className={`${styles.finalOffer} ${styles.revealBlur}`}>
                <div className={styles.finalOfferContent}>
                    <h3 className={styles.textGradientShift}>Готовы начать?</h3>
                    <p>Создадим цифровой продукт, который будет приносить вам клиентов каждый день</p>
                    <div className={styles.finalOfferButtons}>
                        <button className={`${styles.btn} ${styles.btnP} ${styles.hoverScaleLg} ${styles.glowPulse}`} onClick={() => setIsRequestModalOpen(true)}>
                            Заказать разработку
                        </button>
                        <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`} onClick={scrollToContact}>
                            Связаться с нами
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTACT */}
            <section id="contact" className={styles.contact}>
                <span className={`${styles.sectionTag} ${styles.revealRight}`}>Контакты</span>
                <h2 className={`${styles.contactTitle} ${styles.revealLeft}`}>
                    <span style={{ color: 'var(--text)' }}>Давайте</span><br />
                    <span className={styles.gradientText}>обсудим проект</span>
                </h2>
                <p className={`${styles.contactSub} ${styles.revealScale}`}>
                    Оставьте заявку — мы свяжемся с вами в течение 15 минут
                </p>
                <div className={`${styles.contactRow} ${styles.revealBlur}`}>
                    <button className={`${styles.btn} ${styles.btnP} ${styles.hoverScaleLg}`} onClick={() => setIsRequestModalOpen(true)}>
                        Оставить заявку →
                    </button>
                    <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`}>hello@ituniverse.dev</button>
                </div>
                <div className={`${styles.contactSocials} ${styles.revealFlip}`}>
                    <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>Telegram</a>
                    <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>WhatsApp</a>
                    <a href="#" className={`${styles.socialLink} ${styles.hoverScale}`}>VK</a>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerLogo}>IT.UNIVERSE</div>
                <div className={styles.footerText}>© 2025 IT Universe — Разработка сайтов и мобильных приложений под ключ</div>
            </footer>

            <RequestModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} onSuccess={() => showSuccess('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')} />
            <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} onSuccess={() => { showSuccess('Спасибо за отзыв!'); api.getReviews().then(setReviews); }} />
        </div>
    );
};

export default ITUniverse;