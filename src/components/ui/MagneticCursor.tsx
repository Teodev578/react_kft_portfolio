import { useEffect, useRef } from 'react';
import '../../styles/magneticCursor.css';

export const MagneticCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            // On déplace le point central instantanément
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            // Le cercle extérieur suit avec un léger décalage (géré par CSS transition)
            ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            // Détection de survol pour l'effet magnétique sur les liens/boutons
            const target = e.target as HTMLElement;
            const isHoverable = target.closest('a, button, .clickable');

            if (isHoverable) {
                ring.classList.add('hovering');
                cursor.classList.add('hovering');
            } else {
                ring.classList.remove('hovering');
                cursor.classList.remove('hovering');
            }
        };

        const handleMouseDown = () => ring.classList.add('active');
        const handleMouseUp = () => ring.classList.remove('active');

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor-dot" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
};
