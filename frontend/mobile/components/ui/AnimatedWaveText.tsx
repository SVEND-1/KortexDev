import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface AnimatedWaveTextProps {
    text: string;
}

const AnimatedWaveText: React.FC<AnimatedWaveTextProps> = ({ text }) => (
    <span className={styles.textWaveContainer}>
        {text.split('').map((char, i) => (
            <span
                key={i}
                className={styles.textWaveLetter}
                style={{ '--i': i } as React.CSSProperties}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))}
    </span>
);

export default AnimatedWaveText;