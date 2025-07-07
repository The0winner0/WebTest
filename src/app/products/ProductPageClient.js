"use client"; // This marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Use Next.js Image component
import { fetchAPI, getStrapiURL } from '../lib/api';
import ProductHeroImage from '../../../public/images/fina-walla-photo.webp';
// --- Reusable ProductModal Component ---
const ProductModal = ({ product, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button ref={closeButtonRef} onClick={onClose} className="modal-close-button" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="modal-body">
          <h3 id="modal-title" className="modal-title">{product.name}</h3>
          <div className="modal-description-container">
            {/* Note: The data prop is 'image', not 'imageUrl' */}
            <Image src={product.image} alt={product.name} width={120} height={120} className="modal-image" />
            <p className="modal-description-text">{product.description}</p>
          </div>
          <div className="modal-specs-container">
            <h4 className="modal-specs-title">Specifications</h4>
            <div className="modal-specs-table-wrapper">
              <table className="modal-specs-table">
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr key={index} className="modal-spec-row">
                      <td className="modal-spec-label">{spec.label}</td>
                      <td className="modal-spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable ProductCard Component ---
const ProductCard = ({ product, onViewMore }) => (
  <div className="product-card">
    <div className="product-card-image-wrapper">
      {/* Note: The data prop is 'image', not 'imageUrl' */}
      <Image src={product.image} alt={product.name} width={250} height={250} className="product-card-image" />
    </div>
    <div className="product-card-content">
      <h4 className="product-card-title">{product.name}</h4>
    </div>
    <button onClick={() => onViewMore(product)} className="product-card-button">
      View More
    </button>
  </div>
);

// --- Main Interactive Page Component ---
// It now receives the products as a prop.
export default function ProductPageClient({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

 const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // All the logic is contained within this useEffect hook
  useEffect(() => {
    async function loadAndProcessData() {
      setIsLoading(true);
      try {
        // IMPORTANT: This endpoint should return a SINGLE item, not an array.
        // Replace with your single type endpoint or a collection type with an ID.
        // e.g., '/api/articles/1?populate=*'
        const response = await fetchAPI('/api/atoll-product-page?populate=*'); 
        
        if (!response.data) {
          throw new Error("Data payload is missing from API response.");
        }

        const rawAttributes = response.data;
        const processedData = {
          title: rawAttributes.Title,
          content: rawAttributes.Content?.[0]?.children?.[0]?.text,
          imageUrl: rawAttributes.HeroImage?.url
            ? getStrapiURL(rawAttributes.HeroImage.url)
            : '',
        };
        
        setPageData(processedData);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadAndProcessData();
  }, []); // Empty array ensures this runs only once

  // --- All code outside the final return is now together ---

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    
    return <div>An error occurred: {error}</div>;
  }

  if (!pageData) {
    return <div>No data available.</div>;
  }

  // Group products by category dynamically
  const groupedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});

  const handleViewMore = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <main className="page-container products-page-main">
        <div className="hero-banner">
          <Image src={pageData.imageUrl} alt="Kinesis RTLS Devices Banner" width={2048} height={751} priority={true} className="hero-banner-image" />
        </div>
        <div className="content-wrapper">
          <section className="intro-section">
            <h2 className="intro-title">{pageData.title}</h2>
            <p className="intro-paragraph">
              {pageData.content}
            </p>
          </section>
          <div className="product-sections-container">
            {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
              <section key={category} className="product-category-section">
                <h3 className="product-category-title">{category}</h3>
                <div className="product-grid">
                  {productsInCategory.map((product) => (
                    <ProductCard key={product.id} product={product} onViewMore={handleViewMore} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
}