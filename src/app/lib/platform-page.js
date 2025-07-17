import { fetchAPI } from './api';
import qs from 'qs';

export async function getPlatformPageData() {
  const query = qs.stringify({
    populate: {
      configurationAppFields: {
        populate: '*',
      },
      pageContent: {
        populate: '*',
      },
    }
  }, {
    encodeValuesOnly: true,
  });

  const path = `/api/platform-page?${query}`;

  try {
    const response = await fetchAPI(path, { next: { tags: ['platform-page'] } });
    
    if (response && response.data) {
      return response.data;
    }
    return null;

  } catch (error) {
    console.error("Error fetching Platform Page data:", error);
    return null;
  }
}