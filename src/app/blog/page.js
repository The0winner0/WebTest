// /app/blog/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAPI, getStrapiURL } from '../lib/api.js';
import BlogHeader from './components/BlogHeader.js';
import BlogGrid from './components/BlogGrid.js';
import '../Css/Blog.css';

const createLink = (text) => text ? text.toLowerCase().replace(/\s+/g, '-') : '';

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const res = await fetchAPI('/api/atoll-blogs?populate=*');
        
        if (!res.data) {
          throw new Error('Failed to load blog posts.');
        }

        const blogPostsData = res.data.map(item => {
          const { id, Title, slug, featured, author, published, category, tags } = item;

          let processedTags = [];
          if (Array.isArray(tags)) {
            processedTags = tags.map(tag => tag.tagName || tag).filter(Boolean);
          } else if (typeof tags === 'string') {
            processedTags = tags.split(',').map(tag => tag.trim());
          }

          return {
            id: id,
            title: Title || 'Untitled Post',
            link: slug || id,
            image: featured?.url ? getStrapiURL(featured.url) : null,
            author: author?.authorName || 'Anonymous',
            // --- FIX: Correct Author Link ---
            // Creates a link to the current page with an 'author' query parameter.
            authorLink: author?.authorName ? `/blog?author=${createLink(author.authorName)}` : '#',
            date: published ? new Date(published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
            category: category || 'Uncategorized',
            // --- FIX: Correct Category Link ---
            // Creates a link to the current page with a 'category' query parameter.
            categoryLink: category ? `/blog?category=${createLink(category)}` : '#',
            tags: processedTags,
          };
        });

        setAllPosts(blogPostsData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  useEffect(() => {
    const categoryFilter = searchParams.get('category');
    const authorFilter = searchParams.get('author');
    const tagFilter = searchParams.get('tag');

    let posts = allPosts;

    if (categoryFilter) {
      posts = posts.filter(post => createLink(post.category) === categoryFilter);
    }

    if (authorFilter) {
      posts = posts.filter(post => createLink(post.author) === authorFilter);
    }

    if (tagFilter) {
      posts = posts.filter(post => 
        Array.isArray(post.tags) && post.tags.some(tag => createLink(tag) === tagFilter)
      );
    }

    setFilteredPosts(posts);
  }, [searchParams, allPosts]);

  return (
    <main className="blog-page-container">
      <BlogHeader title="Insights from our experts & news from the industry" />
      
      {isLoading && <p style={{ textAlign: 'center' }}>Loading posts...</p>}
      
      {error && <p style={{ textAlign: 'center' }}>Error: {error}</p>}

      {!isLoading && !error && (
        <BlogGrid posts={filteredPosts} />
      )}
    </main>
  );
}