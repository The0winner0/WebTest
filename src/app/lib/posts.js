///app/lib/posts.js

import { fetchAPI, getStrapiURL } from './api';
import { remark } from 'remark';
import html from 'remark-html';


async function processPost(item) {
  const { 
    Title, 
    slug, 
    featured, 
    author,
    published, 
    category, 
    tags, 
    content 
  } = item || {};

  let processedTags = [];
  if (typeof tags === 'string') {
    try {
      processedTags = JSON.parse(tags);
    } catch (e) {
      processedTags = [tags];
    }
  } else if (Array.isArray(tags)) {
    processedTags = tags;
  }
  const contentHtml = content ? (await remark().use(html).process(content)).toString() : '';
  const postSlug = slug || String(item.id);
  return {
    id: item.id,
    title: Title || 'Untitled Post',
    slug: postSlug,
    href: `/blog/${postSlug}`, 
    
    authorHref: `/blog?author=${createLink(author?.authorName)}`,
    categoryHref: `/blog?category=${createLink(category)}`,
    
    image: featured?.url ? getStrapiURL(featured.url) : null,
    
    author: author?.authorName || 'Anonymous',
    
    authorImageUrl: author?.authorImage?.url 
      ? getStrapiURL(author.authorImage.url) 
      : null,

    

    date: published,
    formattedDate: published ? new Date(published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
    category: category || 'Uncategorized',
    tags: processedTags,
    contentHtml: contentHtml,
  };
}





const createLink = (text) => (text ? String(text).toLowerCase().replace(/\s+/g, '-') : '');


const astrapiQuery = '/api/atoll-blogs?populate[featured][populate]=*&populate[author][populate]=authorImage';

export async function getAllPosts() {
  const data = await fetchAPI(astrapiQuery, {
    next: { tags: ['atoll-blogs'] }
  });

  if (!data?.data) return [];
  
  const posts = await Promise.all(data.data.map(processPost));
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(`${astrapiQuery}&filters[slug][$eq]=${slug}`, {
    next: { tags: ['atoll-blogs'] }
  });
  
  if (!data?.data || data.data.length === 0) return null;

  return await processPost(data.data[0]);
}

export async function getPostsBySlugs(slugs) {
  if (!slugs || slugs.length === 0) {
    return [];
  }

  const filters = slugs.map((slug, index) => `filters[slug][$in][${index}]=${slug}`).join('&');
  const astrapiQuery = `/api/atoll-blogs?${filters}&populate[featured][populate]=*&populate[author][populate]=authorImage`;

  try {
    const res = await fetchAPI(astrapiQuery, {
      next: { tags: ['atoll-blogs'] }
    });
    
    if (!res?.data) return [];

    const posts = await Promise.all(res.data.map(processPost));
    return posts;

  } catch (error) {
    console.error("Failed to fetch posts by slug:", error);
    return [];
  }
}