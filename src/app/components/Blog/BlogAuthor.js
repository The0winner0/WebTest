// components/blog/BlogAuthor.js

import Image from 'next/image';
import styles from '../../Css/BlogPost.module.css';

export default function BlogAuthor({ author }) {
  if (!author || !author.fields) {
    return null; // Don't render if author data is incomplete
  }

  const { name = 'Anonymous', avatar, bio } = author.fields;
  const avatarUrl = avatar?.fields?.file?.url || '/default-avatar.png'; // Fallback to a default avatar

  return (
    <div className={styles['blog-author-box']}>
      <Image
        src={avatarUrl.startsWith('//') ? `https:${avatarUrl}` : avatarUrl}
        alt={name}
        className={styles['blog-author-avatar']}
        width={80}
        height={80}
      />
      <div>
        <h4>{name}</h4>
        {bio && <p>{bio}</p>}
      </div>
    </div>
  );
}