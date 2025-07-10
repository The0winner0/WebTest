"use client"; 

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; 
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
            <Image unoptimized={true}  src={product.image} alt={product.name} width={120} height={120} className="modal-image" />
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

const ProductCard = ({ product, onViewMore }) => (
  <div className="product-card">
    <div className="product-card-image-wrapper">
      <Image unoptimized={true}  src={product.image} alt={product.name} width={250} height={250} className="product-card-image" />
    </div>
    <div className="product-card-content">
      <h4 className="product-card-title">{product.name}</h4>
    </div>
    <button onClick={() => onViewMore(product)} className="product-card-button">
      View More
    </button>
  </div>
);

export default function ProductPageClient({ products, pageData }) {
  const [selectedProduct, setSelectedProduct] = useState(null);


  if (!pageData) {
    return <div>No page data available.</div>;
  }

  const groupedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});

  const handleViewMore = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  return (
    <>
      <main className="page-container products-page-main">
        <div className="hero-banner">
          <Image unoptimized={true}  src={pageData.imageUrl} alt="Kinesis RTLS Devices Banner" width={2048} height={751} priority={true} className="hero-banner-image" />
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