'use client'; 

import React from 'react';
import { useSearchParams } from 'next/navigation';
import BlogPostCard from './BlogPostCard';
import styles from '../Blog.module.css'; 

const createLink = (text) => (text ? String(text).toLowerCase().replace(/\s+/g, '-') : '');

const BlogGrid = ({ posts }) => {
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get('category');
  const authorFilter = searchParams.get('author');
  const tagFilter = searchParams.get('tag');

  const filteredPosts = posts.filter((post) => {
    if (categoryFilter && createLink(post.category) !== categoryFilter) {
      return false;
    }
    if (authorFilter && createLink(post.author) !== authorFilter) {
      return false;
    }
    if (tagFilter && !post.tags.some((tag) => createLink(tag) === tagFilter)) {
      return false;
    }
    return true;
  });

  return (
    <section className={styles.blogPageGrid}>
      {filteredPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default BlogGrid;