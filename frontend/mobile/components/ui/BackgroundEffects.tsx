import React from 'react';
import { useParticles } from '../hooks/useParticles';
import styles from '../../style/ITUniverse.module.scss';

const BackgroundEffects: React.FC = () => {
    useParticles();
    
    return (
        <>
            <div className={styles.gridBg}></div>
            <div className={styles.gridLines}></div>
            <div className={styles.particles} id="particles"></div>
        </>
    );
};

export default BackgroundEffects;