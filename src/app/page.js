// /app/page.js

import React, { Suspense } from "react";
import { getHomepageData } from "./lib/homepage";
import { getPostsBySlugs } from "./lib/posts"; 
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import BusinessVerticals from "./components/BusinessVerticals";
import Rtlv from "./components/Rtlv";
import VideoPlayer from "./components/VideoPlayer.js";
import BlogGrid from "./blog/components/BlogGrid";
import InsightsSection from "./components/InsightsSection";

export default async function HomePage() {
  const homepageData = await getHomepageData();
  // console.log("Homepage Data:", homepageData);
  if (!homepageData) {
    return (
      <main>
        <h1>Error</h1>
        <p>The page content could not be loaded. Please try again later.</p>
      </main>
    );
  }

  const slugsToShow = homepageData.featuredPostSlugs?.map(item => item.slug) || [];

  const featuredPosts = await getPostsBySlugs(slugsToShow);

  return (
    <div>
      <Hero data={homepageData.heroSection} />
      <Partners data={homepageData.partnersSection} />
      <BusinessVerticals data={homepageData.verticalsSection} />
      <Rtlv data={homepageData.rtlvSection} />
      <VideoPlayer data={homepageData.videoSection} />
      <InsightsSection data={homepageData.insightsSection} />

      <div className="home-page-blog-grid">
        <Suspense fallback={<div>Loading featured posts...</div>}>
          <BlogGrid posts={featuredPosts} />
        </Suspense>
      </div>
    </div>
  );
}