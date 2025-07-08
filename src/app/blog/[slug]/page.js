// /app/blog/[slug]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useBlog } from '../context/BlogContext';
import Link from 'next/link';
import Image from 'next/image'
// getStrapiURL is not needed here anymore as the context handles it
import BlogSuggestion from '../components/BlogSuggestion';
import BlogIterator from '../components/BlogIterator';
import styles from '../../Css/Post.module.css';
import '../../globals.css';
import Logo from '../../../../public/images/Logo/atoll-solutions-5f6c56d5.webp'
import { getStrapiURL } from '@/app/lib/api';

const createLink = (text) => text ? String(text).toLowerCase().replace(/\s+/g, '-') : '';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { allPosts, isLoading, error } = useBlog();
  
  const [pageData, setPageData] = useState({
    currentPost: null,
    relatedPosts: [],
    prevPost: null,
    nextPost: null,
  });

  useEffect(() => {
    if (isLoading || allPosts.length === 0) return;

    const currentPost = allPosts.find(p => p.slug === slug);
    
    if (!currentPost) {
      notFound();
      return;
    }

    const relatedPosts = allPosts
      .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
      .slice(0, 3);

    const currentIndex = allPosts.findIndex(p => p.id === currentPost.id);
    const prevPost = allPosts[currentIndex + 1] || null;
    const nextPost = allPosts[currentIndex - 1] || null;

    setPageData({ currentPost, relatedPosts, prevPost, nextPost });

  }, [slug, allPosts, isLoading]);

  if (isLoading) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading post...</p>;
  if (error) return <p style={{textAlign: 'center', color: 'red'}}>Error: {error}</p>;
  if (!pageData.currentPost) return null;

  const { currentPost, relatedPosts, prevPost, nextPost } = pageData;
  
  // --- THE FIX: Use the correct property from the currentPost object ---
  const authorImageUrl = currentPost.authorImageUrl;

  return (
    <div className='blog-post-page-wrapper'>
      <article className={styles.articleWrapper}>
        <div className={styles.breadcrumbs}>
          <Link href="/blog">Blog</Link>
          <span> / </span>
          <Link href={`/blog?category=${createLink(currentPost.category)}`}>{currentPost.category}</Link>
          <span> / </span>
          <span>{currentPost.title}</span>
        </div>

        <h1 className={styles.postTitle}>{currentPost.title}</h1>

        <div className={styles.metaLine}>
          <Link href={`/blog?author=${createLink(currentPost.author)}`}>
            {currentPost.author}
          </Link>
          <span className={styles.metaDot}>•</span>
          <span>{currentPost.formattedDate}</span>
          <span className={styles.metaDot}>•</span>
          <Link href={`/blog?category=${createLink(currentPost.category)}`}>
            {currentPost.category}
          </Link>
        </div>
        
        <div
          className={styles.contentWrapper}
          dangerouslySetInnerHTML={{ __html: currentPost.contentHtml }}
        />
        
        {/* Tags Section */}
        {currentPost.tags && currentPost.tags.length > 0 && (
          <div className={styles.tagsWrapper}>
            <ul className={styles.tagsList}>
              {currentPost.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog?tag=${createLink(tag)}`} className={styles.tagItem}>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author Box Section */}
        {currentPost.author && (
          <Link href={`/blog?author=${createLink(currentPost.author)}`} className={styles.authorBox}>
            {
            authorImageUrl==null?
            (
              <Image
                src={Logo}
                alt={currentPost.author}
                className={styles.authorImage}
                />
            ):<></>
            }
            {authorImageUrl && (
                <img
                src={getStrapiURL(authorImageUrl.url)}
                alt={currentPost.author}
                className={styles.authorImage}
                />
            
            )}
            {console.log(authorImageUrl)}
            <div className={styles.authorDetails}>
              <p className={styles.authorName}>{currentPost.author}</p>
            </div>
          </Link>
        )}
      </article>

      <BlogSuggestion posts={relatedPosts} />
      <BlogIterator prevPost={prevPost} nextPost={nextPost} />
    </div>
  );
}
