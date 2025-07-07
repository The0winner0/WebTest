"use client";

import { useEffect, useRef } from 'react';

const SmoothScrollLayout = ({ children }) => {
    const scrollContainerRef = useRef(null);
    const currentRef = useRef(0);
    const targetRef = useRef(0);
    const ease = 0.075;
    const rafId = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const doc = document.scrollingElement || document.documentElement;
        let bodyHeight = doc.scrollHeight;
        
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                bodyHeight = entry.target.scrollHeight;
            }
        });

        ro.observe(doc);

        const update = () => {
            currentRef.current += (targetRef.current - currentRef.current) * ease;
            
            if (Math.abs(targetRef.current - currentRef.current) < 0.1) {
                doc.scrollTo(0, targetRef.current);
                if (rafId.current) {
                    cancelAnimationFrame(rafId.current);
                    rafId.current = null;
                }
            } else {
                doc.scrollTo(0, currentRef.current);
                rafId.current = requestAnimationFrame(update);
            }
        };

        const startAnimation = () => {
            if (!rafId.current) {
                rafId.current = requestAnimationFrame(update);
            }
        };

        const onWheel = (e) => {
            e.preventDefault();
            targetRef.current += e.deltaY;
            targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
            startAnimation();
        };

        const onKeyDown = (e) => {
            let delta = 0;
            const viewHeight = window.innerHeight;
            switch (e.code) {
                case 'ArrowDown': delta = 100; break;
                case 'ArrowUp': delta = -100; break;
                case 'PageDown': delta = viewHeight; break;
                case 'PageUp': delta = -viewHeight; break;
                case 'Space': delta = (e.shiftKey ? -1 : 1) * viewHeight * 0.9; break;
                case 'Home': targetRef.current = 0; break;
                case 'End': targetRef.current = bodyHeight - viewHeight; break;
                default: return;
            }

            if (delta) {
                targetRef.current += delta;
            }
            
            targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
            startAnimation();
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            ro.disconnect();
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return <div ref={scrollContainerRef}>{children}</div>;
};

export default SmoothScrollLayout;