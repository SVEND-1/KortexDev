// BusinessBenefits.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../style/BusinessBenefits.module.scss';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface BusinessBenefitsProps {
    onRequestClick?: () => void;
}

type MetricType = 'all' | 'revenue' | 'conversion' | 'roi' | 'traffic' | 'clients' | 'averageCheck';

interface MetricData {
    title: string;
    before: number[];
    after: number[];
    beforeLabel: string;
    afterLabel: string;
    unit: string;
    maxValue: number;
    minValue?: number;
    colorBefore: string;
    colorAfter: string;
    description: string;
}

const BusinessBenefits: React.FC<BusinessBenefitsProps> = () => {
    const [activeMetric, setActiveMetric] = useState<MetricType>('all');
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    const metricsData: Record<Exclude<MetricType, 'all'>, MetricData> = {
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
            minValue: 0,
            colorBefore: '#6b7280',
            colorAfter: '#ffffff',
            description: 'Конверсия увеличивается в 3-5 раз благодаря удобству и автоматизации'
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
        }
    };

    const allMetricsDescription = 'Общий взгляд на все ключевые бизнес-метрики в одном графике';

    const benefitsList = [
        'Увеличение прибыли до 73% за первый год',
        'Снижение операционных расходов на 42%',
        'Бизнес работает 24/7 без выходных',
        'Автоматический сбор контактов клиентов',
        'Email и SMS рассылки для повторных продаж',
        'SEO-продвижение — бесплатный трафик',
        'Ретаргетинг для возврата клиентов',
        'Удобство для клиентов — онлайн запись 24/7',
        'Прозрачность — статус заказа онлайн',
        'Программа лояльности и бонусы',
        'Отзывы и рейтинги — социальное доказательство',
        'Аналитика продаж в реальном времени',
        'CRM интеграция — всё под контролем',
        'Отчёты в 1 клик по всем метрикам',
        'Контроль персонала — прозрачность',
        'Автоматизация процессов — меньше рутины',
        'Масштабируемость — без ограничений',
        'Интеграция с 1С и кассами'
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt((entry.target as HTMLElement).dataset.index || '0');
                        setVisibleItems(prev => [...prev, index]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const items = document.querySelectorAll(`.${styles.benefitsListItem}`);
        items.forEach((item, idx) => {
            (item as HTMLElement).dataset.index = idx.toString();
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const revealElements = document.querySelectorAll(`.${styles.reveal}`);
        revealElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const initChart = () => {
            if (!chartRef.current) return;

            try {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
                const ctx = chartRef.current.getContext('2d');
                if (!ctx) return;

                const commonOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1800,
                        easing: 'easeInOutQuart' as const
                    },
                    interaction: {
                        mode: 'index' as const,
                        intersect: false
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: '#0a0a0f',
                            titleColor: '#ffffff',
                            bodyColor: '#d1d5db',
                            borderColor: '#ffffff',
                            borderWidth: 1,
                            padding: 10
                        },
                        legend: {
                            labels: {
                                color: '#9ca3af',
                                font: { size: 10, family: 'JetBrains Mono' },
                                boxWidth: 10,
                                boxHeight: 10,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            },
                            position: 'top' as const,
                            align: 'center' as const
                        }
                    },
                    scales: {
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: {
                                color: '#9ca3af',
                                font: { size: 9 }
                            }
                        },
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: '#9ca3af',
                                font: { size: 9 }
                            }
                        }
                    }
                };

                if (activeMetric === 'all') {
                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: months,
                            datasets: [
                                {
                                    label: 'Выручка (с сайтом)',
                                    data: metricsData.revenue.after,
                                    borderColor: '#ffffff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                },
                                {
                                    label: 'Конверсия',
                                    data: metricsData.conversion.after,
                                    borderColor: '#6D5CE8',
                                    backgroundColor: 'rgba(109, 92, 232, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                },
                                {
                                    label: 'Трафик',
                                    data: metricsData.traffic.after,
                                    borderColor: '#22c55e',
                                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                },
                                {
                                    label: 'Новые клиенты',
                                    data: metricsData.clients.after,
                                    borderColor: '#f97316',
                                    backgroundColor: 'rgba(249, 115, 22, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                },
                                {
                                    label: 'Средний чек',
                                    data: metricsData.averageCheck.after.map(v => v / 1000),
                                    borderColor: '#38bdf8',
                                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                },
                                {
                                    label: 'ROI',
                                    data: metricsData.roi.after,
                                    borderColor: '#f43f5e',
                                    backgroundColor: 'rgba(244, 63, 94, 0.08)',
                                    borderWidth: 3,
                                    pointRadius: 2,
                                    tension: 0.35,
                                    fill: false
                                }
                            ]
                        },
                        options: {
                            ...commonOptions,
                            scales: {
                                ...commonOptions.scales,
                                y: {
                                    ...commonOptions.scales.y,
                                    min: -600,
                                    max: 2600
                                }
                            },
                            plugins: {
                                ...commonOptions.plugins,
                                tooltip: {
                                    ...commonOptions.plugins.tooltip,
                                    callbacks: {
                                        label: (context) => `${context.dataset.label}: ${context.raw}`
                                    }
                                }
                            }
                        }
                    });
                    return;
                }

                const currentData = metricsData[activeMetric];

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [
                            {
                                label: currentData.beforeLabel,
                                data: currentData.before,
                                borderColor: currentData.colorBefore,
                                backgroundColor: 'rgba(107, 114, 128, 0.05)',
                                borderWidth: 2,
                                borderDash: [8, 6],
                                pointRadius: 2,
                                pointBackgroundColor: currentData.colorBefore,
                                pointBorderColor: '#0a0a0f',
                                pointBorderWidth: 1.5,
                                pointHoverRadius: 5,
                                tension: 0.35,
                                fill: true
                            },
                            {
                                label: currentData.afterLabel,
                                data: currentData.after,
                                borderColor: currentData.colorAfter,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                borderWidth: 3,
                                pointRadius: 2,
                                pointBackgroundColor: currentData.colorAfter,
                                pointBorderColor: '#0a0a0f',
                                pointBorderWidth: 1.5,
                                pointHoverRadius: 5,
                                tension: 0.35,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        ...commonOptions,
                        scales: {
                            ...commonOptions.scales,
                            y: {
                                ...commonOptions.scales.y,
                                min: currentData.minValue ?? 0,
                                max: currentData.maxValue
                            }
                        },
                        plugins: {
                            ...commonOptions.plugins,
                            tooltip: {
                                ...commonOptions.plugins.tooltip,
                                callbacks: {
                                    label: (context) => {
                                        const label = context.dataset.label || '';
                                        const rawValue = context.raw;
                                        const value = typeof rawValue === 'number' ? rawValue : 0;

                                        if (activeMetric === 'conversion') return `${label}: ${value}%`;
                                        if (activeMetric === 'averageCheck') return `${label}: ${value.toLocaleString()} ₽`;
                                        if (activeMetric === 'clients') return `${label}: ${value} чел.`;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing chart:', error);
            }
        };

        const timer = setTimeout(initChart, 80);
        return () => {
            clearTimeout(timer);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [activeMetric]);

    return (
        <section id="business-benefits" className={styles.businessBenefits} ref={sectionRef}>
            <div className={`${styles.header} ${styles.reveal}`}>
                <span className={styles.tag}>Почему это выгодно</span>
                <h2 className={styles.title}>
                    Чем полезен <span className={styles.accent}>сайт для бизнеса</span>
                </h2>
                <p className={styles.subtitle}>
                    Цифровые инструменты, которые реально увеличивают прибыль и оптимизируют процессы
                </p>
            </div>

            <div className={`${styles.chartSection} ${styles.reveal}`}>
                <div className={styles.chartHeader}>
                    <div className={styles.chartTitleBlock}>
                        <h3>
                            {activeMetric === 'all' ? 'Общий обзор всех метрик' : 'Динамика роста после запуска сайта'}
                        </h3>
                        <p>
                            {activeMetric === 'all'
                                ? allMetricsDescription
                                : metricsData[activeMetric].description}
                        </p>
                    </div>

                    <div className={styles.metricToggles}>
                        {(['all', 'revenue', 'conversion', 'traffic', 'clients', 'averageCheck', 'roi'] as MetricType[]).map((metric) => (
                            <button
                                key={metric}
                                className={`${styles.metricBtn} ${activeMetric === metric ? styles.active : ''}`}
                                onClick={() => setActiveMetric(metric)}
                            >
                                {metric === 'all' ? 'Все' : metricsData[metric].title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.chartContainer}>
                    <canvas ref={chartRef} />
                </div>

                <div className={styles.chartStats}>
                    {activeMetric === 'all' ? (
                        <>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Метрик в сравнении</span>
                                <strong className={styles.chartStatValue}>6</strong>
                            </div>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Режим</span>
                                <strong className={styles.chartStatValue}>Все в одном</strong>
                            </div>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Фокус</span>
                                <strong className={styles.chartStatValue}>
                                    Общий эффект
                                </strong>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Начало года</span>
                                <strong className={styles.chartStatValue}>
                                    {activeMetric === 'revenue' ? '100 тыс. ₽' :
                                        activeMetric === 'conversion' ? '1.2%' :
                                            activeMetric === 'traffic' ? '30 пос.' :
                                                activeMetric === 'clients' ? '5 клиентов' :
                                                    activeMetric === 'averageCheck' ? '2500 ₽' :
                                                        '0 ₽'}
                                </strong>
                            </div>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Конец года</span>
                                <strong className={styles.chartStatValue}>
                                    {activeMetric === 'revenue' ? '580 тыс. ₽' :
                                        activeMetric === 'conversion' ? '6.2%' :
                                            activeMetric === 'traffic' ? '2400 пос.' :
                                                activeMetric === 'clients' ? '335 клиентов' :
                                                    activeMetric === 'averageCheck' ? '7000 ₽' :
                                                        '1050 тыс. ₽'}
                                </strong>
                            </div>
                            <div className={styles.chartStat}>
                                <span className={styles.chartStatLabel}>Рост</span>
                                <strong className={styles.chartStatValue}>
                                    {activeMetric === 'revenue' ? '+480%' :
                                        activeMetric === 'conversion' ? '+416%' :
                                            activeMetric === 'traffic' ? '+7900%' :
                                                activeMetric === 'clients' ? '+6600%' :
                                                    activeMetric === 'averageCheck' ? '+180%' :
                                                        'окупаемость'}
                                </strong>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.chartInsight}>
                    <div className={styles.insightCard}>
                        <strong>Ключевое открытие</strong>
                        <p>Запуск сайта увеличивает выручку в 4.5 раза за первый год</p>
                    </div>
                    <div className={styles.insightCard}>
                        <strong>Точка безубыточности</strong>
                        <p>В среднем через 4-5 месяцев после запуска</p>
                    </div>
                    <div className={styles.insightCard}>
                        <strong>ROI превышает 200%</strong>
                        <p>При правильной настройке и продвижении</p>
                    </div>
                </div>
            </div>

            <div className={`${styles.benefitsListSection} ${styles.reveal}`}>
                <h3 className={styles.benefitsListTitle}>Что вы получаете</h3>
                <div className={styles.benefitsListGrid}>
                    {benefitsList.map((benefit, idx) => (
                        <div
                            key={idx}
                            className={`${styles.benefitsListItem} ${visibleItems.includes(idx) ? styles.animated : ''}`}
                            style={{ animationDelay: `${idx * 0.03}s` }}
                        >
                            <span className={styles.benefitsListBullet} />
                            <span className={styles.benefitsListText}>{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessBenefits;