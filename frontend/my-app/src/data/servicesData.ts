import type { ServiceCard } from '../types';

export const servicesData: ServiceCard[] = [
    {
        id: 'landing',
        title: 'ЛЕНДИНГ',
        subtitle: 'Продающий одностраничный сайт',
        price: 'от 50 000 ₽',
        features: [
            { icon: '', title: 'Информационные страницы', description: 'Главная, Услуги, О нас, Контакты, Блог' },
            { icon: '', title: 'Админ панель', description: 'Управление контентом, фотогалереей, отзывами и акциями' },
            { icon: '', title: 'Ссылки на обратную связь', description: 'Telegram, WhatsApp, VK, форма обратной связи' },
            { icon: '', title: 'Аналитика', description: 'Подключение Яндекс.Метрики и Google Analytics' },
            { icon: '', title: 'Уникальный дизайн', description: 'Разработанный под ваш бизнес и целевую аудиторию' },
            { icon: '', title: 'Адаптивность', description: 'Корректное отображение на всех устройствах' }
        ],
        examples: [
            { industry: 'Химчистка', specialFeature: 'До/После с реальными фото', icon: '' },
            { industry: 'Ресторан', specialFeature: 'Интерактивное меню с ценами и составом', icon: '' },
            { industry: 'Автосервис', specialFeature: 'Прайс-лист и онлайн запись', icon: '' },
            { industry: 'Салон красоты', specialFeature: 'Портфолио работ и цены', icon: '' },
            { industry: 'Строительство', specialFeature: 'Калькулятор стоимости работ', icon: '' },
            { industry: 'Юридические услуги', specialFeature: 'База знаний и документы онлайн', icon: '' }
        ]
    },
    {
        id: 'platform',
        title: 'ВЕБ-ПЛАТФОРМА',
        subtitle: 'Многофункциональный сервис',
        price: 'от 300 000 ₽',
        features: [
            { icon: '', title: 'Онлайн оплата', description: 'Интеграция с ЮKassa, Stripe, Tinkoff' },
            { icon: '', title: 'Оформление заказа', description: 'Корзина, оформление, история заказов' },
            { icon: '', title: 'Доставка', description: 'Страница для курьера, трекинг, уведомления' },
            { icon: '', title: 'Онлайн оповещение', description: 'Email и Telegram уведомления о статусах' },
            { icon: '', title: 'Запись на услугу', description: 'Календарь, управление временем, напоминания' },
            { icon: '', title: 'Личный кабинет', description: 'История, бонусы, избранное' },
            { icon: '', title: 'Роли и права', description: 'Админ, менеджер, курьер, клиент' },
            { icon: '', title: 'Функционал под ключ', description: 'Любая сложность по договорённости' }
        ],
        examples: [
            { industry: 'Доставка еды', specialFeature: 'Онлайн оплата, трекинг курьера, Push-уведомления', icon: '' },
            { industry: 'Фитнес клуб', specialFeature: 'Запись на тренировки, абонементы, онлайн-оплата', icon: '' },
            { industry: 'Медицина', specialFeature: 'Запись к врачу, телемедицина, результаты анализов', icon: '' },
            { industry: 'Маркетплейс', specialFeature: 'Продавцы и покупатели, рейтинги, отзывы', icon: '' }
        ]
    },
    {
        id: 'mobile',
        title: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
        subtitle: 'Нативные приложения для iOS и Android',
        price: 'от 200 000 ₽',
        features: [
            { icon: '', title: 'Нативная разработка', description: 'iOS (Swift) и Android (Kotlin/Java)' },
            { icon: '', title: 'Высокая производительность', description: 'Плавная работа и оптимизация под устройства' },
            { icon: '', title: 'Push-уведомления', description: 'Мгновенное оповещение пользователей' },
            { icon: '', title: 'Офлайн режим', description: 'Работа приложения без интернета' },
            { icon: '', title: 'Биометрия', description: 'Вход по Face ID / Touch ID / отпечатку пальца' },
            { icon: '', title: 'Интеграция с камерой', description: 'Сканер QR-кодов, загрузка фото' },
            { icon: '', title: 'Геолокация', description: 'Карты, трекинг, маршруты' },
            { icon: '', title: 'Apple Pay / Google Pay', description: 'Быстрая и безопасная оплата' }
        ],
        examples: [
            { industry: 'Доставка', specialFeature: 'Приложение для клиентов и курьеров с трекингом', icon: '' },
            { industry: 'Фитнес', specialFeature: 'Тренировки, отслеживание прогресса, чат с тренером', icon: '' },
            { industry: 'Медицина', specialFeature: 'Запись, телемедицина, напоминания о приёме', icon: '' },
            { industry: 'Маркетплейс', specialFeature: 'Каталог, корзина, оплата, отзывы', icon: '' }
        ]
    }
];