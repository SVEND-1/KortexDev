import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface ScrollProgressBarProps {
    progress: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
    return <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>;
};

export default ScrollProgressBar;