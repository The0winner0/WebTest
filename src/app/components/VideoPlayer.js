"use client"


import '../HomeCss/VideoPlayer.css';
import IframeWrapper from './IframeWrapper';
const Player = () => {
    return (
        <IframeWrapper>
        <div className="video-container">
            <iframe
                className="elementor-video"
                src="https://www.youtube.com/embed/FWA1KXtFT-E?controls=1&rel=0&playsinline=1"
                loading="lazy"
                title="Kinesis Zonal RTLS demo"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                data-lenis-prevent
                 />
        </div>
        </IframeWrapper>
    )
}
export default Player;