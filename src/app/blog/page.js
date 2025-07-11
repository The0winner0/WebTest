import { Suspense } from 'react'; 
import { getAllPosts } from '../lib/posts';
import BlogHeader from './components/BlogHeader.js';
import BlogGrid from './components/BlogGrid.js';
import styles from './Blog.module.css';

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className={styles.blogPageContainer}>
      <BlogHeader title="Insights from our experts & news from the industry" />
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogGrid posts={allPosts} />
      </Suspense>

    </main>
  );
}