import type { ServiceCard } from '../types';

export const servicesData: ServiceCard[] = [
    {
        id: 'landing',
        title: 'ЛЕНДИНГ',
        subtitle: 'Быстрый запуск, заявки и проверка гипотез',
        price: 'от 12 499 ₽',
        features: [
            { icon: '', title: 'Информационные страницы', description: 'Главная, Услуги, О нас, Контакты, Блог' },
            { icon: '', title: 'Админ панель', description: 'Управление контентом, фотогалереей, отзывами и акциями' },
            { icon: '', title: 'Ссылки на обратную связь', description: 'Telegram, WhatsApp, VK, форма обратной связи' },
        ],
        examples: [
            { industry: 'Химчистка', specialFeature: 'До/После с реальными фото', icon: '' },
            { industry: 'Ресторан', specialFeature: 'Интерактивное меню с ценами и составом блюд', icon: '' },
            { industry: 'Салон красоты', specialFeature: 'Портфолио работ и цены на услуги', icon: '' },
        ]
    },
    {
        id: 'platform',
        title: 'ВЕБ-ПЛАТФОРМА',
        subtitle: 'Сложная логика, личные кабинеты и автоматизация',
        price: 'Цена договорная',
        features: [
            { icon: '', title: 'Функционал под ключ', description: 'Любая сложность по договорённости. Делаем всё, что нужно для вашего бизнеса' },
            { icon: '', title: 'Роли и права', description: 'Админ, пользователи, персонал — разграничение доступа под разные задачи' },
            { icon: '', title: 'Регистрация и аккаунты', description: 'Личные кабинеты, авторизация, восстановление пароля' },
            { icon: '', title: 'Рассылки', description: 'Email и SMS уведомления для клиентов и сотрудников' },
        ],
        examples: [
            { industry: 'Доставка еды/цветов', specialFeature: 'Страница для курьера, трекинг заказов, уведомления', icon: '' },
            { industry: 'Запись к специалисту', specialFeature: 'Онлайн-запись к тренеру, врачу, мастеру с календарём', icon: '' },
            { industry: 'Онлайн-оплата', specialFeature: 'Интеграция с ЮKassa, СБП, оплата картами и счетами', icon: '' },
            { industry: 'И многое другое', specialFeature: 'Всё, что поможет развивать ваш бизнес', icon: '' },
        ]
    },
    {
        id: 'mobile',
        title: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
        subtitle: 'Скоро',
        price: 'Скоро',
        features: [
            { icon: '', title: 'Скоро', description: 'Следите за обновлениями' },
        ],
        examples: [
            { industry: 'Скоро', specialFeature: 'Скоро', icon: '' },
        ]
    }
];