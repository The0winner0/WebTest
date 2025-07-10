// /app/lib/products.js
import { fetchAPI, getStrapiURL } from './api';

function processProduct(item) {
  const { Name, category, Image, Description, specs } = item;
  const imageUrl = Image?.url ? getStrapiURL(Image.url) : '/placeholder-image.png';

  let processedSpecs = [];
  if (typeof specs === 'string') {
    try {
      processedSpecs = JSON.parse(specs);
    } catch (e) { }
  } else if (Array.isArray(specs)) {
    processedSpecs = specs;
  }

  return {
    id: item.id,
    name: Name || 'Unnamed Product',
    category: category || 'General',
    image: imageUrl,
    description: Description || 'No description.',
    specs: processedSpecs,
  };
}

export async function getProducts() {
  try {
    const res = await fetchAPI('/api/atoll-products?populate=Image', {
      next: { tags: ['products'] }
    });
    if (!res?.data) return [];
    return res.data.map(processProduct);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductPageData() {
  try {
    const res = await fetchAPI('/api/atoll-product-page?populate=*', {
      next: { tags: ['products'] }
    });
    if (!res?.data) return null;
    return {
      title: res.data.Title,
      content: res.data.Content?.[0]?.children?.[0]?.text,
      imageUrl: res.data.HeroImage?.url ? getStrapiURL(res.data.HeroImage.url) : '',
    };
  } catch (error) {
    console.error("Failed to fetch product page data:", error);
    return null;
  }
}