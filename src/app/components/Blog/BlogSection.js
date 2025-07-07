// src/components/BlogSection.js
import React from 'react';
import BlogPostCard from './BlogPostCard';

// Your data can come from an API, a CMS, or be defined locally like this.
const blogPostsData = [
  {
    id: 1,
    title: 'Real-Time Location Tracking in Healthcare: Enhancing Efficiency & Patient Care',
    postUrl: 'https://atollsolutions.com/real-time-location-tracking-in-healthcare-enhancing-efficiency-patient-care/',
    imageUrl: 'https://i0.wp.com/atollsolutions.com/wp-content/uploads/2025/03/Real-Time-Location-Tracking-in-Healthcare_-Enhancing-Efficiency-Patient-Care.png?fit=650%2C366&ssl=1',
    author: 'Atoll Solutions',
    authorUrl: 'https://atollsolutions.com/author/ajay-s/',
    date: 'June 18, 2025',
  },
  {
    id: 2,
    title: 'The Future of Smart Factories with IoT and RTLS',
    postUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1581092921462-6350e029387a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=650&q=80',
    author: 'Jane Doe',
    authorUrl: '#',
    date: 'June 10, 2025',
  },
  {
    id: 3,
    title: 'Optimizing Logistics: A Deep Dive into Asset Tracking',
    postUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1577562529281-a88971fce899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=650&q=80',
    author: 'John Smith',
    authorUrl: '#',
    date: 'May 28, 2025',
  },
];

const sectionStyles = {
    padding: '50px 20px',
    backgroundColor: '#f8f9fa',
};

const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
};

const BlogSection = () => {
  return (
    <section style={sectionStyles}>
      <div style={gridStyles}>
        {blogPostsData.map((post) => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            postUrl={post.postUrl}
            imageUrl={post.imageUrl}
            author={post.author}
            authorUrl={post.authorUrl}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;