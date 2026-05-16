import React, { useState } from 'react';
import { api } from '../api/api';
import styles from '../style/ITUniverse.module.scss';

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [requestType, setRequestType] = useState<'TG' | 'VK'>('TG');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.createRequest({ name, username, requestType });
            setName('');
            setUsername('');
            setRequestType('TG');
            onSuccess();
            onClose();
        } catch (err) {
            setError('Ошибка при отправке заявки');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose}>✕</button>
                <h2 className={styles.modalTitle}>Оставить заявку</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.modalInput}
                    />
                    <input
                        type="text"
                        placeholder="Юзернейм (без @)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.modalInput}
                    />
                    <div className={styles.modalRadioGroup}>
                        <label className={styles.modalRadio}>
                            <input
                                type="radio"
                                value="TG"
                                checked={requestType === 'TG'}
                                onChange={() => setRequestType('TG')}
                            />
                            Telegram
                        </label>
                        <label className={styles.modalRadio}>
                            <input
                                type="radio"
                                value="VK"
                                checked={requestType === 'VK'}
                                onChange={() => setRequestType('VK')}
                            />
                            ВКонтакте
                        </label>
                    </div>
                    {error && <p className={styles.modalError}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.btn} ${styles.btnP}`}
                        style={{ justifyContent: 'center' }}
                    >
                        {loading ? 'Отправка...' : 'Отправить заявку →'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;
