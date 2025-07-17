import React from 'react';
import FadeInSection from './FadeInSection';
import '../HomeCss/BusinessVerticals.css';

const VerticalCard = ({ icon, viewBox, title, description, delay, isAlternate }) => {
    const iconWrapperClasses = `bdt-ep-advanced-icon-box-icon-wrap ${isAlternate ? 'bdt-ep-advanced-icon-box-2' : ''}`;

    return (
        <FadeInSection delay={delay}>
            <div className="vertical-card">
                <div className={iconWrapperClasses}>
                    <svg className="e-font-icon-svg" fill="currentColor" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                        <path d={icon} />
                    </svg>
                </div>
                <h4 className="vertical-title">{title}</h4>
                <p className="vertical-desc">{description}</p>
            </div>
        </FadeInSection>
    );
};

const BusinessVerticals = ({ data }) => {
    const { verticalsTitle, verticals } = data;

    return (
        <section className="business-verticals">
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '0px'}}>
                <p style={{fontSize: '3rem', color: 'white', fontWeight: 400}}>{verticalsTitle}</p>
            </div>
            <div className="verticals-row">
                {verticals.map((vertical, index) => (
                    <VerticalCard 
                        key={vertical.id} 
                        title={vertical.title}
                        description={vertical.description}
                        icon={vertical.iconSvgPath}
                        viewBox={vertical.iconViewBox}
                        delay={(index + 1) * 100}
                        isAlternate={index % 2 !== 0} 
                    />
                ))}
            </div>
        </section>
    );
};

export default BusinessVerticals;