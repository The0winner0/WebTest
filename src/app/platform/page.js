import React from 'react';
import { getPlatformPageData } from '../lib/platform-page';

import HeroSection from './components/HeroSection';
import ConfigAppSection from './components/ConfigAppSection';
import ListSection from './components/sections/ListSection';
import ImageTextSection from './components/sections/ImageTextSection';
import SvgGridSection from './components/sections/SvgGridSection';

import dynamic from 'next/dynamic';

const LazyVideoPlayer = dynamic(() => import('../components/VideoPlayer'), {
    loading: () => <div style={{ height: '500px', width: '100%', backgroundColor: '#eee' }} />,
    ssr: false,
});

const BlockRenderer = ({ block }) => {
    switch (block.__component) {
        case 'kinesis-highlights.list-section':
            return <ListSection data={block} />;
        case 'kinesis-highlights.image-and-text-section':
            return <ImageTextSection data={block} />;
        case 'kinesis-highlights.svg-grid-section':
            return <SvgGridSection data={block} />;
        default:
            return null;
    }
};

export default async function PlatformPage() {
    const platformData = await getPlatformPageData();

    if (!platformData) {
        return <main><h1>Error: Page content not found.</h1></main>;
    }

    return (
        <main className="platform-main">
            <div className="platform-container">
                <div style={{ marginTop: '50px' }}></div>

                <HeroSection data={platformData} />
                
                {platformData.videoUrl && <LazyVideoPlayer data={platformData} />}

                {platformData.pageContent?.map(block => (
                    <BlockRenderer key={`block-${block.id}`} block={block} />
                ))}

                <ConfigAppSection data={platformData.configurationAppFields} />
            </div>
        </main>
    );
}