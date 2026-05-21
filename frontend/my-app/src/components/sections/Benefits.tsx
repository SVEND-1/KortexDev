import React from 'react';
import styles from '../../style/ITUniverse.module.scss';

interface Benefit {
    icon: string;
    title: string;
    description: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
    return (
        <section id="benefits" className={styles.benefits}>
            <div className={`${styles.benefitsHeader} ${styles.revealBlur}`}>
                <span className={styles.sectionTag}>Почему это выгодно</span>
                <h2 className={styles.sectionTitle}>
                    Чем полезен <span className={styles.accent}>сайт для бизнеса</span>
                </h2>
            </div>

            <div className={styles.benefitsGrid}>
                {benefits.map((benefit, idx) => (
                    <div key={idx} className={`${styles.benefitCard} ${styles.cardRaise}`}>
                        <div className={`${styles.benefitIcon} ${styles.hoverRotate}`}>{benefit.icon}</div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;