// /app/blog/components/BlogIterator.js
import Link from 'next/link';
import styles from '../../Css/BlogPostIterator.module.css';

export default function BlogIterator({ prevPost, nextPost }) {
  return (
    <nav className={styles['blog-iterator']}>
      <div className={`${styles['blog-iterator__link']} ${styles['blog-iterator__link--prev']}`}>
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`}>
            <span>&larr; Previous Post</span>
            <h3>{prevPost.title}</h3>
          </Link>
        )}
      </div>
      <div className={`${styles['blog-iterator__link']} ${styles['blog-iterator__link--next']}`}>
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`}>
            <span>Next Post &rarr;</span>
            <h3>{nextPost.title}</h3>
          </Link>
        )}
      </div>
    </nav>
  );
}
