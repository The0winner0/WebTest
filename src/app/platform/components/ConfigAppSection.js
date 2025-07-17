'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getStrapiURL } from '../../lib/api';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, onNext, onPrev]);

    const currentImageSrc = images[currentIndex];
    if (!currentImageSrc) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close-btn" onClick={onClose}>&times;</button>
            <button className="lightbox-prev-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }}>&#10094;</button>
            <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
                <Image unoptimized={true} src={currentImageSrc} alt="Fullscreen view" layout="fill" objectFit="contain" />
            </div>
            <button className="lightbox-next-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>&#10095;</button>
        </div>
    );
};

export default function ConfigAppSection({ data }) {
    if (!data) return null;

    const { configAppTitle, configAppSubtitle, itemText, configAppGallery } = data;
    
    const galleryImageUrls = configAppGallery?.map(img => getStrapiURL(img.url)) || [];

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };
    
    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImageUrls.length);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImageUrls.length) % galleryImageUrls.length);
    };

    return (
        <>
            <section className="platform-section platform-config-app-container">
                <div className="platform-config-app-text">
                    <h2 className="platform-heading">{configAppTitle}</h2>
                    <p>{configAppSubtitle}</p>
                    <ul className="platform-list">
                        {itemText?.map(item => (
                            <li key={item.id} className="platform-list-item">
                                {item.itemText}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="platform-config-app-gallery">
                    <div className="platform-config-app-image-group">
                        {configAppGallery?.map((image, index) => (
                            <figure
                                key={image.id}
                                className="platform-config-app-image-item"
                                onClick={() => openLightbox(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Image
                                    unoptimized={true}
                                    alt={image.alternativeText || `Configuration App Image ${index + 1}`}
                                    loading="lazy"
                                    width="200"
                                    height="400"
                                    style={{ objectFit: 'contain' }}
                                    src={getStrapiURL(image.url)}
                                />
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {lightboxOpen && (
                <Lightbox
                    images={galleryImageUrls}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                />
            )}

            <style jsx global>{`
                .lightbox-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-color: rgba(0, 0, 0, 0.85); display: flex;
                    justify-content: center; align-items: center; z-index: 1000;
                    -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
                }
                .lightbox-image-container {
                    position: relative; width: 90vw; height: 85vh;
                }
                .lightbox-close-btn, .lightbox-prev-btn, .lightbox-next-btn {
                    position: absolute; background: none; border: none;
                    color: white; cursor: pointer; font-size: 2.5rem;
                    z-index: 1001; padding: 1rem; user-select: none;
                    transition: color 0.2s ease;
                }
                .lightbox-close-btn:hover, .lightbox-prev-btn:hover, .lightbox-next-btn:hover {
                    color: #ccc;
                }
                .lightbox-close-btn { top: 10px; right: 15px; font-size: 3rem; }
                .lightbox-prev-btn { left: 10px; }
                .lightbox-next-btn { right: 10px; }
            `}</style>
        </>
    );
}