import React from 'react';
import Spacer from './Spacer';
import PageHeading from '../../components/PageHeading'; // Assuming this component exists

const BlogHeader = ({ title }) => {
  return (
    <header className="blog-page-header">
      <div className="blog-page-header-content">
        <PageHeading title="Blog" />
        <Spacer />
        <h1 className="blog-page-title">{title}</h1>
        <Spacer />
      </div>
    </header>
  );
};

export default BlogHeader;