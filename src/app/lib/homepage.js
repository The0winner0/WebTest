// /app/lib/homepage.js

import { fetchAPI } from './api';
import qs from 'qs';
export async function getHomepageData() {
  // const path = '/api/homepage?populate[heroSection][populate]=*&populate[partnersSection][populate][partners][populate]=logo&populate[verticalsSection][populate]=*&populate[rtlvSection][populate]=*&populate[videoSection]=*&populate[insightsSection]=*&populate[featuredPostSlugs]=*';
  // const path = '/api/homepage?populate[heroSection][populate]=heroBackgroundImageDesktop,heroBackgroundImageMobile,heroMapPins&populate[partnersSection][populate][partners][populate]=logo&populate[verticalsSection][populate]=verticals&populate[rtlvSection][populate]=rtlvFeatures&populate[videoSection]=*&populate[insightsSection]=*&populate[featuredPostSlugs]=*';
  const query = qs.stringify({
    populate: {
      heroSection: {
        populate: ['heroBackgroundImageDesktop', 'heroBackgroundImageMobile', 'heroMapPins'],
      },
      partnersSection: {
        populate: {
          partners: {
            populate: 'logo',
          },
        },
      },
      verticalsSection: {
        populate: 'verticals',
      },
      rtlvSection: {
        populate: 'rtlvFeatures',
      },
      videoSection: true,
      insightsSection: true,
      featuredPostSlugs: true,
    }
  }, {
    encodeValuesOnly: true,
  });

  const path = `/api/homepage?${query}`;
  const options = {
    next: { 
      tags: ['homepage'],
    },
  };
 
  try {
    const response = await fetchAPI(path, options);
    
    // Check if the main 'data' object exists
    if (response && response.data) {
      // Return the 'data' object directly
      // console.log("Fetched Homepage path:", path);
      return response.data;
    }

    return null;

  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
} 