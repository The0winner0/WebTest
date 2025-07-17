// /app/components/BlogPostCard.js
'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../Blog.module.css';
const BlogPostCard = ({ post }) => {
  const router = useRouter();

  if (!post || !post.href) {
    return null;
  }
  const handleNestedLinkClick = (e) => {
    e.stopPropagation();
  };

  const handleCardClick = () => {
    router.push(post.href);
  };

  return (
    <article 
      className={styles.blogPageCard}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={styles.blogPageCardImage}
        title={post.title}
        style={{ backgroundImage: post.image ? `url(${post.image})` : 'none' }}
      />
      <div className={styles.blogPageCardOverlay}></div>
      
      <div className={styles.blogPageCardCategory}>
        <Link 
          href={post.categoryHref || '#'} 
          onClick={handleNestedLinkClick}
        >
          {post.category}
        </Link>
      </div>

      <div className={styles.blogPageCardContent}>
        <p className={styles.blogPageCardTitle}>
           <Link href={post.href} onClick={handleNestedLinkClick}>
            {post.title}
          </Link>
        </p>
        <div className={styles.blogPageCardMeta}>
          <span className="blog-page-card-author">
            By{' '}
            <Link 
              href={post.authorHref || '#'} 
              onClick={handleNestedLinkClick}
            >
              {post.author}
            </Link>
          </span>
          <span className="blog-page-card-date">{post.formattedDate}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;