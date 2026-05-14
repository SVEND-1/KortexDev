import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';
import type { Project, Review, Request } from '../types';
import styles from '../style/Admin.module.scss';

type TabType = 'projects' | 'requests' | 'reviews';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [requests, setRequests] = useState<Request[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectImages, setProjectImages] = useState<FileList | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (!adminApi.isAuthenticated()) {
            window.location.href = '/admin/login';
            return;
        }
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Загрузка проектов...');
            const projectsData = await adminApi.getProjects();
            console.log('Проекты получены:', projectsData);
            setProjects(projectsData || []);

            console.log('Загрузка заявок...');
            const requestsData = await adminApi.getRequests();
            console.log('Заявки получены:', requestsData);
            setRequests(requestsData || []);

            console.log('Загрузка отзывов...');
            const reviewsData = await adminApi.getReviews();
            console.log('Отзывы получены:', reviewsData);
            setReviews(reviewsData || []);
        } catch (error: any) {
            console.error('Ошибка загрузки:', error);
            setError(error.message || 'Ошибка загрузки данных');
            showMessage('error', error.message || 'Ошибка загрузки данных');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleLogout = () => {
        adminApi.logout();
        window.location.href = '/admin/login';
    };

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            showMessage('error', 'Введите название проекта');
            return;
        }

        setCreating(true);
        try {
            const result = await adminApi.createProject(projectName, projectImages);
            if (result) {
                showMessage('success', 'Проект создан');
                setShowModal(false);
                setProjectName('');
                setProjectImages(null);
                await loadData();
            } else {
                showMessage('error', 'Ошибка создания проекта');
            }
        } catch (error: any) {
            console.error('Create error:', error);
            showMessage('error', error.message || 'Ошибка создания проекта');
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (confirm('Удалить проект?')) {
            try {
                await adminApi.deleteProject(id);
                showMessage('success', 'Проект удалён');
                await loadData();
            } catch (error: any) {
                console.error('Delete error:', error);
                showMessage('error', error.message || 'Ошибка удаления');
            }
        }
    };

    const handleDeleteRequest = async (id: number) => {
        if (confirm('Удалить заявку?')) {
            try {
                await adminApi.deleteRequest(id);
                showMessage('success', 'Заявка удалена');
                await loadData();
            } catch (error: any) {
                console.error('Delete error:', error);
                showMessage('error', error.message || 'Ошибка удаления');
            }
        }
    };

    const handleDeleteReview = async (id: number) => {
        if (confirm('Удалить отзыв?')) {
            try {
                await adminApi.deleteReview(id);
                showMessage('success', 'Отзыв удалён');
                await loadData();
            } catch (error: any) {
                console.error('Delete error:', error);
                showMessage('error', error.message || 'Ошибка удаления');
            }
        }
    };

    const getRequestTypeLabel = (type: string) => {
        return type === 'TELEGRAM' ? 'Telegram' : 'ВКонтакте';
    };

    const getProjectTypeIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('лендинг') || lowerName.includes('landing')) return '📄';
        if (lowerName.includes('платформ') || lowerName.includes('платформа')) return '⚙️';
        if (lowerName.includes('мобильн') || lowerName.includes('mobile')) return '📱';
        return '🌐';
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('data:')) return imagePath;

        if (imagePath.includes('uploads/project/')) {
            return `http://localhost:8080/${imagePath}`;
        }

        return `http://localhost:8080/uploads/project/${imagePath}`;
    };

    return (
        <div className={styles.adminContainer}>
            <nav className={styles.adminNav}>
                <div className={styles.navLogo}>{'</ ADMIN >'}</div>
                <div className={styles.navTabs}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.active : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        📁 Проекты ({projects.length})
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'requests' ? styles.active : ''}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        📋 Заявки ({requests.length})
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        ⭐ Отзывы ({reviews.length})
                    </button>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    Выйти
                </button>
            </nav>

            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            <div className={styles.adminContent}>
                {loading ? (
                    <div className={styles.loader}>Загрузка...</div>
                ) : error ? (
                    <div className={styles.errorBanner}>
                        <span>⚠️ {error}</span>
                        <button onClick={loadData}>Повторить</button>
                    </div>
                ) : (
                    <>
                        {/* Projects Tab */}
                        {activeTab === 'projects' && (
                            <div className={styles.tabContent}>
                                <div className={styles.tabHeader}>
                                    <h2>Управление проектами</h2>
                                    <button className={styles.createBtn} onClick={() => setShowModal(true)}>
                                        + Создать проект
                                    </button>
                                </div>

                                {projects.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <p>Нет проектов</p>
                                        <button className={styles.createBtn} onClick={() => setShowModal(true)}>
                                            Создать первый проект
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.tableWrapper}>
                                        <table className={styles.dataTable}>
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Иконка</th>
                                                <th>Название</th>
                                                <th>Изображения</th>
                                                <th>Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {projects.map((project) => (
                                                <tr key={project.id}>
                                                    <td>{project.id}</td>
                                                    <td className={styles.projectIcon}>{getProjectTypeIcon(project.name)}</td>
                                                    <td className={styles.projectName}>{project.name}</td>
                                                    <td>
                                                        {project.images && project.images.length > 0 ? (
                                                            <div className={styles.imagePreview}>
                                                                {project.images.slice(0, 2).map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={getImageUrl(img) || ''}
                                                                        alt=""
                                                                        className={styles.thumbnail}
                                                                        onError={(e) => {
                                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                                        }}
                                                                    />
                                                                ))}
                                                                {project.images.length > 2 && <span>+{project.images.length - 2}</span>}
                                                            </div>
                                                        ) : (
                                                            <span className={styles.noImage}>Нет фото</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className={styles.deleteBtn} onClick={() => handleDeleteProject(project.id)}>
                                                            🗑️ Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Requests Tab */}
                        {activeTab === 'requests' && (
                            <div className={styles.tabContent}>
                                <div className={styles.tabHeader}>
                                    <h2>Заявки на разработку ({requests.length})</h2>
                                </div>

                                {requests.length === 0 ? (
                                    <div className={styles.emptyState}>Нет заявок</div>
                                ) : (
                                    <div className={styles.tableWrapper}>
                                        <table className={styles.dataTable}>
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Имя</th>
                                                <th>Юзернейм</th>
                                                <th>Тип связи</th>
                                                <th>Дата</th>
                                                <th>Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {requests.map((request) => (
                                                <tr key={request.id}>
                                                    <td>{request.id}</td>
                                                    <td>{request.name}</td>
                                                    <td>{request.username}</td>
                                                    <td>
                                                            <span className={`${styles.requestType} ${styles[request.requestType?.toLowerCase() || 'telegram']}`}>
                                                                {getRequestTypeLabel(request.requestType)}
                                                            </span>
                                                    </td>
                                                    <td>{new Date(request.createAt).toLocaleDateString('ru-RU')}</td>
                                                    <td>
                                                        <button className={styles.deleteBtn} onClick={() => handleDeleteRequest(request.id)}>
                                                            🗑️ Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className={styles.tabContent}>
                                <div className={styles.tabHeader}>
                                    <h2>Отзывы клиентов ({reviews.length})</h2>
                                </div>

                                {reviews.length === 0 ? (
                                    <div className={styles.emptyState}>Нет отзывов</div>
                                ) : (
                                    <div className={styles.tableWrapper}>
                                        <table className={styles.dataTable}>
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Имя</th>
                                                <th>Отзыв</th>
                                                <th>Дата</th>
                                                <th>Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {reviews.map((review) => (
                                                <tr key={review.id}>
                                                    <td>{review.id}</td>
                                                    <td>{review.name}</td>
                                                    <td className={styles.reviewText}>{review.review}</td>
                                                    <td>{new Date(review.createAt).toLocaleDateString('ru-RU')}</td>
                                                    <td>
                                                        <button className={styles.deleteBtn} onClick={() => handleDeleteReview(review.id)}>
                                                            🗑️ Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal for Project Create */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        <h3>Новый проект</h3>
                        <div className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Название проекта</label>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="Например: Лендинг для ресторана"
                                />
                                <small>Добавьте в название тип проекта (Лендинг/Платформа/Мобильное)</small>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Изображения</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setProjectImages(e.target.files)}
                                />
                                <small>Можно выбрать несколько файлов (PNG, JPG, JPEG)</small>
                            </div>
                            <div className={styles.modalButtons}>
                                <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                                    Отмена
                                </button>
                                <button
                                    className={styles.submitBtn}
                                    onClick={handleCreateProject}
                                    disabled={creating}
                                >
                                    {creating ? 'Создание...' : 'Создать'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;