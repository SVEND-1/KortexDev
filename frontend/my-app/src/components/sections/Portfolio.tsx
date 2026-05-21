import React from 'react';
import type { Project } from '../../types';
import styles from '../../style/ITUniverse.module.scss';

interface PortfolioProps {
    projects: Project[];
    loading: boolean;
    currentImageIndex: { [key: number]: number };
    onNextImage: (projectId: number, totalImages: number) => void;
    onPrevImage: (projectId: number, totalImages: number) => void;
    onRequestClick: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
    projects, 
    loading, 
    currentImageIndex, 
    onNextImage, 
    onPrevImage, 
    onRequestClick 
}) => {
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
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash |= 0;
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <section id="portfolio" className={styles.portfolio}>
            <div className={`${styles.portfolioHeader} ${styles.revealRight}`}>
                <div>
                    <span className={styles.sectionTag}>Наши работы</span>
                    <h2 className={styles.sectionTitle}>
                        Выполненные <span className={styles.accent}>проекты</span>
                    </h2>
                </div>
                <button className={`${styles.portfolioMore} ${styles.hoverScale}`} onClick={onRequestClick}>
                    Хочу такой же →
                </button>
            </div>

            {loading ? (
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
                                                    <button className={`${styles.projectCarouselPrev} ${styles.hoverScale}`} onClick={(e) => { e.stopPropagation(); onPrevImage(project.id, totalImages); }}>‹</button>
                                                    <button className={`${styles.projectCarouselNext} ${styles.hoverScale}`} onClick={(e) => { e.stopPropagation(); onNextImage(project.id, totalImages); }}>›</button>
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
                    <button className={`${styles.btn} ${styles.btnG} ${styles.hoverScale}`} onClick={onRequestClick}>
                        Станьте первым клиентом
                    </button>
                </div>
            )}
        </section>
    );
};

export default Portfolio;