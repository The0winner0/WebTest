// /app/blog/components/BlogPageClient.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogGrid from './BlogGrid.js';

const createLink = (text) => text ? String(text).toLowerCase().replace(/\s+/g, '-') : '';

// This component receives the posts from the server and handles client-side filtering
export default function BlogPageClient({ initialPosts }) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFilter = searchParams.get('category');
    const authorFilter = searchParams.get('author');
    const tagFilter = searchParams.get('tag');

    // Start with the full list of posts received from the server
    let posts = initialPosts;

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
  }, [searchParams, initialPosts]);

  // The posts prop for BlogGrid is now always guaranteed to be an array
  return <BlogGrid posts={filteredPosts} />;
}