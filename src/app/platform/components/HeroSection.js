import React from 'react';
import PageHeading from '../../components/PageHeading';
const HeroSection = ({ data }) => {
    if (!data) return null;

    const { heroTitle, heroSubtitle } = data;

    return (
        <section className="platform-section platform-hero-section">
            <PageHeading title={"Platform"} />
            {heroTitle && <h1 className="platform-heading">{heroTitle}</h1>}
            {heroSubtitle && <p className="platform-subheading">{heroSubtitle}</p>}
        </section>
    );
};

export default HeroSection;