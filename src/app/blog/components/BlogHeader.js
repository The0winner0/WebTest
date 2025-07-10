import React from 'react';
import Spacer from './Spacer';
import PageHeading from '../../components/PageHeading'; 
import styles from '../Blog.module.css'; 

const BlogHeader = ({ title }) => {
  return (
    <header className={styles.blogPageHeader}>
      <div className={styles.blogPageHeaderContent}>
        <PageHeading title="Blog" />
        <Spacer />
        <h1 className={styles.blogPageTitle}>{title}</h1>
        <Spacer />
      </div>
    </header>
  );
};

export default BlogHeader;
