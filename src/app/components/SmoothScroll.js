// src/app/components/SmoothScroll.js

"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import ScrollContext from './ScrollContext'; 
import { ScrollVariables } from '../contexts/ScrollVariables'; 

const SmoothScrollLayout = ({ children }) => {
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafId = useRef(null);
    let current = 0;
    const ease = 0.075;

    const [scrollValues, setScrollValues] = useState({ current: 0, upcoming: 0 });

    const [iframes, setIframes] = useState([]);
    const isMouseOverIframe = useRef(false);

    const registerIframe = useCallback((iframeEl) => {
        setIframes(prevIframes => [...prevIframes, iframeEl]);
    }, []);

    const unregisterIframe = useCallback((iframeEl) => {
        setIframes(prevIframes => prevIframes.filter(el => el !== iframeEl));
    }, []);

    useEffect(() => {
        const doc = document.scrollingElement || document.documentElement;
        let bodyHeight = doc.scrollHeight;

        const ro = new ResizeObserver(entries => {
            bodyHeight = entries[0].target.scrollHeight;
        });
        ro.observe(doc);

        const update = () => {
            setScrollValues({ current: currentRef.current, upcoming: targetRef.current });
            currentRef.current += (targetRef.current - currentRef.current) * ease;
            doc.scrollTo(0, Math.round(currentRef.current)); 

            setScrollValues({ current: currentRef.current, upcoming: targetRef.current });

            if (Math.abs(targetRef.current - currentRef.current) < 0.1) {
                currentRef.current = targetRef.current;
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            } else {
                rafId.current = requestAnimationFrame(update);
            }
        };

        const startAnimation = () => {
            if (!rafId.current) {
                currentRef.current = window.scrollY;
                rafId.current = requestAnimationFrame(update);
            }
        };

        const onWheel = (e) => {
            // console.log("a");
            if(isMouseOverIframe.current) return;
            setScrollValues({ current: currentRef.current, upcoming: targetRef.current });
            if(!current){
                current = 1;
                targetRef.current = window.scrollY;
                currentRef.current = window.scrollY;
                iframes.forEach(iframe => iframe.style.pointerEvents = 'none');
            }
            e.preventDefault();

            targetRef.current += e.deltaY;
            targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
            startAnimation();
        };

        const onKeyDown = (e) => {
            
             if (Math.abs(window.scrollY - targetRef.current) > 1) {
                targetRef.current = window.scrollY;
                currentRef.current = window.scrollY;
            }

             let delta = 0;
             const viewHeight = window.innerHeight;
             switch (e.code) {
                 
                 case 'ArrowDown': delta = 200; break;
                 case 'ArrowUp': delta = -200; break;
                 case 'PageDown': delta = viewHeight; break;
                 case 'PageUp': delta = -viewHeight; break;
                 case 'Space': delta = (e.shiftKey ? -1 : 1) * viewHeight * 0.9; break;
                 case 'Home': targetRef.current = 0; break;
                 case 'End': targetRef.current = bodyHeight - viewHeight; break;
                 default: {
                     targetRef.current = window.scrollY;
                     currentRef.current = window.scrollY;
                     return;
                 };
             }

             if (delta) {
                 targetRef.current += delta;
             }
             setScrollValues({ current: currentRef.current, upcoming: targetRef.current });
             targetRef.current = Math.max(0, Math.min(targetRef.current, bodyHeight - window.innerHeight));
             startAnimation();
        };
        
        const handleWindowBlur = () => {
            if(document.activeElement) {
                document.activeElement.blur();
            }
        };

        const handleClick = () => {
            iframes.forEach(iframe => iframe.style.pointerEvents = 'auto');
            current = 0;
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('click', handleClick);
        const handleMouseEnter = () =>{
            iframes.forEach(iframe => iframe.style.pointerEvents = 'auto');
            isMouseOverIframe.current = true;
            // console.log(isMouseOverIframe.current);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('blur', handleWindowBlur);
            window.removeEventListener('click', handleClick);
            
        }
        const handleMouseLeave = () => { 
            isMouseOverIframe.current = false; 
            // console.log(isMouseOverIframe.current);
            window.addEventListener('wheel', onWheel, { passive: false });
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('blur', handleWindowBlur);
            window.addEventListener('click', handleClick);
        
        }

        iframes.forEach(iframe => {
            iframe.addEventListener('mouseenter', handleMouseEnter);
            iframe.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            iframes.forEach(iframe => {
                iframe.removeEventListener('mouseenter', handleMouseEnter);
                iframe.removeEventListener('mouseleave',handleMouseLeave);
            });
            window.removeEventListener('wheel', onWheel);
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