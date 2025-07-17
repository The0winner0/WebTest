import React from 'react';

// Assuming Icon and IconBox components are in the same directory or imported correctly
const Icon = ({ pathData, viewBox = "0 0 512 512", className = "" }) => (
    <svg
        aria-hidden="true"
        className={className}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d={pathData}></path>
    </svg>
);

const IconBox = ({ iconPath, title, description, viewBox }) => {
    return (
        <div className="platform-icon-box">
            <Icon pathData={iconPath} viewBox={viewBox} className="platform-icon-box-svg" />
            <div>
                <p className="platform-icon-box-title">{title}</p>
                <div className="platform-icon-box-description">{description}</div>
            </div>
        </div>
    );
};


const SvgGridSection = ({ data }) => {
    if (!data) return null;

    const { title, description, gridItems } = data;

    return (
        <section className="platform-section">
            <h2 className="platform-heading">{title}</h2>
            {description && (
                <p className="platform-section-description">{description}</p>
            )}
            <div className="platform-svg-container">
                {gridItems?.map(item => (
                    <div key={item.id} className="platform-feature-container">
                        <IconBox
                            iconPath={item.iconSvgPath}
                            title={item.title}
                            description={item.description}
                            viewBox={item.iconViewBox}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SvgGridSection;