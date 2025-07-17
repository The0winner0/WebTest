"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../HomeCss/Partners.css';
import { getStrapiURL } from '../lib/api';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        
        listener();
        
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

const PartnerScroller = ({ items }) => {
    const [isPaused, setIsPaused] = useState(false);
    const shouldAnimate = useMediaQuery(`(max-width: ${items?.length * 200}px)`);

    const displayItems = shouldAnimate ? [...(items || []), ...(items || [])] : items;

    return (
        <div
            className="scroller-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`scroller-content ${shouldAnimate ? 'animate' : 'static-grid'} ${isPaused ? 'paused' : ''}`}>
                {displayItems?.map((item, index) => {
                    // Access .url and .alternativeText directly from item.logo
                    const imageUrl = getStrapiURL(item.logo[0].url);
                    const imageAlt = item.logo?.alternativeText || `${item.name} Logo`;

                    if (!imageUrl) return null; // Don't render if there's no image

                    return (
                        <a
                            key={`${item.id}-${index}`}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={item.name}
                            className="partner-logo-link"
                        >
                            <Image 
                                unoptimized={true} 
                                src={imageUrl}
                                alt={imageAlt}
                                width={160}
                                height={80}
                                style={{ objectFit: "contain" }}
                                className="partner-logo"
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

const Partners = ({ data }) => {
    if (!data) return null;
    
    const { partnersTitle, partners } = data;
    console.log("Partners Data:", data.partners[0].logo[0].url);
    return (
        <div className="Partners-container">
            <p className="Partners__title">
                {partnersTitle}
            </p>
            <PartnerScroller items={partners} />
        </div>
    );
}; 

export default Partners;