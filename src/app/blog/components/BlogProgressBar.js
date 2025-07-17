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
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateScrollTotal);
      observer.disconnect();
    };
  }, []);

  const upcomingProgress = (scrollTotal-300) > 0 ? (upcoming / (scrollTotal-300)) * 100 : 0;
  const currentProgress = (scrollTotal-300) > 0 ? (current / (scrollTotal-300)) * 100 : 0;

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