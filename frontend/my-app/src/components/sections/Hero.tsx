import React, { useEffect, useRef } from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface HeroProps {
    onRequestClick: () => void;
    onConsultationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRequestClick, onConsultationClick }) => {
    const codeAreaRef = useRef<HTMLDivElement>(null);

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
            lineDiv.style.animationDelay = `${i * 0.05}s`;
            lineDiv.innerHTML = `<span class="${styles.ln}">${String(i + 1).padStart(2, '0')}</span><span class="${styles.lc}">${line}</span>`;
            codeAreaRef.current?.appendChild(lineDiv);
        });
    }, []);

    return (
        <section className={styles.hero}>
            {/* Левая колонка с текстом */}
            <div className={styles.heroLeft}>
                <div className={styles.eyebrow}>
                    <span className={styles.eyebrowDot}></span>
                    IT Universe · разработка под ключ
                </div>
                <h1 className={styles.heroTitle}>
                    Создаём<br />
                    цифровые<br />
                    продукты
                </h1>
                <p className={styles.heroSubtitle}>
                    Лендинги, веб-платформы и мобильные приложения под ключ.
                    Индивидуальный дизайн, админ-панель, онлайн оплата и не только.
                    Продукт, который работает на ваш бизнес 24/7.
                </p>
                <div className={styles.heroActions}>
                    <button className={`${styles.btnPrimary}`} onClick={onRequestClick}>
                        Заказать разработку →
                    </button>
                    <button className={`${styles.btnSecondary}`} onClick={onConsultationClick}>
                        Бесплатная консультация
                    </button>
                </div>
            </div>

            {/* Правая колонка с панелью */}
            <div className={styles.panel}>
                <div className={styles.mock}>
                    <div className={styles.mockTop}>
                        <div className={styles.chips}>
                            <span className={styles.chip}></span>
                            <span className={styles.chip}></span>
                            <span className={styles.chip}></span>
                        </div>
                        <div className={styles.mockLabel}>IT Universe — Ваш цифровой продукт</div>
                    </div>

                    <div className={styles.mockBody}>
                        <div className={`${styles.card} ${styles.cardLarge}`}>
                            <div className={styles.kicker}>✦ Цифровая экосистема</div>
                            <h3>Сайт · Платформа · Приложение</h3>
                            <p>Полный цикл разработки: от идеи до запуска. Единое решение для вашего бизнеса.</p>

                            <div className={styles.metric}>
                                <div>
                                    <div className={styles.kicker}>Скорость запуска</div>
                                    <strong>от 14 дней</strong>
                                </div>
                                <div>
                                    <div className={styles.kicker}>Рост продаж</div>
                                    <strong>до 300%</strong>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.kicker}>Современный стек</div>
                            <h3>React · TypeScript · Node.js</h3>
                            <p>Используем актуальные технологии для максимальной производительности.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.kicker}>Адаптивный дизайн</div>
                            <h3>ПК · Планшет · Смартфон</h3>
                            <p>Корректное отображение на всех устройствах. Pixel perfect вёрстка.</p>
                        </div>

                        <div className={`${styles.card} ${styles.cardFull}`}>
                            <div className={styles.kicker}>⚡️ Быстрый старт</div>
                            <div className={styles.codeArea} ref={codeAreaRef}></div>
                        </div>
                    </div>
                </div>

                {/* Плавающие элементы */}
                <div className={`${styles.floating} ${styles.floating1}`}>
                    <div className={styles.kicker}>Технологии</div>
                    <strong>React + TypeScript</strong>
                </div>

                <div className={`${styles.floating} ${styles.floating2}`}>
                    <div className={styles.kicker}>Поддержка</div>
                    <strong>24/7 · Бесплатно 1 месяц</strong>
                </div>

                <div className={`${styles.floating} ${styles.floating3}`}>
                    <div className={styles.kicker}>SEO готовность</div>
                    <strong>Высокие позиции</strong>
                </div>
            </div>
        </section>
    );
};

export default Hero;