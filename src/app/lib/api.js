// src/lib/api.js

// Helper to construct the full Strapi URL
export function getStrapiURL(path = "") {
  return `${process.env.STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

// A robust, re-usable fetch function with error handling
export async function fetchAPI(path, options = {}) {
  const requestUrl = getStrapiURL(path);

  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(process.env.STRAPI_API_TOKEN ? {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    } : {}),
  };

  // Set default Next.js caching options
  const mergedOptions = {
    headers,
    next: { revalidate: 60 }, // Revalidate every 60 seconds by default
    ...options,
  };

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Error fetching ${requestUrl}: ${response.status} ${response.statusText}`);
      // Throw an error with more context
      throw new Error(`Failed to fetch API. Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch API Error:", error);
    // Re-throw the error to be caught by the calling function
    throw new Error('An error occurred while fetching the API.');
  }
}