'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react'; // 1. Import useRef
import Image from 'next/image';
import { fetchAPI, getStrapiURL } from '../lib/api';

export default function ImageSlideshow({ autoPlayInterval = 7000 }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Create a ref to hold an array of the thumbnail button elements
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetchAPI('/api/gallery-images?populate=*');
        if (!res.data) throw new Error("Image data not found");

        const formattedImages = res.data
          .map(item => {
            if (!item.main?.url) return null;
            return {
              main: getStrapiURL(item.main.url),
              thumb: getStrapiURL(item.main.formats?.thumbnail?.url || item.main.url)
            };
          })
          .filter(Boolean);

        // Initialize the refs array with the correct size
        thumbnailRefs.current = thumbnailRefs.current.slice(0, formattedImages.length);
        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (autoPlayInterval === 0 || images.length === 0) return;
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [handleNext, autoPlayInterval, images.length]);

  // 3. Add a new useEffect to scroll the active thumbnail into view
  useEffect(() => {
    // Ensure the ref for the current index exists
    if (thumbnailRefs.current[currentIndex]) {
      // Tell the browser to scroll the container so this element is visible
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth', // for a smooth scrolling animation
        block: 'nearest',    // avoids vertical scrolling
        inline: 'center'     // scrolls horizontally to the center
      });
    }
  }, [currentIndex]); // This effect runs whenever the currentIndex changes

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) return <div className="slideshow-placeholder">Loading Gallery...</div>;
  if (error) return <div className="slideshow-placeholder">Error: {error}</div>;
  if (images.length === 0) return <div className="slideshow-placeholder">No images in the gallery.</div>;

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
              alt=""
              fill
              className="slideshow__image-background"
              quality={50}
            />
            <Image
              src={image.main}
              alt={`Gallery image ${index + 1}`}
              fill
              className="slideshow__image-foreground"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
              onError={(e) => e.target.style.display = 'none'}
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
                // 4. Assign the ref to each button element in the array
                ref={el => thumbnailRefs.current[index] = el}
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`slideshow__thumbnail-button ${currentIndex === index ? 'slideshow__thumbnail-button--active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <Image src={image.thumb} alt={`Thumbnail ${index + 1}`} width={150} height={150} className="slideshow__thumbnail-image" />
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="slideshow__nav-arrow slideshow__nav-arrow--next" aria-label="Next image">&#x25B6;</button>
      </div>
    </div>
  );
};