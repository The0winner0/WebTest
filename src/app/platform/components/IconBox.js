import React from 'react';
import Icon from './Icon';

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

export default IconBox;