import React from "react";
import Hero from './components/Hero';
import Partners from './components/Partners';
import BusinessVerticals from './components/BusinessVerticals';
import Rtlv from './components/Rtlv';
import VideoPlayer from './components/VideoPlayer.js';
import BlogSection from './components/Blog/BlogSection';
import InsightsSection from './components/InsightsSection';

export default function HomePage() {
    return (
        <div>
            <Hero />
            <Partners />
            <BusinessVerticals />
            <Rtlv />
            <VideoPlayer />
            <InsightsSection />
            <BlogSection />
        </div>
    );
}