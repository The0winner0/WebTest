// /components/BlogPostCard.js
import React from 'react';
import Link from 'next/link';

const BlogPostCard = ({ post }) => {
  const postLink = `/blog/${post.link}`;

  return (
    <article className="blog-page-card">
      {/* The Link component now serves as the background image container directly. 
          Its style is set inline to use the dynamic image URL from the post data. */}
      <Link
        href={postLink}
        className="blog-page-card-image"
        title={post.title}
        style={{ backgroundImage: post.image ? `url(${post.image})` : 'none' }}
      />

      {/* The overlay and content are now siblings to the image link, layered on top using z-index. */}
      <div className="blog-page-card-overlay"></div>

      <div className="blog-page-card-category">
        <Link href={post.categoryLink}>{post.category}</Link>
      </div>

      <div className="blog-page-card-content">
        <h2 className="blog-page-card-title">
          <Link href={postLink} title={post.title}>
            {post.title}
          </Link>
        </h2>
        <div className="blog-page-card-meta">
          <span className="blog-page-card-author">
            By <Link href={post.authorLink}>{post.author}</Link>
          </span>
          <span className="blog-page-card-date">{post.date}</span>
          
          {/* Conditionally render comments only if the data exists */}
          {post.comments !== undefined && (
            <div className="blog-page-card-comments">
              <span>
                <i className="ep-icon-bubble" aria-hidden="true"></i> {post.comments}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;