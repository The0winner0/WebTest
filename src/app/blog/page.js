// /app/blog/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBlog } from './context/BlogContext'; // Import the custom hook
import BlogHeader from './components/BlogHeader.js';
import BlogGrid from './components/BlogGrid.js';
import '../Css/Blog.css';

const createLink = (text) => text ? String(text).toLowerCase().replace(/\s+/g, '-') : '';

export default function BlogPage() {
  // Get all data and loading state from the context
  const { allPosts, isLoading, error } = useBlog();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const searchParams = useSearchParams();

  // This useEffect now only handles filtering, not fetching
  useEffect(() => {
    const categoryFilter = searchParams.get('category');
    const authorFilter = searchParams.get('author');
    const tagFilter = searchParams.get('tag');

    if (isLoading) return; // Wait until posts are loaded

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
  }, [searchParams, allPosts, isLoading]);

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