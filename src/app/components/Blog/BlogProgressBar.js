// components/blog/BlogProgressBar.js

import { useState, useEffect } from 'react';
import styles from '../../Css/BlogPost.module.css';

export default function BlogProgressBar() {
  const [scroll, setScroll] = useState(0);

  const onScroll = () => {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollTotal > 0) {
      const scrollPosition = document.documentElement.scrollTop;
      setScroll((scrollPosition / scrollTotal) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className={styles['blog-progress-bar']} style={{ width: `${scroll}%` }}></div>;
}