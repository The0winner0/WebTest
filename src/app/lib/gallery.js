// /app/lib/gallery.js

import { fetchAPI, getStrapiURL } from "./api";

function processGalleryImage(item) {
  if (!item.main?.url) return null;

  return {
    main: getStrapiURL(item.main.url),
    thumb: getStrapiURL(item.main.formats?.thumbnail?.url || item.main.url),
  };
}

export async function getGalleryImages() {
  try {
    const res = await fetchAPI("/api/gallery-images?populate=*", {
      next: { tags: ["gallery-images"] },
    });

    if (!res?.data) return [];

    return res.data.map(processGalleryImage).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return [];
  }
}
