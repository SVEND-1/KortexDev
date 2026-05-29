import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface ToastProps {
    message: string;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    return <div className={styles.toast}>{message}</div>;
};

export default Toast;