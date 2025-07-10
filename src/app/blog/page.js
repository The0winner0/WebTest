import { getAllPosts } from '../lib/posts'; // Import our new server-side function
import BlogHeader from './components/BlogHeader.js';
import BlogGrid from './components/BlogGrid.js';
import styles from './Blog.module.css'; // Import the CSS module


const createLink = (text) => (text ? String(text).toLowerCase().replace(/\s+/g, '-') : '');

export default async function BlogPage({ searchParams }) {
  const allPosts = await getAllPosts();

  const categoryFilter = searchParams.category;
  const authorFilter = searchParams.author;
  const tagFilter = searchParams.tag;

  const filteredPosts = allPosts.filter((post) => {
    if (categoryFilter && createLink(post.category) !== categoryFilter) {
      return false;
    }
    if (authorFilter && createLink(post.author) !== authorFilter) {
      return false;
    }
    if (tagFilter && !post.tags.some((tag) => createLink(tag) === tagFilter)) {
      return false;
    }
    return true;
  });

  return (
    
    <main className={styles.blogPageContainer}>
      
      <BlogHeader title="Insights from our experts & news from the industry" />
      <BlogGrid posts={filteredPosts} />
    </main>
  );
}
