// /app/blog/context/BlogContext.js 
'use client'; 
 
import { createContext, useContext, useState, useEffect } from 'react'; 
import { fetchAPI, getStrapiURL } from '../../lib/api'; // Adjust path if needed 
import { remark } from 'remark'; 
import html from 'remark-html'; 
 
const BlogContext = createContext(null); 
 
const createLink = (text) => text ? String(text).toLowerCase().replace(/\s+/g, '-') : ''; 
 
export function BlogProvider({ children }) { 
  const [allPosts, setAllPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
 
  useEffect(() => { 
    async function loadPosts() { 
      console.log("BlogContext: Starting to fetch all posts..."); 
      try { 
        const res = await fetchAPI('/api/atoll-blogs?populate[0]=author.authorImage&populate[1]=featured'); 
        if (!res.data) throw new Error('Failed to load blog posts.'); 
 
        console.log("BlogContext: API response received, processing posts..."); 
 
        // Use Promise.all to handle all async markdown processing concurrently 
        const blogPostsData = await Promise.all(res.data.map(async (item) => { 
          const { id, Title, slug, featured, author, published, category, tags, content } = item; 
 
          // --- FIX: Process Markdown to HTML here --- 
          const contentHtml = content ? (await remark().use(html).process(content)).toString() : ''; 
 
          let processedTags = []; 
          if (Array.isArray(tags)) { 
            processedTags = tags.map(tag => tag.tagName || tag).filter(Boolean); 
          } else if (typeof tags === 'string') { 
            processedTags = tags.split(',').map(t => t.trim()); 
          } 
 
          const postObject = { 
            id, 
            title: Title || 'Untitled Post', 
            // --- FIX: Use 'link' property to match original code --- 
            link: slug || String(id), 
            slug: slug || String(id), // Keep slug for direct lookup 
            image: featured?.url ? getStrapiURL(featured.url) : null, 
            author: author?.authorName || 'Anonymous', 
            authorLink: author?.authorName ? `/blog?author=${createLink(author.authorName)}` : '#', 
            date: published, 
            formattedDate: published ? new Date(published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A', 
            category: category || 'Uncategorized', 
            categoryLink: category ? `/blog?category=${createLink(category)}` : '#', 
            tags: processedTags, 
            // --- FIX: Add content and pre-processed HTML to the object --- 
            content: content, // The raw markdown 
            authorImageUrl : author?.authorImage||NULL,
            contentHtml: contentHtml, // The processed HTML 
          }; 
          return postObject; 
        })); 
        
        console.log("BlogContext: All posts processed. Total:", blogPostsData.length); 
        
        blogPostsData.sort((a, b) => new Date(b.date) - new Date(a.date)); 
        console.log("BlogContext: Posts sorted by date."); 
 
        setAllPosts(blogPostsData); 
        setError(null); 
      } catch (err) { 
        console.error("BlogContext ERROR:", err); 
        setError(err.message); 
      } finally { 
        setIsLoading(false); 
        console.log("BlogContext: Loading finished."); 
      } 
    } 
    loadPosts(); 
  }, []); 
 
  const value = { allPosts, isLoading, error }; 
 
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>; 
} 
 
export function useBlog() { 
  const context = useContext(BlogContext); 
  if (!context) { 
    throw new Error('useBlog must be used within a BlogProvider'); 
  } 
  return context; 
}