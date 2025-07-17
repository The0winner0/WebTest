// src/lib/api.js

export function getStrapiURL(url='') {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}${url}`;
}

export async function fetchAPI(path, options = {}) {
  const requestUrl = getStrapiURL(path);

  const headers = {
    'Content-Type': 'application/json',
    ...(process.env.STRAPI_API_TOKEN ? {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    } : {}),
  };

  const mergedOptions = {
    headers,
    ...options, 
  };

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Error fetching ${requestUrl}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch API. Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch API Error:", error);
    throw new Error('An error occurred while fetching the API.');
  }
}