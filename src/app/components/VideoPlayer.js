// src/app/components/VideoPlayer.js

"use client"

import { useRef, useEffect, useContext } from 'react';
import '../HomeCss/VideoPlayer.css';
import ScrollContext from './ScrollContext';

const VideoPlayer = ({ data }) => {
    const { videoUrl, videoTitle } = data;
    const iframeRef = useRef(null);
    
    const { registerIframe, unregisterIframe } = useContext(ScrollContext);

    useEffect(() => {
        const node = iframeRef.current;
        if (node) {
            registerIframe(node);
            return () => unregisterIframe(node);
        }
    }, [registerIframe, unregisterIframe]);

    return (
        <div className="video-container">
            <iframe
                ref={iframeRef}
                className="elementor-video"
                src={videoUrl}
                loading="lazy"
                title={videoTitle}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                scrolling="no"
                style={{ pointerEvents: 'none' }} 
            />
        </div>
    )
}

export default VideoPlayer;