'use client';
import { useState, useEffect, useContext } from 'react';
import { ScrollVariables } from '../../contexts/ScrollVariables'; 
import styles from '../BlogPost.module.css';

export default function BlogProgressBar() {
  const { current, upcoming } = useContext(ScrollVariables);
  const [scrollTotal, setScrollTotal] = useState(0);

  useEffect(() => {
    const updateScrollTotal = () => {
      setScrollTotal(document.documentElement.scrollHeight - document.documentElement.clientHeight);
    };

    updateScrollTotal();
    window.addEventListener('resize', updateScrollTotal);
    const observer = new MutationObserver(updateScrollTotal);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('resize', updateScrollTotal);
      observer.disconnect();
    };
  }, []);

  const progressOffset = 700;
  const adjustedScrollTotal = scrollTotal - progressOffset > 0 ? scrollTotal - progressOffset : 1;

  const upcomingProgress = (upcoming / adjustedScrollTotal) * 100;
  const currentProgress = (current / adjustedScrollTotal) * 100;

  return (
    <div className={styles['blog-progress-container']}>
      <div
        className={`${styles['progress-bar']} ${styles['upcoming-bar']}`}
        style={{ width: `${upcomingProgress}%` }}
      />
      <div
        className={`${styles['progress-bar']} ${styles['current-bar']}`}
        style={{ width: `${currentProgress}%` }}
      />
    </div>
  );
}