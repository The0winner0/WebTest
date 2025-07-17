import { fetchAPI } from './api';
import qs from 'qs';
import { remark } from 'remark';
import html from 'remark-html';

export async function getContactPageData() {
  const query = qs.stringify({
    populate: {
      contactDetails: {
        populate: '*',
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  const path = `/api/contact-page?${query}`;

  try {
    const response = await fetchAPI(path, { next: { tags: ['contact-page'] } });

    if (response && response.data?.attributes?.contactDetails) {
      
      const processedDetails = await Promise.all(
        response.data.attributes.contactDetails.map(async (detail) => {
          const contentHtml = detail.content
            ? (await remark().use(html).process(detail.content)).toString()
            : '';
            
          return {
            ...detail, 
            contentHtml, 
          };
        })
      );
      
      response.data.attributes.contactDetails = processedDetails;
    }
    return response?.data || null;

  } catch (error) {
    console.error("Error fetching Contact Page data:", error);
    return null;
  }
}