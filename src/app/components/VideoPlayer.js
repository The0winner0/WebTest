"use client"

import '../HomeCss/VideoPlayer.css';
import IframeWrapper from './IframeWrapper';

const VideoPlayer = ({ data }) => {
    const { videoUrl, videoTitle } = data;

    return (
        <IframeWrapper>
            <div className="video-container">
                <iframe
                    className="elementor-video"
                    src={videoUrl}
                    loading="lazy"
                    title={videoTitle}
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

export default VideoPlayer;