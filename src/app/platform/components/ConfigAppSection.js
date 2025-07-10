'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import BobileImage1 from "../../../../public/images/Platform/Platform-mobile-img1.webp";
import BobileImage2 from "../../../../public/images/Platform/Platform-mobile-img2.webp";
import BobileImage3 from "../../../../public/images/Platform/Platform-mobile-img3.webp";

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

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close-btn" onClick={onClose}>&times;</button>
            <button className="lightbox-prev-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }}>&#10094;</button>
            <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
                <Image unoptimized={true} src={images[currentIndex]} alt="Fullscreen view" layout="fill" objectFit="contain" />
            </div>
            <button className="lightbox-next-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>&#10095;</button>
        </div>
    );
};

export default function ConfigAppSection() {
    const galleryImages = [BobileImage1, BobileImage2, BobileImage3];

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
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <>
            <section className="platform-section platform-config-app-container">
                <div className="platform-config-app-text">
                    <h2 className="platform-heading">Configuration App</h2>
                    <p>The Atoll Locate app helps you manage your BLE Tags and Beacons.</p>
                    <ul className="platform-list">
                        <li className="platform-list-item">Scan for nearby BLE Tags and Beacons</li>
                        <li className="platform-list-item">Update device configuration</li>
                        <li className="platform-list-item">Locate devices on a map</li>
                    </ul>
                </div>
                <div className="platform-config-app-gallery">
                    <div className="platform-config-app-image-group">
                        {galleryImages.map((imageSrc, index) => (
                            <figure
                                key={index}
                                className="platform-config-app-image-item"
                                onClick={() => openLightbox(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Image unoptimized={true} alt={`Configuration App Image ${index + 1}`} loading="lazy" width="200" height="auto" src={imageSrc} />
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {lightboxOpen && (
                <Lightbox
                    images={galleryImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                />
            )}

            <style jsx global>{`
                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.85);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    -webkit-backdrop-filter: blur(5px);
                    backdrop-filter: blur(5px);
                }

                .lightbox-image-container {
                    position: relative;
                    width: 90vw;
                    height: 85vh;
                }
                
                .lightbox-close-btn, .lightbox-prev-btn, .lightbox-next-btn {
                    position: absolute;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 2.5rem;
                    z-index: 1001;
                    padding: 1rem;
                    user-select: none;
                    transition: color 0.2s ease;
                }

                .lightbox-close-btn:hover, .lightbox-prev-btn:hover, .lightbox-next-btn:hover {
                    color: #ccc;
                }

                .lightbox-close-btn {
                    top: 10px;
                    right: 15px;
                    font-size: 3rem;
                }

                .lightbox-prev-btn {
                    left: 10px;
                }

                .lightbox-next-btn {
                    right: 10px;
                }
            `}</style>
        </>
    );
}