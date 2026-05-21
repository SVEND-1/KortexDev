import React, { useState } from 'react';
import { api } from '../../api/api';
import styles from "../../style/ITUniverse.module.scss"

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.createReview({ name, review });
            setName('');
            setReview('');
            onSuccess();
            onClose();
        } catch (err) {
            setError('Ошибка при отправке отзыва');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose}>✕</button>
                <h2 className={styles.modalTitle}>Оставить отзыв</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.modalInput}
                    />
                    <textarea
                        placeholder="Расскажите о вашем опыте работы с нами..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className={styles.modalTextarea}
                        rows={5}
                    />
                    {error && <p className={styles.modalError}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.btn} ${styles.btnP}`}
                        style={{ justifyContent: 'center' }}
                    >
                        {loading ? 'Отправка...' : 'Отправить отзыв →'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
