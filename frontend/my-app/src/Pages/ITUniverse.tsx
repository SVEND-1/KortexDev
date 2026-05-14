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
                { icon: '📅', title: 'Запись на процедуру', description: 'Календарь, управление временем, напоминания' },
                { icon: '📈', title: 'Личный кабинет', description: 'История, бонусы, избранное' },
                { icon: '🔐', title: 'Роли и права', description: 'Админ, менеджер, курьер, клиент' },
                { icon: '🤖', title: 'API интеграции', description: '1С, CRM, IP-телефония, чат-боты' }
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
                { icon: '📷', title: 'Интеграция с камерой', description: 'Сканер QR-кодов, загрузка фото, AR-функции' },
                { icon: '📍', title: 'Геолокация', description: 'Карты, трекинг, маршруты' },
                { icon: '💳', title: 'Apple Pay / Google Pay', description: 'Быстрая и безопасная оплата' },
                { icon: '📊', title: 'Аналитика', description: 'Firebase Analytics, Crashlytics' },
                { icon: '🔄', title: 'Автообновление', description: 'Автоматические обновления через магазины' }
            ],
            examples: [
                { industry: 'Доставка', specialFeature: 'Приложение для клиентов и курьеров с трекингом', icon: '🚚' },
                { industry: 'Фитнес', specialFeature: 'Тренировки, отслеживание прогресса, чат с тренером', icon: '💪' },
                { industry: 'Медицина', specialFeature: 'Запись, телемедицина, напоминания о приёме', icon: '🏥' },
                { industry: 'Маркетплейс', specialFeature: 'Каталог, корзина, оплата, отзывы', icon: '🛍️' },
                { industry: 'Образование', specialFeature: 'Курсы, видеоуроки, тесты, сертификаты', icon: '📚' },
                { industry: 'Банкинг', specialFeature: 'Платежи, переводы, история операций', icon: '🏦' }
            ]
        }
    ];

    const businessBenefits = [
        { icon: '🎯', title: 'Увеличение продаж', description: 'Привлечение новых клиентов и повышение среднего чека' },
        { icon: '⏰', title: 'Экономия времени', description: 'Автоматизация рутинных задач и процессов' },
        { icon: '🏆', title: 'Конкурентное преимущество', description: 'Выделение среди конкурентов в вашей нише' },
        { icon: '📊', title: 'Аналитика и KPI', description: 'Отслеживание эффективности бизнеса' },
        { icon: '🔄', title: 'Круглосуточная работа', description: 'Сайт работает 24/7, даже когда вы отдыхаете' },
        { icon: '🌍', title: 'Расширение географии', description: 'Выход на новые рынки и регионы' },
        { icon: '💬', title: 'Обратная связь', description: 'Быстрая коммуникация с клиентами' },
        { icon: '📈', title: 'Рост доверия', description: 'Профессиональный сайт повышает доверие к бренду' },
        { icon: '📱', title: 'Мобильный охват', description: 'Доступ к аудитории со смартфонов в любом месте' },
        { icon: '🔥', title: 'Лояльность', description: 'Push-уведомления и персонализация повышают лояльность' }
    ];

    const portfolioProjects = [
        { name: 'EcoClean Химчистка', type: 'LANDING', description: 'Сайт с галереей до/после, онлайн запись и прайс-лист', highlight: 'До/После' },
        { name: 'Итальянский дворик', type: 'LANDING', description: 'Ресторан с интерактивным меню, бронированием столов', highlight: 'Меню' },
        { name: 'FastFood Delivery', type: 'PLATFORM', description: 'Платформа доставки с трекингом курьеров и онлайн оплатой', highlight: 'Оплата + Трекинг' },
        { name: 'FitZone', type: 'PLATFORM', description: 'Фитнес клуб с записью на тренировки и абонементами', highlight: 'Запись онлайн' },
        { name: 'АвтоМастер', type: 'LANDING', description: 'Автосервис с калькулятором ремонта и онлайн записью', highlight: 'Калькулятор' },
        { name: 'FoodApp', type: 'MOBILE', description: 'Мобильное приложение для доставки еды с трекингом', highlight: 'iOS + Android' },
        { name: 'MedHelper', type: 'MOBILE', description: 'Медицинское приложение с записью и телемедициной', highlight: 'Запись онлайн' },
        { name: 'SportTrack', type: 'MOBILE', description: 'Фитнес-трекер с тренировками и прогрессом', highlight: 'Трекинг' }
    ];

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
            metaDescription.setAttribute('content', 'Разработка лендингов, веб-платформ и мобильных приложений под ключ. Создаем цифровые продукты, которые приносят прибыль.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Разработка лендингов, веб-платформ и мобильных приложений под ключ. Создаем цифровые продукты, которые приносят прибыль.';
            document.head.appendChild(meta);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            rx += (mx - rx) * 0.10;
            ry += (my - ry) * 0.10;
            if (ringRef.current) {
                ringRef.current.style.left = rx + 'px';
                ringRef.current.style.top = ry + 'px';
            }
            animFrame = requestAnimationFrame(animateRing);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateRing();

        const interactiveElements = document.querySelectorAll('a, button');
        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.width = '12px';
                cursorRef.current.style.height = '12px';
            }
            if (ringRef.current) {
                ringRef.current.style.width = '52px';
                ringRef.current.style.height = '52px';
                ringRef.current.style.opacity = '0.5';
            }
        };
        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.width = '6px';
                cursorRef.current.style.height = '6px';
            }
            if (ringRef.current) {
                ringRef.current.style.width = '32px';
                ringRef.current.style.height = '32px';
                ringRef.current.style.opacity = '1';
            }
        };
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrame);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

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
            "  constructor(platform) {",
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

    useEffect(() => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        const colors = ['rgba(124,106,252,0.5)', 'rgba(90,212,239,0.4)', 'rgba(90,239,176,0.4)'];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = styles.particle;
            p.style.cssText = `--x:${Math.random() * 100}%;--y:${Math.random() * 100}%;--s:${Math.random() * 2.5 + 1}px;--c:${colors[i % 3]};--d:${(Math.random() * 4 + 4).toFixed(1)}s;--dl:${(Math.random() * 8).toFixed(1)}s`;
            particlesContainer.appendChild(p);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        const revealElements = document.querySelectorAll(`.${styles.reveal}, .${styles.revealLeft}, .${styles.revealRight}`);
        revealElements.forEach((el, i) => {
            (el as HTMLElement).style.transitionDelay = `${(i % 6) * 0.07}s`;
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mx = (e.clientX / window.innerWidth - 0.5) * 20;
            const my = (e.clientY / window.innerHeight - 0.5) * 20;
            if (monitorWrapRef.current) {
                monitorWrapRef.current.style.transform = `translateY(0) translate(${-mx * 0.35}px, ${-my * 0.35}px)`;
            }
            if (heroTextRef.current) {
                heroTextRef.current.style.transform = `translate(${mx * 0.2}px, ${my * 0.2}px)`;
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 4000);
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

    // Замените существующую функцию getImageUrl на эту:
    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('data:')) return imagePath;

        // Если в БД старые данные с полным путем
        if (imagePath.includes('uploads/project/')) {
            return `http://localhost:8080/${imagePath}`;
        }

        // Новый формат - только имя файла
        return `http://localhost:8080/uploads/project/${imagePath}`;
    };

    const getGradientColor = (name: string) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
            'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash |= 0;
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className={styles.container}>
            <meta name="keywords" content="разработка сайтов, лендинг, веб-платформа, мобильное приложение" />
            <meta property="og:title" content="IT Universe | Разработка сайтов и мобильных приложений" />
            <meta property="og:description" content="Разработка лендингов, веб-платформ и мобильных приложений под ключ. Создаем цифровые продукты, которые приносят прибыль." />

            <div id="cursor" ref={cursorRef} className={styles.cursor}></div>
            <div id="cursor-ring" ref={ringRef} className={styles.cursorRing}></div>
            <div className={styles.gridBg}></div>
            <div className={styles.scanline}></div>
            <div className={styles.particles} id="particles"></div>

            {successMessage && (
                <div className={styles.toast}>{successMessage}</div>
            )}

            <nav className={styles.nav} style={{
                background: navScrolled ? 'rgba(8,8,10,0.92)' : 'rgba(8,8,10,0.5)',
                borderBottomColor: navScrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
            }}>
                <div className={styles.navLogo}>
                    IT<span>.</span>UNIVERSE
                </div>
                <div className={styles.navLinks}>
                    <a href="#services">Услуги</a>
                    <a href="#benefits">Преимущества</a>
                    <a href="#portfolio">Проекты</a>
                    <a href="#reviews">Отзывы</a>
                    <a href="#contact">Контакты</a>
                </div>
                <button className={styles.navCta} onClick={() => setIsRequestModalOpen(true)}>
                    Заказать проект
                </button>

                <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                <a href="#services" onClick={closeMobileMenu}>Услуги</a>
                <a href="#benefits" onClick={closeMobileMenu}>Преимущества</a>
                <a href="#portfolio" onClick={closeMobileMenu}>Проекты</a>
                <a href="#reviews" onClick={closeMobileMenu}>Отзывы</a>
                <a href="#contact" onClick={closeMobileMenu}>Контакты</a>
                <button className={`${styles.btn} ${styles.btnP} ${styles.mobileCta}`} onClick={() => {
                    closeMobileMenu();
                    setIsRequestModalOpen(true);
                }}>Заказать проект</button>
            </div>
            <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.open : ''}`} onClick={closeMobileMenu}></div>

            <section id="hero" className={styles.hero}>
                <div className={styles.monitorWrap} ref={monitorWrapRef}>
                    <div className={styles.monitor}>
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
                        <div className={styles.devItem} style={{ top: '15%', right: '5%', '--fd': '7s', '--fdelay': '0s', '--fx': '8px', '--fy': '-14px', '--rot': '-6deg', '--rot2': '2deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '52px', '--dh': '52px', '--dfs': '22px' } as React.CSSProperties}>🌐</div>
                            <div className={styles.devLabel}>Landing</div>
                        </div>
                        <div className={styles.devItem} style={{ top: '55%', right: '-2%', '--fd': '5.5s', '--fdelay': '1s', '--fx': '-5px', '--fy': '-10px', '--rot': '8deg', '--rot2': '-3deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '48px', '--dh': '48px', '--dfs': '20px' } as React.CSSProperties}>📱</div>
                            <div className={styles.devLabel}>Mobile</div>
                        </div>
                        <div className={styles.devItem} style={{ top: '70%', left: '8%', '--fd': '8s', '--fdelay': '2s', '--fx': '10px', '--fy': '-8px', '--rot': '4deg', '--rot2': '-2deg' } as React.CSSProperties}>
                            <div className={styles.devBox} style={{ '--dw': '48px', '--dh': '48px', '--dfs': '20px' } as React.CSSProperties}>⚙️</div>
                            <div className={styles.devLabel}>Platform</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroText} ref={heroTextRef}>
                    <div className={styles.badge}>
                        Разработка сайтов и приложений
                    </div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.htLine}>Создаём</span>
                        <span className={styles.htLine}>цифровые</span>
                        <span className={styles.htLine}>продукты</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        Лендинги, веб-платформы и мобильные приложения под ключ.
                        Индивидуальный дизайн, админ-панель, онлайн оплата и не только.
                        Продукт, который работает на ваш бизнес 24/7.
                    </p>
                    <div className={styles.ctaRow}>
                        <button className={`${styles.btn} ${styles.btnP}`} onClick={() => setIsRequestModalOpen(true)}>
                            Заказать разработку →
                        </button>
                        <button className={`${styles.btn} ${styles.btnG}`} onClick={scrollToContact}>
                            Бесплатная консультация
                        </button>
                    </div>
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={styles.snum}>50+</span>
                            <span className={styles.slabel}>Проектов</span>
                        </div>
                        <div className={styles.sdiv}></div>
                        <div className={styles.stat}>
                            <span className={styles.snum}>100%</span>
                            <span className={styles.slabel}>Довольных клиентов</span>
                        </div>
                        <div className={styles.sdiv}></div>
                        <div className={styles.stat}>
                            <span className={styles.snum}>24/7</span>
                            <span className={styles.slabel}>Поддержка</span>
                        </div>
                    </div>
                </div>

                <div className={styles.scrollHint}>
                    <span>Scroll</span>
                    <div className={styles.scrollArrow}></div>
                </div>
            </section>

            <div className={styles.offerBanner}>
                <div className={styles.offerContent}>
                    <span className={styles.offerIcon}>✦</span>
                    <p className={styles.offerText}>
                        Закажите разработку сегодня и получите <strong>бесплатное SEO-продвижение</strong> на первый месяц
                    </p>
                    <button className={`${styles.btn} ${styles.btnP} ${styles.offerBtn}`} onClick={() => setIsRequestModalOpen(true)}>
                        Заказать
                    </button>
                </div>
            </div>

            <div className={styles.sectionSep}></div>

            <section id="services" className={styles.services}>
                <div className={styles.servicesHeader}>
                    <span className={styles.sectionTag}>Наши услуги</span>
                    <h2 className={styles.sectionTitle}>
                        Что мы <span className={styles.accent}>предлагаем</span>
                    </h2>
                </div>

                <div className={styles.serviceToggle}>
                    {(['LANDING', 'PLATFORM', 'MOBILE'] as const).map(type => (
                        <button
                            key={type}
                            className={`${styles.serviceToggleBtn} ${activeService === type ? styles.active : ''}`}
                            onClick={() => setActiveService(type)}
                        >
                            {type === 'LANDING' ? '📄 Лендинг' : type === 'PLATFORM' ? '⚙️ Веб-платформа' : '📱 Мобильное приложение'}
                        </button>
                    ))}
                </div>

                <div className={styles.serviceCard}>
                    <div className={styles.serviceHeader}>
                        <div>
                            <div className={styles.serviceIconLarge}>{getServiceIcon()}</div>
                            <h3 className={styles.serviceTitle}>{currentService.title}</h3>
                            <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                        </div>
                        {currentService.price && (
                            <div className={styles.servicePrice}>
                                <span className={styles.priceValue}>{currentService.price}</span>
                                <span className={styles.priceLabel}>Стоимость разработки</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.serviceFeatures}>
                        {currentService.features.map((feature, idx) => (
                            <div key={idx} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
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
                                <div key={idx} className={styles.exampleItem}>
                                    <span className={styles.exampleIcon}>{example.icon}</span>
                                    <div>
                                        <strong>{example.industry}</strong>
                                        <span className={styles.exampleFeature}>{example.specialFeature}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={`${styles.btn} ${styles.btnP} ${styles.serviceBtn}`} onClick={() => setIsRequestModalOpen(true)}>
                        Рассчитать стоимость →
                    </button>
                </div>
            </section>

            <div className={styles.sectionSep}></div>

            <div className={styles.offerBannerSecondary}>
                <div className={styles.offerContent}>
                    <div>
                        <p className={styles.offerText}>Не знаете, что вам нужно?</p>
                        <p className={styles.offerSubtext}>Поможем подобрать идеальное решение для вашего бизнеса</p>
                        <button className={`${styles.btn} ${styles.btnG}`} onClick={() => setIsRequestModalOpen(true)}>
                            Получить консультацию
                        </button>
                    </div>
                </div>
            </div>

            <section id="benefits" className={styles.benefits}>
                <div className={styles.benefitsHeader}>
                    <span className={styles.sectionTag}>Почему это работает</span>
                    <h2 className={styles.sectionTitle}>
                        Цифровой продукт <span className={styles.accent}>для бизнеса</span>
                    </h2>
                </div>

                <div className={styles.benefitsGrid}>
                    {businessBenefits.map((benefit, idx) => (
                        <div key={idx} className={`${styles.benefitCard} ${styles.reveal}`}>
                            <div className={styles.benefitIcon}>{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className={styles.sectionSep}></div>

            <section id="portfolio" className={styles.portfolio}>
                <div className={styles.portfolioHeader}>
                    <div>
                        <span className={styles.sectionTag}>Наши работы</span>
                        <h2 className={styles.sectionTitle}>
                            Выполненные <span className={styles.accent}>проекты</span>
                        </h2>
                    </div>
                    <button className={styles.portfolioMore} onClick={() => setIsRequestModalOpen(true)}>
                        Хочу такой же →
                    </button>
                </div>

                <div className={styles.portfolioGrid}>
                    {portfolioProjects.map((project, idx) => (
                        <div key={idx} className={`${styles.portfolioCard} ${styles.reveal}`}>
                            <div className={styles.portfolioType}>
                                <span className={`${styles.typeBadge}
                                  ${project.type === 'LANDING' ? styles.landingBadge :
                                    project.type === 'PLATFORM' ? styles.platformBadge : styles.mobileBadge}`}>
                                    {project.type === 'LANDING' ? 'Лендинг' : project.type === 'PLATFORM' ? 'Платформа' : 'Мобильное'}
                                </span>
                            </div>
                            <h3 className={styles.portfolioName}>{project.name}</h3>
                            <p className={styles.portfolioDesc}>{project.description}</p>
                            <div className={styles.portfolioHighlight}>
                                <span className={styles.highlightIcon}>✦</span>
                                <span>{project.highlight}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {!loadingProjects && projects.length > 0 && (
                    <>
                        <h3 className={styles.realProjectsTitle}>Реализованные проекты</h3>
                        <div className={styles.projectsGrid}>
                            {projects.map((project) => {
                                const hasImage = project.images && project.images.length > 0 && project.images[0];
                                const imageUrl = hasImage ? getImageUrl(project.images[0]) : null;

                                return (
                                    <div key={project.id} className={`${styles.projectCard} ${styles.reveal}`}>
                                        <div className={styles.projectThumb}>
                                            <div
                                                className={styles.projectPlaceholder}
                                                style={{
                                                    background: getGradientColor(project.name)
                                                }}
                                            >
                                                <div className={styles.placeholderContent}>
                                                    <span className={styles.placeholderIcon}>
                                                        {project.name?.toLowerCase().includes('лендинг') ? '🌐' :
                                                            project.name?.toLowerCase().includes('платформ') ? '⚙️' : '📱'}
                                                    </span>
                                                    <span className={styles.placeholderText}>{project.name}</span>
                                                </div>
                                            </div>
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={project.name}
                                                    className={styles.projectImage}
                                                    style={{ display: 'none' }}
                                                    onLoad={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'block';
                                                        const parent = (e.target as HTMLImageElement).parentElement;
                                                        const placeholder = parent?.querySelector(`.${styles.projectPlaceholder}`);
                                                        if (placeholder) {
                                                            (placeholder as HTMLElement).style.display = 'none';
                                                        }
                                                    }}
                                                    onError={(e) => {
                                                        console.error('Image failed to load:', imageUrl);
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            <div className={styles.thumbLine}></div>
                                        </div>
                                        <div className={styles.projectBody}>
                                            <div className={styles.projectTags}>
                                                <span className={styles.tag}>
                                                    {project.name?.toLowerCase().includes('лендинг') ? 'Лендинг' :
                                                        project.name?.toLowerCase().includes('платформ') ? 'Платформа' : 'Мобильное приложение'}
                                                </span>
                                            </div>
                                            <div className={styles.projectTitle}>{project.name}</div>
                                            <p className={styles.projectDesc}>
                                                {project.description || 'Современный цифровой продукт под ключ. Разработан с учетом всех требований заказчика.'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {!loadingProjects && projects.length === 0 && (
                    <div className={styles.emptyProjectsMessage}>
                        <p>Пока нет реализованных проектов</p>
                        <button className={`${styles.btn} ${styles.btnG}`} onClick={() => setIsRequestModalOpen(true)}>
                            Станьте первым клиентом
                        </button>
                    </div>
                )}
            </section>

            <section id="reviews" className={styles.reviews}>
                <div className={styles.reviewsHeader}>
                    <div>
                        <span className={styles.sectionTag}>Отзывы клиентов</span>
                        <h2 className={styles.sectionTitle}>
                            Что говорят <span className={styles.accent}>о нас</span>
                        </h2>
                    </div>
                    <button className={`${styles.btn} ${styles.btnG} ${styles.reviewBtn}`} onClick={() => setIsReviewModalOpen(true)}>
                        Оставить отзыв
                    </button>
                </div>

                {loadingReviews ? (
                    <div className={styles.loader}>Загрузка отзывов...</div>
                ) : reviews.length === 0 ? (
                    <div className={styles.emptyState}>Пока нет отзывов. Будьте первым!</div>
                ) : (
                    <div className={styles.reviewsGrid}>
                        {reviews.map((review) => (
                            <div key={review.id} className={`${styles.reviewCard} ${styles.reveal}`}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewAvatar}>
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className={styles.reviewName}>{review.name}</div>
                                        <div className={styles.reviewDate}>
                                            {new Date(review.createAt).toLocaleDateString('ru-RU')}
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>{review.review}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <div className={styles.finalOffer}>
                <div className={styles.finalOfferContent}>
                    <h3>Готовы начать?</h3>
                    <p>Создадим цифровой продукт, который будет приносить вам клиентов каждый день</p>
                    <div className={styles.finalOfferButtons}>
                        <button className={`${styles.btn} ${styles.btnP}`} onClick={() => setIsRequestModalOpen(true)}>
                            Заказать разработку
                        </button>
                        <button className={`${styles.btn} ${styles.btnG}`} onClick={scrollToContact}>
                            Связаться с нами
                        </button>
                    </div>
                </div>
            </div>

            <section id="contact" className={styles.contact}>
                <span className={`${styles.sectionTag} ${styles.reveal}`}>Контакты</span>
                <h2 className={`${styles.contactTitle} ${styles.reveal}`}>
                    <span style={{ color: 'var(--text)' }}>Давайте</span><br />
                    <span className={styles.gradientText}>обсудим проект</span>
                </h2>
                <p className={`${styles.contactSub} ${styles.reveal}`}>
                    Оставьте заявку — мы свяжемся с вами в течение 15 минут
                </p>
                <div className={`${styles.contactRow} ${styles.reveal}`}>
                    <button className={`${styles.btn} ${styles.btnP}`} onClick={() => setIsRequestModalOpen(true)}>
                        Оставить заявку →
                    </button>
                    <button className={`${styles.btn} ${styles.btnG}`}>
                        hello@ituniverse.dev
                    </button>
                </div>
                <div className={styles.contactSocials}>
                    <a href="#" className={styles.socialLink}>Telegram</a>
                    <a href="#" className={styles.socialLink}>WhatsApp</a>
                    <a href="#" className={styles.socialLink}>VK</a>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerLogo}>IT.UNIVERSE</div>
                <div className={styles.footerText}>© 2025 IT Universe — Разработка сайтов и мобильных приложений под ключ</div>
            </footer>

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