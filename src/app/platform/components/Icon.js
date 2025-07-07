import React from 'react';

const Icon = ({ pathData, viewBox = "0 0 512 512", className = "" }) => (
    <svg
        aria-hidden="true"
        className={className}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={pathData}></path>
    </svg>
);

export default Icon;