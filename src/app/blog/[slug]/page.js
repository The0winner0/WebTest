import 'server-only';
import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

import { fetchAPI, getStrapiURL } from '../../lib/api';
import styles from '../../Css/Post.module.css';
import '../../globals.css';

// Helper function to create a URL-friendly slug from a string
const createLink = (text) => text ? String(text).toLowerCase().replace(/\s+/g, '-') : '';

const getPostData = cache(async (slug) => {
    console.log(`Fetching data for slug: ${slug}`);
    const postsRes = await fetchAPI(

        `/api/atoll-blogs?filters[slug][$eq]=${slug}&populate[author][populate]=authorImage`

    );
    return postsRes?.data?.[0] ?? null;
});

export async function generateStaticParams() {
    try {
        const postsRes = await fetchAPI('/api/atoll-blogs?fields[0]=slug');
        return postsRes.data
            .filter(post => post && post.slug)
            .map((post) => ({
                slug: post.slug,
            }));
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const slug = params.slug; 
    const post = await getPostData(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.Title,
    };
}

export default async function BlogPostPage({ params }) {
    const slug = params.slug; 
    const post = await getPostData(slug);

    if (!post) {
        notFound();
    }

    const { Title, published, category, content, author, tags, fetured } = post;

    const contentHtml = content ? (await remark().use(html).process(content)).toString() : '';

    const publishedDate = new Date(published).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const authorData = author;
    const authorImageUrl = authorData?.authorImage?.url;

    // Robustly process tags, similar to the blog list page
    let processedTags = [];
    if (Array.isArray(tags)) {
        // Handles array of objects (like from a relation) or array of strings
        processedTags = tags.map(tag => tag.tagName || tag).filter(Boolean);
    } else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim());
    }

    return (
        <div className='blog-post-page-wrapper'>
            <article className={styles.articleWrapper}>
                <div className={styles.breadcrumbs}>
                    <Link href="/blog">Blog</Link>
                    <span> / </span>
                    <Link href={`/blog?category=${createLink(category)}`}>{category}</Link>
                    <span> / </span>
                    <span>{Title}</span>
                </div>

                <h1 className={styles.postTitle}>{Title}</h1>

                {/* --- FIX: Meta line links updated --- */}
                <div className={styles.metaLine}>
                    <Link href={`/blog?author=${createLink(authorData?.authorName)}`}>
                        {authorData?.authorName || 'Atoll Solutions'}
                    </Link>
                    <span className={styles.metaDot}>•</span>
                    <span>{publishedDate}</span>
                    <span className={styles.metaDot}>•</span>
                    <Link href={`/blog?category=${createLink(category)}`}>
                        {category}
                    </Link>
                </div>

                <div
                    className={styles.contentWrapper}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                   />

                {/* Tags Section */}
                {processedTags.length > 0 && (
                    <div className={styles.tagsWrapper}>
                        <ul className={styles.tagsList}>
                            {processedTags.map((tag) => (
                                <li key={tag}>
                                    <Link href={`/blog?tag=${createLink(tag)}`} className={styles.tagItem}>
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Author Box Section */}
                {authorData && (
                    <Link href={`/blog?author=${createLink(authorData.authorName)}`} className={styles.authorBox}>
                        {authorImageUrl && (
                            <img
                                src={getStrapiURL(authorImageUrl)}
                                alt={authorData.authorName || 'Author'}
                                className={styles.authorImage}
                            />
                        )}
                        <div className={styles.authorDetails}>
                            <p className={styles.authorName}>{authorData.authorName}</p>
                        </div>
                    </Link>
                )}
            </article>
        </div>
    );
}