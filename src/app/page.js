import React from "react";
import { getPostsBySlugs } from "./lib/posts";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import BusinessVerticals from "./components/BusinessVerticals";
import Rtlv from "./components/Rtlv";
import VideoPlayer from "./components/VideoPlayer.js";
import BlogGrid from "./blog/components/BlogGrid";
import InsightsSection from "./components/InsightsSection";

export default async function HomePage() {
  const slugsToShow = [
    "first",
    "real-time-location-tracking-in-healthcare-enhancing-efficiency-patient-care",
  ];
  const featuredPosts = await getPostsBySlugs(slugsToShow);

  return (
    <div>
      <Hero />
      <Partners />
      <BusinessVerticals />
      <Rtlv />
      <VideoPlayer />
      <InsightsSection />
      <div style={{ width: "87%", margin: "0 auto" }}>
        <BlogGrid posts={featuredPosts} />
      </div>
    </div>
  );
}
