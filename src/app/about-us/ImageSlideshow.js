'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// add more images direcly here if needed
const galleryImages = [
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/03/Slide-16_9-2.png?fit=1920%2C1080&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/03/Slide-16_9-2.png?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.41.35-PM-e1650619428475.jpeg?fit=768%2C568&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.41.35-PM-e1650619428475.jpeg?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/03/Slide-16_9-1.png?fit=1920%2C1080&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/03/Slide-16_9-1.png?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.06.19-PM-2.jpeg?fit=1024%2C768&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.06.19-PM-2.jpeg?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.45.49-PM-e1650619519750.jpeg?fit=798%2C701&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.45.49-PM-e1650619519750.jpeg?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.06.19-PM-e1650614812619.jpeg?fit=768%2C568&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-04-22-at-1.06.19-PM-e1650614812619.jpeg?resize=150%2C150&ssl=1" },
  { main: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-02-04-at-11.59.45-AM.jpeg?fit=1024%2C768&ssl=1", thumb: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/WhatsApp-Image-2022-02-04-at-11.59.45-AM.jpeg?resize=150%2C150&ssl=1" },
];

export default function ImageSlideshow({ autoPlayInterval = 7000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = galleryImages;

  // FIX: Wrap handler in useCallback to stabilize the function reference.
  // It only needs to be recreated if the number of images changes.
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // FIX: Do the same for handlePrev for consistency.
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Set up the auto-play interval
  useEffect(() => {
    if (autoPlayInterval === 0) return; // Disable autoplay if interval is 0

    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
    
    // FIX: Add handleNext to the dependency array. Since handleNext is now
    // memoized with useCallback, this effect will only reset the interval
    // if autoPlayInterval changes or if handleNext itself changes (i.e., when images.length changes).
  }, [handleNext, autoPlayInterval]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="slideshow">
      <div className="slideshow__main-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slideshow__slide ${index === currentIndex ? 'slideshow__slide--active' : ''}`}
          >
            <Image
              src={image.main}
              alt={`Gallery image ${index + 1}`}
              fill
              className="slideshow__image"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
              onError={(e) => e.target.style.display = 'none'} // Basic fallback
            />
          </div>
        ))}
      </div>

      <div className="slideshow__controls-overlay">
        <button 
          onClick={handlePrev} 
          className="slideshow__nav-arrow slideshow__nav-arrow--prev"
          aria-label="Previous image"
        >
          &#x25C0;
        </button>

        <div className="slideshow__thumbnails-wrapper">
          <div className="slideshow__thumbnails">
            {images.map((image, index) => (
              <button
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
                />
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleNext} 
          className="slideshow__nav-arrow slideshow__nav-arrow--next"
          aria-label="Next image"
        >
          &#x25B6;
        </button>
      </div>
    </div>
  );
};
