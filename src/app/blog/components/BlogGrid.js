import React from 'react';
import BlogPostCard from './BlogPostCard';
import styles from '../Blog.module.css'; 

const BlogGrid = ({ posts }) => {
  return (
    <section className={styles.blogPageGrid}>
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default BlogGrid;
