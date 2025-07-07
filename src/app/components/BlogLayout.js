// src/app/components/BlogLayout.js
import React from 'react';
// import Head from 'next/head';

export default function BlogLayout({ children }) {
  return (
    <>
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        <main>{children}</main>
      </div>
    </>
  );
}
