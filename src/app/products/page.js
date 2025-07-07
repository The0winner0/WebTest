// src/app/products/page.js

import { fetchAPI, getStrapiURL } from '../lib/api';
import ProductPageClient from './ProductPageClient';
import '../Css/Products.css';
export default async function ProductsPage() {

  const strapiRes = await fetchAPI('/api/atoll-products?populate=Image');

  const allProducts = strapiRes.data.map(item => {
    const { Name, category, Image, Description, specs } = item;

    const imageUrl = Image?.url
      ? getStrapiURL(Image.url)
      : '/placeholder-image.png';
    let processedSpecs = []; 

    if (typeof specs === 'string') {
      try {
        const parsed = JSON.parse(specs);
        if (Array.isArray(parsed)) {
          processedSpecs = parsed;
        }
      } catch (e) {
        console.error(`Could not parse specs for product ID ${item.id}:`, specs);
        processedSpecs = [];
      }
    } else if (Array.isArray(specs)) {
      processedSpecs = specs;
    }

    return {
      id: item.id,
      name: Name || 'Unnamed Product',
      category: category || 'General',
      image: imageUrl,
      description: Description || 'No description available.',
      // Use the safely processed specs
      specs: processedSpecs,
    };
  });

  return <ProductPageClient products={allProducts} />;
}