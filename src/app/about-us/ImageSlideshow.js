// /app/components/ImageSlideshow.js

import { getGalleryImages } from '../lib/gallery'; 
import ImageSlideshowClient from './ImageSlideshowClient.js';

export default async function ImageSlideshow() {
  const images = await getGalleryImages();

  return <ImageSlideshowClient images={images} />;
}