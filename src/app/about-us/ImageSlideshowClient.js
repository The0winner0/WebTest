'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

export default function ImageSlideshowClient({ images, autoPlayInterval = 7000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  // 1. Create a dedicated function for scrolling
  // const scrollThumbnailIntoView = (index) => {
  //   if (thumbnailRefs.current[index]) {
  //     thumbnailRefs.current[index].scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'center',
  //     });
  //   }
  // };

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  }, [currentIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  }, [currentIndex, images.length]);

  useEffect(() => {
    if (autoPlayInterval === 0 || images.length === 0) return;
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [handleNext, autoPlayInterval, images.length]);


  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div className="slideshow-placeholder">No images in the gallery.</div>;
  }

  return (
    <div className="slideshow">
      <div className="slideshow__main-image-container">
        {images.map((image, index) => (
          <div key={index} className={`slideshow__slide ${index === currentIndex ? 'slideshow__slide--active' : ''}`}>
            <Image
              src={image.main}
              alt=""
              fill
              className="slideshow__image-background"
              quality={50}
              unoptimized={true}
            />
            <Image
              src={image.main}
              alt={`Gallery image ${index + 1}`}
              fill
              className="slideshow__image-foreground"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
              onError={(e) => e.target.style.display = 'none'}
              unoptimized={true}
            />
          </div>
        ))}
      </div>
      <div className="slideshow__controls-overlay">
        <button onClick={handlePrev} className="slideshow__nav-arrow slideshow__nav-arrow--prev" aria-label="Previous image">&#x25C0;</button>
        <div className="slideshow__thumbnails-wrapper">
          <div className="slideshow__thumbnails">
            {images.map((image, index) => (
              <button
                ref={el => thumbnailRefs.current[index] = el}
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`slideshow__thumbnail-button ${currentIndex === index ? 'slideshow__thumbnail-button--active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <Image
                  src={image.thumb}
                  alt={`Thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className="slideshow__thumbnail-image"
                  unoptimized={true}
                />
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="slideshow__nav-arrow slideshow__nav-arrow--next" aria-label="Next image">&#x25B6;</button>
      </div>
    </div>
  );
};