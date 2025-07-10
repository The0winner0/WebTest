// /app/blog/components/BlogIterator.js
import Link from 'next/link';
import styles from '../BlogPostIterator.module.css';

const Arrow = () => (
  <svg className={styles.arrow} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" stroke="#444" strokeWidth="2" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="24" height="24">
    <g>
      <line strokeMiterlimit="10" x1="22" y1="12" x2="2" y2="12" strokeLinejoin="miter" strokeLinecap="butt"></line>
      <polyline strokeLinecap="square" strokeMiterlimit="10" points="9,19 2,12 9,5 " strokeLinejoin="miter"></polyline>
    </g>
  </svg>
);

export default function BlogIterator({ prevPost, nextPost }) {
  return (
    <nav className={styles['blog-iterator']}>
      <div className={`${styles['blog-iterator__link']} ${styles['blog-iterator__link--prev']}`}>
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`}>
            <div className={styles['content-wrapper']}>
                <Arrow />
              <div className={styles['text-wrapper']}>
                <span>Previous Blog</span>
                <h3>{prevPost.title}</h3>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className={`${styles['blog-iterator__link']} ${styles['blog-iterator__link--next']}`}>
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`}>
            <div className={styles['content-wrapper']}>
              <div className={styles['text-wrapper']}>
                <span>Next Blog</span>
                <h3>{nextPost.title}</h3>
              </div>
              <Arrow />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}