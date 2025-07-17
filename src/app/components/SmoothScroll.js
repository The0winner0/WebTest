// src/app/components/SmoothScrollLayout.js

"use client";

import { useEffect, useRef, useCallback, useState } from 'react';
import ScrollContext from './ScrollContext';
import { ScrollVariables } from '../contexts/ScrollVariables';

const SmoothScrollLayout = ({ children }) => {
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafId = useRef(null);
    const ease = 0.075;

    const [scrollValues, setScrollValues] = useState({ current: 0, upcoming: 0 });
    const [iframes, setIframes] = useState([]);
    
    const isSmoothScrollActive = useRef(true);
    const mousePos = useRef({ x: 0, y: 0 });
    const handoverCooldownRef = useRef(null);
    
    const isInternalScroll = useRef(false);

    const registerIframe = useCallback((iframeEl) => {
        setIframes(prev => [...prev, iframeEl]);
    }, []);

    const unregisterIframe = useCallback((iframeEl) => {
        setIframes(prev => prev.filter(el => el !== iframeEl));
    }, []);

    useEffect(() => {
        const doc = document.scrollingElement || document.documentElement;
        let bodyHeight = doc.scrollHeight;

        const ro = new ResizeObserver(entries => {
            bodyHeight = entries[0].target.scrollHeight;
        });
        ro.observe(doc);

        const enableSmoothScroll = () => {
            const scrollY = window.scrollY;
            isSmoothScrollActive.current = true;
            targetRef.current = scrollY;
            currentRef.current = scrollY;
            setScrollValues({ current: scrollY, upcoming: scrollY });
            iframes.forEach(iframe => iframe.style.pointerEvents = 'none');
        };
        
        const disableSmoothScroll = () => {
            isSmoothScrollActive.current = false;
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
            iframes.forEach(iframe => iframe.style.pointerEvents = 'auto');
        };

        const checkAndUpdateIframeState = () => {
            const { x, y } = mousePos.current;
            const isCurrentlyOverIframe = iframes.some(iframe => {
                const rect = iframe.getBoundingClientRect();
                return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
            });

            if (isCurrentlyOverIframe && isSmoothScrollActive.current) {
                clearTimeout(handoverCooldownRef.current);
                handoverCooldownRef.current = null;
                disableSmoothScroll();
            } else if (!isCurrentlyOverIframe && !isSmoothScrollActive.current) {
                if (!handoverCooldownRef.current) {
                    handoverCooldownRef.current = setTimeout(() => {
                        enableSmoothScroll();
                        handoverCooldownRef.current = null;
                    }, 200);
                }
            }
        };

        const update = () => {
            if (!isSmoothScrollActive.current) return;
            currentRef.current += (targetRef.current - currentRef.current) * ease;
            if (Math.abs(targetRef.current - currentRef.current) < 0.1) {
                currentRef.current = targetRef.current;
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            } else {
                rafId.current = requestAnimationFrame(update);
            }
            isInternalScroll.current = true;
            doc.scrollTo(0, Math.round(currentRef.current));
            setScrollValues({ current: currentRef.current, upcoming: targetRef.current });
        };

        const startAnimation = () => {
            if (!rafId.current && isSmoothScrollActive.current) {
                rafId.current = requestAnimationFrame(update);
            }
        };


        const onWheel = (e) => {
            if (handoverCooldownRef.current || !isSmoothScrollActive.current) return;
            if (!rafId.current) targetRef.current = window.scrollY;
            
            e.preventDefault();
            targetRef.current += e.deltaY;
            targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
            startAnimation();
        };

        const onKeyDown = (e) => {
            checkAndUpdateIframeState();
            if (handoverCooldownRef.current || !isSmoothScrollActive.current) return;

            let delta = 0;
            const viewHeight = window.innerHeight;
            
            switch (e.code) {
                case 'ArrowUp': delta = -100; break;
                case 'ArrowDown': delta = 100; break;
                case 'PageUp': delta = -viewHeight; break;
                case 'PageDown': delta = viewHeight; break;
                case 'Home': delta = -targetRef.current; break;
                case 'End': delta = bodyHeight - window.innerHeight - targetRef.current; break;
                case 'Space': delta = (e.shiftKey ? -1 : 1) * viewHeight * 0.9; break;
                default: return; 
            }
            
            e.preventDefault();
            if (!rafId.current) targetRef.current = window.scrollY;
            targetRef.current += delta;
            targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
            startAnimation();
        };

        const onScroll = () => {
            if (isInternalScroll.current) {
                isInternalScroll.current = false;
                return;
            }
            if (rafId.current) cancelAnimationFrame(rafId.current);
            rafId.current = null;
            const scrollY = Math.round(window.scrollY);
            targetRef.current = scrollY;
            currentRef.current = scrollY;
        };

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            checkAndUpdateIframeState();
        };
        
        const onClick = () => {
            checkAndUpdateIframeState();
        };
        
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        return () => {
            clearTimeout(handoverCooldownRef.current);
            if (rafId.current) cancelAnimationFrame(rafId.current);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            ro.disconnect();
        };
    }, [iframes]);

    return (
        <ScrollContext.Provider value={{ registerIframe, unregisterIframe }}>
            <ScrollVariables.Provider value={scrollValues}>
                <div>{children}</div>
            </ScrollVariables.Provider>
        </ScrollContext.Provider>
    );
};

export default SmoothScrollLayout;