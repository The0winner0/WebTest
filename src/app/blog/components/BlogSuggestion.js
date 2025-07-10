// /app/blog/components/BlogSuggestion.js
import Link from 'next/link';
// Add your own styling for this component
// import styles from './BlogSuggestion.module.css';

const styles = `
  .sugestionSection {
    font-family: sans-serif;
    margin-top: 2rem;
  }

  .sugestionSection h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #343a40;
    font-size: 1.5rem;
  }

  .relatedPostsContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .relatedPostCardLink {
    text-decoration: none;
    color: #000000; /* Black */
    transition: color 0.2s ease-in-out;
  }

  .relatedPostCardLink:hover {
    color: #00008b; /* Dark Blue */
  }

  .relatedPostCardLink h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function BlogSuggestion({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <aside className="sugestionSection">
      <style>{styles}</style>
      <h2>You May Also Like</h2>
      <div className="relatedPostsContainer">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="relatedPostCardLink">
            <h3>{post.title}</h3>
          </Link>
        ))}
      </div>
    </aside>
  );
}