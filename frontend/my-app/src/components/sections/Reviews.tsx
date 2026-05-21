import React from 'react';
import type { Review } from '../../types';
import styles from '../../style/ITUniverse.module.scss';

interface ReviewsProps {
    reviews: Review[];
    loading: boolean;
    onReviewClick: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, loading, onReviewClick }) => {
    const marqueeReviews = reviews.length > 0 ? [...reviews, ...reviews] : [];

    return (
        <section id="reviews" className={styles.reviews}>
            <div className={`${styles.reviewsHeader} ${styles.revealLeft}`}>
                <div>
                    <span className={styles.sectionTag}>Отзывы клиентов</span>
                    <h2 className={styles.sectionTitle}>
                        Что говорят <span className={styles.accent}>о нас</span>
                    </h2>
                </div>
                <button className={`${styles.btn} ${styles.btnG} ${styles.reviewBtn} ${styles.glowPulse}`} onClick={onReviewClick}>
                    Оставить отзыв
                </button>
            </div>

            {loading ? (
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
    );
};

export default Reviews;