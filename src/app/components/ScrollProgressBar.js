import { useState, useEffect } from 'react';
import styles from '../Css/ScrollProgressBar.module.css';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    
    if (totalHeight > 0) {
      setScrollProgress((scrollPosition / totalHeight) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}