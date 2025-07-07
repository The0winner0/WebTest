import React from 'react';
import BlogPostCard from './BlogPostCard';

const BlogGrid = ({ posts }) => {
  return (
    <section className="blog-page-grid">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default BlogGrid;