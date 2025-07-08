// /app/blog/components/BlogSuggestion.js
import Link from 'next/link';
// Add your own styling for this component
// import styles from './BlogSuggestion.module.css';

export default function BlogSuggestion({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <aside className="you-may-also-like-section">
      <h2>You May Also Like</h2>
      <div className="related-posts-grid">
        {posts.map(post => (
          <div key={post.id} className="related-post-card">
            <Link href={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}