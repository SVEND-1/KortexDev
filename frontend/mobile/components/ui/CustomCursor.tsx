import React, { useEffect, useRef } from 'react';
import styles from '../../style/ITUniverse.module.scss';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0;
        let rx = 0, ry = 0;
        let animFrame: number;

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.left = mx + 'px';
                cursorRef.current.style.top = my + 'px';
            }
        };

        const animateRing = () => {
            rx += (mx - rx) * 0.09;
            ry += (my - ry) * 0.09;
            if (ringRef.current) {
                ringRef.current.style.left = rx + 'px';
                ringRef.current.style.top = ry + 'px';
            }
            animFrame = requestAnimationFrame(animateRing);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateRing();

        const interactiveEls = document.querySelectorAll('a, button');
        const onEnter = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px'; }
            if (ringRef.current) { ringRef.current.style.width = '48px'; ringRef.current.style.height = '48px'; ringRef.current.style.borderColor = 'rgba(109,92,232,0.5)'; }
        };
        const onLeave = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '5px'; cursorRef.current.style.height = '5px'; }
            if (ringRef.current) { ringRef.current.style.width = '28px'; ringRef.current.style.height = '28px'; ringRef.current.style.borderColor = 'rgba(255,255,255,0.18)'; }
        };

        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrame);
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            <div id="cursor" ref={cursorRef} className={styles.cursor}></div>
            <div id="cursor-ring" ref={ringRef} className={styles.cursorRing}></div>
        </>
    );
};

export default CustomCursor;