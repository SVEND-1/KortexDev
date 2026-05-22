import React from 'react';
import type { Review } from '../../types';
import styles from '../../style/Reviews.module.scss';

interface ReviewsProps {
    reviews: Review[];
    loading: boolean;
    onReviewClick: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, loading, onReviewClick }) => {
    const marqueeReviews = reviews.length > 0 ? [...reviews, ...reviews] : [];

    return (
        <section id="reviews" className={styles.reviews}>
            <div className={styles.bgGlow} />
            <div className={styles.container}>
                <div className={styles.reviewsHeader}>
                    <div>
                        <span className={styles.sectionTag}>Отзывы клиентов</span>
                        <h2 className={styles.sectionTitle}>
                            Что говорят <span className={styles.accent}>о нас</span>
                        </h2>
                        <p className={styles.sectionText}>
                            Живые отзывы от людей, которые уже воспользовались услугой.
                        </p>
                    </div>

                    <button className={styles.reviewBtn} onClick={onReviewClick}>
                        Оставить отзыв
                    </button>
                </div>

                {loading ? (
                    <div className={styles.loader}>Загрузка отзывов...</div>
                ) : reviews.length === 0 ? (
                    <div className={styles.emptyState}>Пока нет отзывов. Будьте первым!</div>
                ) : reviews.length < 3 ? (
                    <div className={styles.reviewsGrid}>
                        {reviews.map((review, index) => (
                            <article
                                key={review.id}
                                className={styles.reviewCard}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className={styles.cardTop}>
                                    <div className={styles.reviewAvatar}>
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className={styles.cardMeta}>
                                        <div className={styles.reviewName}>{review.name}</div>
                                        <div className={styles.reviewDate}>
                                            {new Date(review.createAt).toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.reviewText}>{review.review}</p>

                                <div className={styles.cardFooter}>
                                    <span className={styles.badge}>Проверенный клиент</span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={styles.reviewsMarqueeWrap}>
                        <div className={styles.reviewsMarquee}>
                            {marqueeReviews.map((review, idx) => (
                                <article key={`${review.id}-${idx}`} className={styles.reviewCard}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.reviewAvatar}>
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className={styles.cardMeta}>
                                            <div className={styles.reviewName}>{review.name}</div>
                                            <div className={styles.reviewDate}>
                                                {new Date(review.createAt).toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <p className={styles.reviewText}>{review.review}</p>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.badge}>Проверенный клиент</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Reviews;