// ===== MAIN APPLICATION =====

// Объявляем функции глобально СРАЗУ
window.openRequestModal = function() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const errorEl = document.getElementById('reqError');
        if (errorEl) errorEl.style.display = 'none';
    }
};

window.openReviewModal = function() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const errorEl = document.getElementById('revError');
        if (errorEl) errorEl.style.display = 'none';
    }
};

window.closeRequestModal = function() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const form = document.getElementById('requestForm');
        if (form) form.reset();
        const errorEl = document.getElementById('reqError');
        if (errorEl) errorEl.style.display = 'none';
    }
};

window.closeReviewModal = function() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const form = document.getElementById('reviewForm');
        if (form) form.reset();
        const errorEl = document.getElementById('revError');
        if (errorEl) errorEl.style.display = 'none';
    }
};

window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
};

document.addEventListener('DOMContentLoaded', function() {
    // ===== INIT =====
    console.log('KortexDev инициализация...');

    initParticles();
    initHeroParticles();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initServices();
    initBenefits();
    initBusinessBenefits();
    initPortfolio();
    initReviews();
    initModals();
    initRevealAnimations();
    initButtons();

    // ===== PARTICLE SYSTEM =====
    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        const colors = ['rgba(109,92,232,0.5)', 'rgba(77,212,232,0.4)', 'rgba(77,232,168,0.4)', 'rgba(232,146,77,0.3)'];
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.setProperty('--x', Math.random() * 100 + '%');
            p.style.setProperty('--y', Math.random() * 100 + '%');
            p.style.setProperty('--s', (Math.random() * 2 + 1).toFixed(1) + 'px');
            p.style.setProperty('--c', colors[i % colors.length]);
            p.style.setProperty('--d', (Math.random() * 5 + 4).toFixed(1) + 's');
            p.style.setProperty('--dl', (Math.random() * 10).toFixed(1) + 's');
            container.appendChild(p);
        }
    }

    function initHeroParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (4 + Math.random() * 6) + 's';
            p.style.width = (2 + Math.random() * 5) + 'px';
            p.style.height = (2 + Math.random() * 5) + 'px';
            p.style.opacity = 0.1 + Math.random() * 0.4;
            container.appendChild(p);
        }
    }

    // ===== CUSTOM CURSOR =====
    function initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        if (!cursor || !ring) return;

        let mx = 0, my = 0;
        let rx = 0, ry = 0;
        let animFrame;

        document.addEventListener('mousemove', function(e) {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
        });

        function animateRing() {
            rx += (mx - rx) * 0.09;
            ry += (my - ry) * 0.09;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            animFrame = requestAnimationFrame(animateRing);
        }
        animateRing();

        const interactives = document.querySelectorAll('a, button');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', function() {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', function() {
                document.body.classList.remove('cursor-hover');
            });
        });

        document.addEventListener('beforeunload', function() {
            cancelAnimationFrame(animFrame);
        });
    }

    // ===== SCROLL PROGRESS =====
    function initScrollProgress() {
        const bar = document.getElementById('progressBar');
        if (!bar) return;
        document.addEventListener('scroll', function() {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalScroll) * 100;
            bar.style.width = progress + '%';
        });
    }

    // ===== NAVBAR =====
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const toggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileOverlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (navbar) {
            document.addEventListener('scroll', function() {
                navbar.classList.toggle('scrolled', window.scrollY > 20);
            });
        }

        if (toggle && mobileMenu && overlay) {
            toggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('open');
                overlay.classList.toggle('open');
            });

            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                overlay.classList.remove('open');
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('open');
                    overlay.classList.remove('open');
                });
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    mobileMenu.classList.remove('open');
                    overlay.classList.remove('open');
                }
            });
        }
    }

    // ===== SERVICES =====
    function initServices() {
        const toggleBtns = document.querySelectorAll('.service-toggle-btn');
        const serviceTitle = document.getElementById('serviceTitle');
        const serviceSubtitle = document.getElementById('serviceSubtitle');
        const servicePrice = document.getElementById('servicePrice');
        const serviceFeatures = document.getElementById('serviceFeatures');
        const serviceExamples = document.getElementById('serviceExamples');
        const prevBtn = document.getElementById('prevService');
        const nextBtn = document.getElementById('nextService');

        const servicesData = {
            landing: {
                title: 'ЛЕНДИНГ',
                subtitle: 'Быстрый запуск, заявки и проверка гипотез',
                price: 'от 12 499 ₽',
                features: [
                    { title: 'Информационные страницы', desc: 'Главная, Услуги, О нас, Контакты, Блог' },
                    { title: 'Админ панель', desc: 'Управление контентом, фотогалереей, отзывами и акциями' },
                    { title: 'Ссылки на обратную связь', desc: 'Telegram, WhatsApp, VK, форма обратной связи' }
                ],
                examples: [
                    { industry: 'Химчистка', feature: 'До/После с реальными фото' },
                    { industry: 'Ресторан', feature: 'Интерактивное меню с ценами и составом блюд' },
                    { industry: 'Салон красоты', feature: 'Портфолио работ и цены на услуги' }
                ]
            },
            platform: {
                title: 'ВЕБ-ПЛАТФОРМА',
                subtitle: 'Сложная логика, личные кабинеты и автоматизация',
                price: 'Цена договорная',
                features: [
                    { title: 'Функционал под ключ', desc: 'Любая сложность по договорённости. Делаем всё, что нужно для вашего бизнеса' },
                    { title: 'Роли и права', desc: 'Админ, пользователи, персонал — разграничение доступа под разные задачи' },
                    { title: 'Регистрация и аккаунты', desc: 'Личные кабинеты, авторизация, восстановление пароля' },
                    { title: 'Рассылки', desc: 'Email и SMS уведомления для клиентов и сотрудников' }
                ],
                examples: [
                    { industry: 'Доставка еды/цветов', feature: 'Страница для курьера, трекинг заказов, уведомления' },
                    { industry: 'Запись к специалисту', feature: 'Онлайн-запись к тренеру, врачу, мастеру с календарём' },
                    { industry: 'Онлайн-оплата', feature: 'Интеграция с ЮKassa, СБП, оплата картами и счетами' },
                    { industry: 'И многое другое', feature: 'Всё, что поможет развивать ваш бизнес' }
                ]
            },
            mobile: {
                title: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
                subtitle: 'Скоро',
                price: 'Скоро',
                features: [
                    { title: 'Скоро', desc: 'Следите за обновлениями' }
                ],
                examples: [
                    { industry: 'Скоро', feature: 'Скоро' }
                ]
            }
        };

        let currentService = 'landing';

        function renderService(type) {
            const data = servicesData[type];
            if (!data) return;

            if (serviceTitle) serviceTitle.textContent = data.title;
            if (serviceSubtitle) serviceSubtitle.textContent = data.subtitle;
            if (servicePrice) servicePrice.textContent = data.price;

            if (serviceFeatures) {
                serviceFeatures.innerHTML = data.features.map(f => `
                    <div class="feature-item">
                        <h4>${f.title}</h4>
                        <p>${f.desc}</p>
                    </div>
                `).join('');
            }

            if (serviceExamples) {
                serviceExamples.innerHTML = data.examples.map(e => `
                    <div class="example-item">
                        <div>
                            <strong>${e.industry}</strong>
                            <span class="example-feature">${e.feature}</span>
                        </div>
                    </div>
                `).join('');
            }

            toggleBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.service === type);
            });

            currentService = type;
        }

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                renderService(this.dataset.service);
            });
        });

        const serviceTypes = ['landing', 'platform', 'mobile'];

        function getPrevService(type) {
            const idx = serviceTypes.indexOf(type);
            return serviceTypes[(idx - 1 + serviceTypes.length) % serviceTypes.length];
        }

        function getNextService(type) {
            const idx = serviceTypes.indexOf(type);
            return serviceTypes[(idx + 1) % serviceTypes.length];
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                renderService(getPrevService(currentService));
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                renderService(getNextService(currentService));
            });
        }

        renderService('landing');
    }

    // ===== BENEFITS =====
    function initBenefits() {
        const grid = document.getElementById('benefitsGrid');
        if (!grid) return;

        const benefits = [
            { title: 'Увеличение прибыли', description: 'Продажи 24/7 без выходных. Ваш бизнес работает даже когда вы спите, принося стабильный доход.' },
            { title: 'Снижение расходов', description: 'Меньше ручного труда — меньше ошибок и затрат. Автоматизация сокращает операционные расходы на 30-50%.' },
            { title: 'Быстрый ROI', description: 'Инвестиции в сайт окупаются за 3-6 месяцев за счёт роста продаж и оптимизации процессов.' },
            { title: 'Сбор контактов', description: 'База клиентов растёт автоматически. Захват email, телефонов и соцсетей посетителей.' },
            { title: 'SEO-продвижение', description: 'Привлечение клиентов из поиска Яндекс и Google. Рост органического трафика без рекламного бюджета.' },
            { title: 'Удобство для клиентов', description: 'Онлайн запись 24/7, заказ в один клик, оплата картой — клиенты выбирают тех, кто заботится о их времени.' },
            { title: 'Отзывы и рейтинги', description: 'Социальное доказательство работает лучше любой рекламы. Собирайте и показывайте отзывы.' },
            { title: 'Аналитика продаж', description: 'Отслеживайте, откуда приходят клиенты, какие услуги популярны, где теряете прибыль.' },
            { title: 'Масштабируемость', description: 'Легко добавляйте новые фичи: интернет-магазин, онлайн запись, интеграции. Сайт растёт вместе с вашим бизнесом.' }
        ];

        grid.innerHTML = benefits.map((b, idx) => `
            <div class="benefit-card" data-index="${idx}" style="transition-delay: ${idx * 0.05}s">
                <div class="gradient-overlay"></div>
                <h3 class="benefit-title">${b.title}</h3>
                <p class="benefit-description">${b.description}</p>
            </div>
        `).join('');

        const cards = grid.querySelectorAll('.benefit-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                this.style.setProperty('--x', x + '%');
                this.style.setProperty('--y', y + '%');
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        cards.forEach(card => observer.observe(card));
    }

    // ===== BUSINESS BENEFITS =====
    function initBusinessBenefits() {
        const container = document.getElementById('metricToggles');
        const chartTitle = document.getElementById('chartTitle');
        const chartDesc = document.getElementById('chartDesc');
        const chartStats = document.getElementById('chartStats');
        const canvas = document.getElementById('metricsChart');
        if (!container || !canvas) return;

        const metrics = [
            { id: 'all', label: 'Все' },
            { id: 'revenue', label: 'Выручка' },
            { id: 'conversion', label: 'Конверсия' },
            { id: 'traffic', label: 'Трафик' },
            { id: 'clients', label: 'Клиенты' },
            { id: 'averageCheck', label: 'Средний чек' },
            { id: 'roi', label: 'ROI' }
        ];

        const metricsData = {
            revenue: {
                title: 'Выручка',
                before: [100, 102, 105, 108, 110, 112, 115, 118, 120, 122, 125, 128],
                after: [100, 125, 158, 195, 238, 285, 340, 395, 445, 490, 535, 580],
                beforeLabel: 'Без сайта (тыс. ₽)',
                afterLabel: 'С сайтом (тыс. ₽)',
                unit: 'тыс. ₽',
                maxValue: 650,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Рост выручки в 4.5 раза за первый год после запуска сайта'
            },
            conversion: {
                title: 'Конверсия',
                before: [1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.8],
                after: [1.2, 1.8, 2.5, 3.2, 4.0, 4.5, 5.0, 5.3, 5.6, 5.8, 6.0, 6.2],
                beforeLabel: 'Без сайта (%)',
                afterLabel: 'С сайтом (%)',
                unit: '%',
                maxValue: 8,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Конверсия увеличивается в 3-5 раз благодаря удобству и автоматизации'
            },
            traffic: {
                title: 'Трафик',
                before: [30, 32, 35, 33, 38, 40, 42, 45, 43, 48, 50, 52],
                after: [50, 120, 250, 400, 620, 850, 1100, 1350, 1600, 1850, 2100, 2400],
                beforeLabel: 'Без сайта (пос./день)',
                afterLabel: 'С сайтом (пос./день)',
                unit: 'посетителей',
                maxValue: 2600,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Рост трафика в 45 раз благодаря SEO и рекламе'
            },
            clients: {
                title: 'Новые клиенты',
                before: [5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11],
                after: [5, 15, 28, 45, 68, 95, 125, 160, 198, 240, 285, 335],
                beforeLabel: 'Без сайта (клиентов/мес)',
                afterLabel: 'С сайтом (клиентов/мес)',
                unit: 'клиентов',
                maxValue: 380,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Количество новых клиентов увеличивается в 30 раз'
            },
            averageCheck: {
                title: 'Средний чек',
                before: [2500, 2500, 2600, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 3000],
                after: [2500, 3200, 3800, 4200, 4800, 5200, 5600, 5900, 6200, 6500, 6700, 7000],
                beforeLabel: 'Без сайта (₽)',
                afterLabel: 'С сайтом (₽)',
                unit: '₽',
                maxValue: 7500,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Средний чек растёт благодаря up-sell и кросс-продажам'
            },
            roi: {
                title: 'Окупаемость (ROI)',
                before: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                after: [-500, -400, -300, -150, 50, 250, 450, 600, 750, 850, 950, 1050],
                beforeLabel: 'Без сайта (тыс. ₽)',
                afterLabel: 'С сайтом (тыс. ₽)',
                unit: 'тыс. ₽',
                maxValue: 1200,
                minValue: -600,
                colorBefore: '#6b7280',
                colorAfter: '#ffffff',
                description: 'Инвестиции окупаются через 4-5 месяцев, ROI за год более 200%'
            }
        };

        const allMetricsDescription = 'Общий взгляд на все ключевые бизнес-метрики в одном графике';

        let activeMetric = 'all';
        let chart = null;

        container.innerHTML = metrics.map(m => `
            <button class="metric-btn ${m.id === 'all' ? 'active' : ''}" data-metric="${m.id}">
                ${m.label}
            </button>
        `).join('');

        container.querySelectorAll('.metric-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                container.querySelectorAll('.metric-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                activeMetric = this.dataset.metric;
                renderChart();
            });
        });

        function renderChart() {
            const ctx = canvas.getContext('2d');
            const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

            if (chart) {
                chart.destroy();
                chart = null;
            }

            let datasets = [];
            let options = {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 800 },
                plugins: {
                    legend: {
                        labels: { color: '#9ca3af', font: { size: 10, family: 'JetBrains Mono' } }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#9ca3af', font: { size: 9 } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af', font: { size: 9 } }
                    }
                }
            };

            if (activeMetric === 'all') {
                if (chartTitle) chartTitle.textContent = 'Общий обзор всех метрик';
                if (chartDesc) chartDesc.textContent = allMetricsDescription;

                datasets = [
                    { label: 'Выручка', data: metricsData.revenue.after, borderColor: '#ffffff', borderWidth: 2, tension: 0.35, pointRadius: 2 },
                    { label: 'Конверсия', data: metricsData.conversion.after, borderColor: '#6D5CE8', borderWidth: 2, tension: 0.35, pointRadius: 2 },
                    { label: 'Трафик', data: metricsData.traffic.after, borderColor: '#22c55e', borderWidth: 2, tension: 0.35, pointRadius: 2 },
                    { label: 'Клиенты', data: metricsData.clients.after, borderColor: '#f97316', borderWidth: 2, tension: 0.35, pointRadius: 2 },
                    { label: 'Средний чек', data: metricsData.averageCheck.after.map(v => v / 1000), borderColor: '#38bdf8', borderWidth: 2, tension: 0.35, pointRadius: 2 },
                    { label: 'ROI', data: metricsData.roi.after, borderColor: '#f43f5e', borderWidth: 2, tension: 0.35, pointRadius: 2 }
                ];
                options.scales.y.min = -600;
                options.scales.y.max = 2600;
                if (chartStats) chartStats.innerHTML = '';
            } else {
                const data = metricsData[activeMetric];
                if (chartTitle) chartTitle.textContent = data.title;
                if (chartDesc) chartDesc.textContent = data.description;

                datasets = [
                    { label: data.beforeLabel, data: data.before, borderColor: data.colorBefore, borderWidth: 2, borderDash: [8, 6], tension: 0.35, pointRadius: 2, fill: true },
                    { label: data.afterLabel, data: data.after, borderColor: data.colorAfter, borderWidth: 3, tension: 0.35, pointRadius: 2, fill: true }
                ];
                options.scales.y.min = data.minValue || 0;
                options.scales.y.max = data.maxValue;

                if (chartStats) {
                    const start = data.before[0];
                    const end = data.after[data.after.length - 1];
                    const growth = ((end - start) / start * 100).toFixed(0);
                    chartStats.innerHTML = `
                        <div class="chart-stat">
                            <span class="chart-stat-label">Начало года</span>
                            <strong class="chart-stat-value">${start}${data.unit === '%' ? '%' : ''}</strong>
                        </div>
                        <div class="chart-stat">
                            <span class="chart-stat-label">Конец года</span>
                            <strong class="chart-stat-value">${end}${data.unit === '%' ? '%' : ''}</strong>
                        </div>
                        <div class="chart-stat">
                            <span class="chart-stat-label">Рост</span>
                            <strong class="chart-stat-value">+${growth}%</strong>
                        </div>
                    `;
                }
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: { labels: months, datasets: datasets },
                options: options
            });
        }

        renderChart();
    }

    // ===== PORTFOLIO =====
    function initPortfolio() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        let allProjects = [];
        let visibleCount = 3;
        let isLoading = false;

        async function loadProjects() {
            try {
                console.log('Загрузка проектов...');

                const projects = await ApiService.getProjects();
                console.log('Получено проектов:', projects.length);

                if (!projects || projects.length === 0) {
                    console.warn('Проектов нет!');
                    grid.innerHTML = `
                        <div class="empty-state">
                            <p>Пока нет реализованных проектов</p>
                            <button class="btn btn-outline" onclick="window.openRequestModal()">Станьте первым клиентом</button>
                        </div>
                    `;
                    return;
                }

                allProjects = projects;
                visibleCount = Math.min(3, allProjects.length);
                renderProjects();

            } catch (error) {
                console.error('Ошибка загрузки проектов:', error);
                grid.innerHTML = `
                    <div class="empty-state">
                        <p>Ошибка загрузки проектов: ${error.message}</p>
                        <button class="btn btn-outline" onclick="location.reload()">Повторить</button>
                    </div>
                `;
            }
        }

        function renderProjects() {
            const projectTypes = ['landing', 'platform', 'mobile'];
            const typeLabels = { landing: 'Лендинг', platform: 'Платформа', mobile: 'Мобильное' };
            const typeBadges = { landing: 'landing-badge', platform: 'platform-badge', mobile: 'mobile-badge' };
            const typeIcons = { landing: '📄', platform: '⚙️', mobile: '📱' };

            let currentIndex = {};

            const visibleProjects = allProjects.slice(0, visibleCount);
            const hasMore = allProjects.length > visibleCount;

            visibleProjects.forEach(project => {
                currentIndex[project.id] = 0;
            });

            grid.innerHTML = visibleProjects.map((project, idx) => {
                const type = projectTypes[idx % 3];
                const images = project.images || [];
                const hasImages = images.length > 0;
                const imageUrl = hasImages ? images[0] : null;

                return `
                    <div class="project-card reveal-scale" style="transition-delay: ${idx * 0.05}s">
                        <div class="project-thumb">
                            ${hasImages && imageUrl ? `
                                <img src="${imageUrl}" alt="${project.name}" class="project-image" 
                                     onerror="this.style.display='none'; this.parentElement.querySelector('.project-placeholder').style.display='flex';" />
                                <div class="project-image-overlay"></div>
                                ${images.length > 1 ? `
                                    <button class="project-carousel-prev" data-id="${project.id}" data-dir="prev">‹</button>
                                    <button class="project-carousel-next" data-id="${project.id}" data-dir="next">›</button>
                                    <div class="project-carousel-counter">1 / ${images.length}</div>
                                ` : ''}
                                <div class="project-placeholder" style="display:none; background: linear-gradient(135deg, #1a1a2e, #16213e)">
                                    <span class="placeholder-icon">${typeIcons[type] || '🌐'}</span>
                                    <span class="placeholder-text">${project.name}</span>
                                </div>
                            ` : `
                                <div class="project-placeholder" style="background: linear-gradient(135deg, #1a1a2e, #16213e)">
                                    <span class="placeholder-icon">${typeIcons[type] || '🌐'}</span>
                                    <span class="placeholder-text">${project.name}</span>
                                </div>
                            `}
                            <div class="thumb-line"></div>
                        </div>
                        <div class="project-body">
                            <div class="project-tags">
                                <span class="tag ${typeBadges[type] || 'landing-badge'}">${typeLabels[type] || 'Проект'}</span>
                                ${hasImages ? `<span class="image-count">📷 ${images.length}</span>` : ''}
                            </div>
                            <div class="project-title">${project.name}</div>
                            <p class="project-desc">${project.description || 'Современный цифровой продукт под ключ.'}</p>
                        </div>
                    </div>
                `;
            }).join('');

            if (hasMore) {
                const loadMoreHtml = `
                    <div class="load-more-container">
                        <button class="load-more-btn" id="loadMoreBtn">
                            <span class="btn-text">Показать ещё</span>
                            <span class="spinner"></span>
                        </button>
                    </div>
                `;
                grid.insertAdjacentHTML('beforeend', loadMoreHtml);

                const loadMoreBtn = document.getElementById('loadMoreBtn');
                if (loadMoreBtn) {
                    loadMoreBtn.addEventListener('click', function() {
                        if (isLoading) return;

                        isLoading = true;
                        this.classList.add('loading');
                        this.disabled = true;

                        const remaining = allProjects.length - visibleCount;
                        const addCount = Math.min(3, remaining);
                        visibleCount += addCount;

                        const container = this.closest('.load-more-container');
                        if (container) container.remove();

                        renderProjects();

                        if (visibleCount >= allProjects.length) {
                            const btnContainer = document.querySelector('.load-more-container');
                            if (btnContainer) btnContainer.remove();
                        }

                        isLoading = false;
                    });
                }
            }

            console.log('Рендеринг завершен! Показано:', visibleCount, 'из', allProjects.length);

            setTimeout(() => {
                const cards = grid.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                    card.style.visibility = 'visible';
                });
                grid.style.display = 'grid';
                grid.style.opacity = '1';
            }, 200);

            grid.querySelectorAll('.project-carousel-prev, .project-carousel-next').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const id = parseInt(this.dataset.id);
                    const dir = this.dataset.dir;
                    const project = allProjects.find(p => p.id === id);
                    if (!project || !project.images) return;

                    const currentProject = visibleProjects.find(p => p.id === id);
                    if (!currentProject) return;

                    const total = project.images.length;
                    currentIndex[id] = (currentIndex[id] || 0) + (dir === 'next' ? 1 : -1);
                    if (currentIndex[id] < 0) currentIndex[id] = total - 1;
                    if (currentIndex[id] >= total) currentIndex[id] = 0;

                    const thumb = this.closest('.project-thumb');
                    const img = thumb.querySelector('.project-image');
                    const counter = thumb.querySelector('.project-carousel-counter');
                    if (img) img.src = project.images[currentIndex[id]];
                    if (counter) counter.textContent = `${currentIndex[id] + 1} / ${total}`;
                });
            });
        }

        loadProjects();
    }

    // ===== REVIEWS =====
    function initReviews() {
        const container = document.getElementById('reviewsContainer');
        if (!container) return;

        async function loadReviews() {
            try {
                console.log('Загрузка отзывов...');

                const reviews = await ApiService.getReviews();
                console.log('Получено отзывов:', reviews.length);

                if (!reviews || reviews.length === 0) {
                    container.innerHTML = `<div class="empty-state">Пока нет отзывов. Будьте первым!</div>`;
                    return;
                }

                const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

                function formatDate(dateStr) {
                    const d = new Date(dateStr);
                    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
                }

                container.innerHTML = `
                    <div class="reviews-grid">
                        ${reviews.map((review, idx) => `
                            <article class="review-card" style="animation-delay: ${idx * 0.08}s">
                                <div class="card-top">
                                    <div class="review-avatar">${review.name.charAt(0).toUpperCase()}</div>
                                    <div class="card-meta">
                                        <div class="review-name">${review.name}</div>
                                        <div class="review-date">${formatDate(review.createAt)}</div>
                                    </div>
                                </div>
                                <p class="review-text">${review.review}</p>
                                <div class="card-footer">
                                    <span class="badge">Проверенный клиент</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                `;

                console.log('Отзывы отрендерены!');

            } catch (error) {
                console.error('Ошибка загрузки отзывов:', error);
                container.innerHTML = `<div class="empty-state">Ошибка загрузки отзывов: ${error.message}</div>`;
            }
        }

        loadReviews();
    }

    // ===== MODALS =====
    function initModals() {
        const requestModal = document.getElementById('requestModal');
        const closeRequest = document.getElementById('closeRequestModal');
        const requestForm = document.getElementById('requestForm');

        const reviewModal = document.getElementById('reviewModal');
        const closeReview = document.getElementById('closeReviewModal');
        const reviewForm = document.getElementById('reviewForm');

        if (closeRequest) {
            closeRequest.addEventListener('click', window.closeRequestModal);
        }

        if (closeReview) {
            closeReview.addEventListener('click', window.closeReviewModal);
        }

        if (requestModal) {
            requestModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    window.closeRequestModal();
                }
            });
        }

        if (reviewModal) {
            reviewModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    window.closeReviewModal();
                }
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (requestModal && requestModal.classList.contains('active')) {
                    window.closeRequestModal();
                }
                if (reviewModal && reviewModal.classList.contains('active')) {
                    window.closeReviewModal();
                }
            }
        });

        if (requestForm) {
            requestForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const name = document.getElementById('reqName').value.trim();
                const username = document.getElementById('reqUsername').value.trim();
                const type = document.querySelector('input[name="requestType"]:checked').value;
                const errorEl = document.getElementById('reqError');
                const submitBtn = document.getElementById('reqSubmit');

                if (!name || !username) {
                    if (errorEl) {
                        errorEl.textContent = 'Заполните все поля';
                        errorEl.style.display = 'block';
                    }
                    return;
                }

                try {
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Отправка...';
                    }
                    if (errorEl) errorEl.style.display = 'none';

                    await ApiService.createRequest({ name, username, requestType: type });

                    window.closeRequestModal();
                    window.showToast('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');

                } catch (error) {
                    if (errorEl) {
                        errorEl.textContent = 'Ошибка при отправке заявки';
                        errorEl.style.display = 'block';
                    }
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Отправить заявку →';
                    }
                }
            });
        }

        if (reviewForm) {
            reviewForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const name = document.getElementById('revName').value.trim();
                const review = document.getElementById('revText').value.trim();
                const errorEl = document.getElementById('revError');
                const submitBtn = document.getElementById('revSubmit');

                if (!name || !review) {
                    if (errorEl) {
                        errorEl.textContent = 'Заполните все поля';
                        errorEl.style.display = 'block';
                    }
                    return;
                }

                try {
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Отправка...';
                    }
                    if (errorEl) errorEl.style.display = 'none';

                    await ApiService.createReview({ name, review });

                    window.closeReviewModal();
                    window.showToast('Спасибо за отзыв!');
                    initReviews();

                } catch (error) {
                    if (errorEl) {
                        errorEl.textContent = 'Ошибка при отправке отзыва';
                        errorEl.style.display = 'block';
                    }
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Отправить отзыв →';
                    }
                }
            });
        }
    }

    // ===== ВСЕ КНОПКИ =====
    function initButtons() {
        const requestButtonIds = [
            'requestBtn',
            'mobileRequestBtn',
            'heroBtn',
            'finalOfferBtn',
            'contactRequestBtn',
            'portfolioRequestBtn',
            'serviceRequestBtn'
        ];

        requestButtonIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openRequestModal();
                });
            }
        });

        const reviewBtn = document.getElementById('reviewBtn');
        if (reviewBtn) {
            const newBtn = reviewBtn.cloneNode(true);
            reviewBtn.parentNode.replaceChild(newBtn, reviewBtn);
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.openReviewModal();
            });
        }

        const contactBtn = document.getElementById('contactBtn');
        if (contactBtn) {
            const newBtn = contactBtn.cloneNode(true);
            contactBtn.parentNode.replaceChild(newBtn, contactBtn);
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            });
        }

        const emailBtn = document.getElementById('emailBtn');
        if (emailBtn) {
            const newBtn = emailBtn.cloneNode(true);
            emailBtn.parentNode.replaceChild(newBtn, emailBtn);
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard?.writeText('s5090@inbox.ru').then(() => {
                    window.showToast('Email скопирован!');
                }).catch(() => {
                    window.location.href = 'mailto:s5090@inbox.ru';
                });
            });
        }
    }

    // ===== REVEAL ANIMATIONS =====
    function initRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-blur, .reveal-flip, .benefit-card').forEach(el => {
            observer.observe(el);
        });
    }

    console.log('KortexDev инициализация завершена!');
});