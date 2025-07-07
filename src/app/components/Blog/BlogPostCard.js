// src/components/BlogPostCard.js
import React from 'react';
import '../../HomeCss/BlogPostCard.css';

const BlogPostCard = ({ postUrl, imageUrl, title, author, date }) => {
  return (
    // The entire card is now a single, valid link.
    <a href={postUrl} className="blog-post-overlay">
      
      {/* The background image for the card */}
      <div
        className="post-cover-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* A dark gradient overlay to ensure text is always readable */}
      <div className="post-gradient-overlay"></div>

      {/* The text content that sits on top of the image and gradient */}
      <div className="post-info-overlay">
        <h4 className="post-title">
          <span>{title}</span>
        </h4>
        <div className="post-footer">
          {/* Author is now just text, not a link */}
          <span>{author}</span>
          <span className="meta-separator"></span>
          <span>{date}</span>
        </div>
      </div>

    </a>
  );
};

export default BlogPostCard;