"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../HomeCss/Partners.css';

import hpeArubaLogo from '../../../public/images/HPW-Aruba.png';
import qualcommLogo from '../../../public/images/Qualcomm.png';
import nxpLogo from '../../../public/images/NXP.png';
import wirepasLogo from '../../../public/images/Wirepass.png';
import ciscoLogo from '../../../public/images/Cisco.png';
import firaLogo from '../../../public/images/Fira.png';

const partnersData = [
    {
        id: 1,
        name: 'HPE Aruba',
        imageUrl: hpeArubaLogo,
        linkUrl: 'https://www.arubanetworks.com/partners/technology-partners/partner-finder/#keyword=atoll%20solutions',
    },
    {
        id: 2,
        name: 'Qualcomm',
        imageUrl: qualcommLogo,
        linkUrl: 'https://www.qualcomm.com/support/qan/member-directory/member.atoll-solutions-private-ltd',
    },
    {
        id: 3,
        name: 'NXP',
        imageUrl: nxpLogo,
        linkUrl: 'https://www.nxp.com/webapp/connect/displayPartnerProfile.sp?partnerId=17420&offeringId=19561',
    },
    {
        id: 4,
        name: 'Wirepas',
        imageUrl: wirepasLogo,
        linkUrl: 'https://www.wirepas.com/partner-products',
    },
    {
        id: 5,
        name: 'Cisco',
        imageUrl: ciscoLogo,
        linkUrl: 'https://developer.cisco.com/ecosystem/cpp/partners/192283/',
    },
    {
        id: 6,
        name: 'Fira Consortium',
        imageUrl: firaLogo,
        linkUrl: 'https://www.firaconsortium.org/about/members',
    },
];

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        
        // Set initial state
        listener();
        
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

const PartnerScroller = ({ items }) => {
    const [isPaused, setIsPaused] = useState(false);
    // When the screen is 1024px or less, the slideshow will be active.
    const shouldAnimate = useMediaQuery(`(max-width: ${partnersData.length * 200}px)`);

    // Duplicate items for a seamless animation loop only when animating
    const displayItems = shouldAnimate ? [...items, ...items] : items;

    return (
        <div
            className="scroller-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`scroller-content ${shouldAnimate ? 'animate' : 'static-grid'} ${isPaused ? 'paused' : ''}`}>
                {displayItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.name}
                        className="partner-logo-link"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={`${item.name} Logo`}
                            width={160}
                            height={80}
                            style={{ objectFit: "contain" }}
                            className="partner-logo"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

const Partners = () => {
    return (
        <div className="Partners-container">
            <p className="Partners__title">
                We’ve deployed over 25 projects in partnership with technology leaders
            </p>
            <PartnerScroller items={partnersData} />
        </div>
    );
};

export default Partners;