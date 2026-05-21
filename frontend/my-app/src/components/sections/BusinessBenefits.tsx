import React, { useEffect, useRef, useState } from 'react';
import styles from '../../style/BusinessBenefits.module.scss';

interface Benefit {
    icon: string;
    title: string;
    description: string;
    stat?: string;
}

interface BusinessBenefitsProps {
    onRequestClick?: () => void;
}

const BusinessBenefits: React.FC<BusinessBenefitsProps> = ({ onRequestClick }) => {
    const [roiValue, setRoiValue] = useState(500000);
    const [monthlyProfit, setMonthlyProfit] = useState(150000);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const comparisonChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);
    const comparisonChartInstanceRef = useRef<any>(null);

    const benefits: Benefit[] = [
        { icon: '💰', title: 'Увеличение прибыли', description: 'Продажи 24/7 без выходных. Ваш бизнес работает даже когда вы спите, принося стабильный доход.', stat: '+73%' },
        { icon: '📉', title: 'Снижение расходов', description: 'Меньше ручного труда — меньше ошибок и затрат. Автоматизация сокращает операционные расходы на 30-50%.', stat: '-42%' },
        { icon: '📈', title: 'Быстрый ROI', description: 'Инвестиции в сайт окупаются за 3-6 месяцев за счёт роста продаж и оптимизации процессов.', stat: '3-6 мес' },
        { icon: '📋', title: 'Сбор контактов', description: 'База клиентов растёт автоматически. Захват email, телефонов и соцсетей посетителей.', stat: '+280%' },
        { icon: '📧', title: 'Email и SMS рассылки', description: 'Информируйте клиентов об акциях, новинках и персональных предложениях. Повторные продажи.', stat: '45% ROI' },
        { icon: '🔍', title: 'SEO-продвижение', description: 'Привлечение клиентов из поиска Яндекс и Google. Рост органического трафика без рекламного бюджета.', stat: 'бесплатно' },
        { icon: '🔄', title: 'Ретаргетинг', description: 'Возвращайте посетителей, которые не купили. Показывайте рекламу тем, кто уже интересовался вами.', stat: '+65% конв.' },
        { icon: '⭐', title: 'Удобство для клиентов', description: 'Онлайн запись 24/7, заказ в один клик, оплата картой — клиенты выбирают тех, кто заботится о их времени.', stat: '92%' },
        { icon: '📦', title: 'Прозрачность', description: 'Статус заказа, история покупок, отслеживание доставки — доверие клиентов растёт с каждым шагом.', stat: '+45% доверия' },
        { icon: '🎁', title: 'Бонусы и лояльность', description: 'Персональные рекомендации, программа лояльности, скидки за отзывы — клиенты возвращаются снова.', stat: 'LTV +67%' },
        { icon: '🗣️', title: 'Отзывы и рейтинги', description: 'Социальное доказательство работает лучше любой рекламы. Собирайте и показывайте отзывы.', stat: '+34% конв.' },
        { icon: '📊', title: 'Аналитика продаж', description: 'Отслеживайте, откуда приходят клиенты, какие услуги популярны, где теряете прибыль.', stat: 'в реальном времени' },
        { icon: '🔄', title: 'CRM интеграция', description: 'Все заказы и клиенты автоматически попадают в вашу CRM. Ничего не теряется, всё под контролем.', stat: 'автоматически' },
        { icon: '📑', title: 'Отчёты в 1 клик', description: 'Продажи, прибыль, популярные товары, эффективность рекламы — любые отчёты формируются мгновенно.', stat: '1 секунда' },
        { icon: '👥', title: 'Контроль персонала', description: 'Видите кто взял заказ, сколько времени заняла обработка, уровень удовлетворённости клиентов.', stat: 'прозрачно' },
        { icon: '⚙️', title: 'Автоматизация процессов', description: 'Автоматическое выставление счетов, отправка чеков, уведомления клиентам — меньше рутины.', stat: '-35% времени' },
        { icon: '🚀', title: 'Масштабируемость', description: 'Легко добавляйте новые фичи: интернет-магазин, онлайн запись, интеграции. Сайт растёт вместе с вашим бизнесом.', stat: 'без ограничений' },
        { icon: '🔗', title: 'Интеграция с 1С и кассами', description: 'Автоматический обмен данными с 1С, эквайринг, маркировка, ЕГАИС — всё работает "из коробки".', stat: 'готово' }
    ];

    // Инициализация графиков
    useEffect(() => {
        const initCharts = async () => {
            if (typeof window !== 'undefined' && chartRef.current && comparisonChartRef.current) {
                try {
                    const ChartModule = await import('chart.js/auto');
                    const Chart = ChartModule.default;
                    
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }
                    if (comparisonChartInstanceRef.current) {
                        comparisonChartInstanceRef.current.destroy();
                    }

                    // График роста продаж
                    chartInstanceRef.current = new Chart(chartRef.current, {
                        type: 'line',
                        data: {
                            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                            datasets: [
                                {
                                    label: 'Без сайта (тыс. ₽)',
                                    data: [100, 102, 105, 108, 110, 112, 115, 118, 120, 122, 125, 128],
                                    borderColor: '#6b7280',
                                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                                    borderWidth: 2,
                                    pointRadius: 3,
                                    pointBackgroundColor: '#6b7280',
                                    pointBorderColor: '#1a1a2e',
                                    pointBorderWidth: 1,
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'С сайтом (тыс. ₽)',
                                    data: [100, 125, 158, 195, 238, 285, 340, 395, 445, 490, 535, 580],
                                    borderColor: '#3b82f6',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    borderWidth: 2.5,
                                    pointRadius: 4,
                                    pointBackgroundColor: '#3b82f6',
                                    pointBorderColor: '#1a1a2e',
                                    pointBorderWidth: 1,
                                    tension: 0.3,
                                    fill: true
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: '#1a1a2e',
                                    titleColor: '#ffffff',
                                    bodyColor: '#d1d5db',
                                    borderColor: '#333333',
                                    borderWidth: 1,
                                    callbacks: {
                                        label: (context: any) => {
                                            return `${context.dataset.label}: ${context.raw}K ₽`;
                                        }
                                    }
                                },
                                legend: {
                                    labels: {
                                        color: '#9ca3af',
                                        font: { size: 11, family: 'Inter' },
                                        boxWidth: 12,
                                        usePointStyle: true
                                    },
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    grid: { color: '#333333', lineWidth: 0.5 },
                                    ticks: { color: '#9ca3af', callback: (val: any) => val + 'K' }
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: { color: '#9ca3af', font: { size: 10 } }
                                }
                            }
                        }
                    });

                    // График сравнения
                    comparisonChartInstanceRef.current = new Chart(comparisonChartRef.current, {
                        type: 'bar',
                        data: {
                            labels: ['Трафик', 'Конверсия', 'Средний чек', 'LTV', 'Узнаваемость'],
                            datasets: [
                                {
                                    label: 'Без сайта',
                                    data: [30, 1.2, 2500, 8000, 25],
                                    backgroundColor: 'rgba(107, 114, 128, 0.7)',
                                    borderRadius: 8
                                },
                                {
                                    label: 'С сайтом',
                                    data: [100, 4.8, 5200, 24500, 92],
                                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                                    borderRadius: 8
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                tooltip: {
                                    backgroundColor: '#1a1a2e',
                                    titleColor: '#ffffff',
                                    bodyColor: '#d1d5db',
                                    borderColor: '#333333',
                                    borderWidth: 1
                                },
                                legend: {
                                    labels: {
                                        color: '#9ca3af',
                                        font: { size: 11 },
                                        boxWidth: 12
                                    },
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    grid: { color: '#333333', lineWidth: 0.5 },
                                    ticks: { color: '#9ca3af' }
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: { color: '#9ca3af', font: { size: 11 } }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error initializing charts:', error);
                }
            }
        };

        initCharts();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
            if (comparisonChartInstanceRef.current) {
                comparisonChartInstanceRef.current.destroy();
                comparisonChartInstanceRef.current = null;
            }
        };
    }, []);

    const calculateROI = () => {
        const investment = roiValue;
        const monthly = monthlyProfit;
        const yearlyProfit = monthly * 12;
        const roi = ((yearlyProfit - investment) / investment) * 100;
        const paybackMonths = investment / monthly;
        return { roi: Math.max(0, Math.floor(roi)), paybackMonths: paybackMonths.toFixed(1) };
    };

    const { roi, paybackMonths } = calculateROI();

    return (
        <section id="business-benefits" className={styles.businessBenefits}>
            {/* Header */}
            <div className={`${styles.header} ${styles.reveal}`}>
                <span className={styles.tag}>Почему это выгодно</span>
                <h2 className={styles.title}>
                    Чем полезен <span className={styles.accent}>сайт для бизнеса</span>
                </h2>
                <p className={styles.subtitle}>
                    Цифровые инструменты, которые реально увеличивают прибыль и оптимизируют процессы
                </p>
            </div>

            {/* Stats Showcase */}
            <div className={`${styles.statsShowcase} ${styles.reveal}`}>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>+73%</div>
                    <div className={styles.statLabel}>Средний рост продаж</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>-42%</div>
                    <div className={styles.statLabel}>Снижение операционных расходов</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>24/7</div>
                    <div className={styles.statLabel}>Бизнес работает без выходных</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>3-6 мес</div>
                    <div className={styles.statLabel}>Средний ROI</div>
                </div>
            </div>

            {/* Growth Chart Section */}
            <div className={`${styles.chartSection} ${styles.reveal}`}>
                <div className={styles.chartHeader}>
                    <h3>📈 Рост прибыли после запуска сайта</h3>
                    <div className={styles.legend}>
                        <span><span className={styles.legendDot} style={{ background: '#6b7280' }}></span>Без сайта</span>
                        <span><span className={styles.legendDot} style={{ background: '#3b82f6' }}></span>С сайтом</span>
                    </div>
                </div>
                <div className={styles.chartContainer}>
                    <canvas ref={chartRef} width="600" height="220" style={{ width: '100%', height: '220px' }}></canvas>
                </div>
                <div className={styles.chartNote}>
                    📊 Данные на основе реальных проектов за 2024-2025 год
                </div>
            </div>

            {/* Benefits Grid */}
            <div className={styles.benefitsGrid}>
                {benefits.map((benefit, idx) => (
                    <div key={idx} className={`${styles.benefitCard} ${styles.revealCard}`} style={{ animationDelay: `${idx * 0.02}s` }}>
                        <div className={styles.benefitIcon}>{benefit.icon}</div>
                        <div className={styles.benefitContent}>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                            {benefit.stat && <span className={styles.benefitStat}>{benefit.stat}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Comparison Section */}
            <div className={`${styles.comparisonSection} ${styles.reveal}`}>
                <div className={styles.comparisonHeader}>
                    <h3>⚡ Сравнение с конкурентами</h3>
                    <p>Ваш бизнес без сайта vs с современным цифровым продуктом</p>
                </div>
                <div className={styles.comparisonGrid}>
                    <div className={`${styles.comparisonCard} ${styles.withoutSite}`}>
                        <h4>📭 Без сайта</h4>
                        <div className={styles.comparisonStats}>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Посетителей в день</span>
                                <span className={styles.statValue}>~30-50</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Конверсия</span>
                                <span className={styles.statValue}>1-2%</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Рабочие часы</span>
                                <span className={styles.statValue}>9:00-18:00</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Способы оплаты</span>
                                <span className={styles.statValue}>Наличные / Перевод</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.comparisonCard} ${styles.withSite}`}>
                        <h4>🚀 С сайтом / приложением</h4>
                        <div className={styles.comparisonStats}>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Посетителей в день</span>
                                <span className={`${styles.statValue} ${styles.positive}`}>500-5000+</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Конверсия</span>
                                <span className={`${styles.statValue} ${styles.positive}`}>3-8%</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Рабочие часы</span>
                                <span className={`${styles.statValue} ${styles.positive}`}>24/7</span>
                            </div>
                            <div className={styles.comparisonStat}>
                                <span className={styles.statLabel}>Способы оплаты</span>
                                <span className={`${styles.statValue} ${styles.positive}`}>Все способы + Apple/Google Pay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Bar Chart */}
            <div className={`${styles.comparisonChartSection} ${styles.reveal}`}>
                <div className={styles.chartHeader}>
                    <h3>📊 Ключевые метрики: Сайт vs Без сайта</h3>
                </div>
                <div className={styles.chartContainer}>
                    <canvas ref={comparisonChartRef} width="600" height="240" style={{ width: '100%', height: '240px' }}></canvas>
                </div>
            </div>

            {/* ROI Calculator */}
            <div className={`${styles.roiCalculator} ${styles.reveal}`}>
                <div className={styles.roiHeader}>
                    <h3>💰 Рассчитайте окупаемость сайта</h3>
                    <p>Узнайте, через сколько месяцев ваш сайт начнёт приносить чистую прибыль</p>
                </div>
                <div className={styles.calculatorGrid}>
                    <div className={styles.calculatorInputs}>
                        <div className={styles.inputGroup}>
                            <label>💰 Стоимость разработки (₽)</label>
                            <input
                                type="number"
                                value={roiValue}
                                onChange={(e) => setRoiValue(Number(e.target.value))}
                                step="50000"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>📈 Ожидаемая ежемесячная прибыль от сайта (₽)</label>
                            <input
                                type="number"
                                value={monthlyProfit}
                                onChange={(e) => setMonthlyProfit(Number(e.target.value))}
                                step="10000"
                            />
                        </div>
                    </div>
                    <div className={styles.calculatorResult}>
                        <div className={styles.resultBox}>
                            <div className={styles.resultLabel}>Окупаемость</div>
                            <div className={styles.resultNumber}>{paybackMonths} мес.</div>
                            <div className={styles.resultLabel}>ROI (за год)</div>
                            <div className={styles.resultNumber}>{roi}%</div>
                            {roi > 100 && <div className={styles.roiBadge}>📈 Высокая эффективность!</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className={`${styles.ctaSection} ${styles.reveal}`}>
                <div className={styles.ctaContent}>
                    <h3>Готовы увеличить прибыль вашего бизнеса?</h3>
                    <p>Создадим цифровой продукт, который будет работать на вас 24/7</p>
                    <button className={styles.ctaButton} onClick={onRequestClick}>
                        Рассчитать стоимость проекта →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BusinessBenefits;