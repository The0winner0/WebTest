"use client";

import { useRef, useEffect, Children, cloneElement, useContext } from 'react';
import ScrollContext from './ScrollContext'; 

const IframeWrapper = ({ children }) => {
    const iframeRef = useRef(null);
    const { registerIframe, unregisterIframe } = useContext(ScrollContext);

    useEffect(() => {
        const iframeNode = iframeRef.current;
        if (iframeNode) {
            registerIframe(iframeNode);
            return () => {
                unregisterIframe(iframeNode);
            };
        }
    }, [registerIframe, unregisterIframe]);

    return Children.map(children, child => {
        if (child.type === 'div' && child.props.className === 'video-container') {
             const iframeChild = Children.toArray(child.props.children).find(
                c => c.type === 'iframe'
             );
             if (iframeChild) {
                return cloneElement(child, {
                    children: cloneElement(iframeChild, { ref: iframeRef })
                });
             }
        }
        return child;
    });
};

export default IframeWrapper;