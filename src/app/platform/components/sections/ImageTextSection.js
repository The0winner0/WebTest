import React from 'react';
import Image from 'next/image';
import { getStrapiURL } from '../../../lib/api';

// Helper function to parse Strapi's Rich Text block format into simple HTML
function parseStrapiRichText(richTextData) {
  if (!richTextData || !Array.isArray(richTextData)) {
    return '';
  }
  return richTextData
    .map(block =>
      block.children.map(child => child.text).join('')
    )
    .join('<br />');
}

const ImageTextSection = ({ data }) => {
    if (!data) return null;

    const { title, description, image, imagePosition } = data;

    // ✅ Robustly handle single or multiple media fields
    const imageObject = Array.isArray(image) ? image[0] : image;
    const imageUrl = getStrapiURL(imageObject?.url);
    const imageAlt = imageObject?.alternativeText || title || "Section image";

    // ✅ Parse the description from JSON to an HTML string
    const descriptionHtml = parseStrapiRichText(description);

    const ImageComponent = imageUrl && (
        <div className="platform-use-cases-image-wrapper">
            <Image
                unoptimized={true}
                src={imageUrl}
                alt={imageAlt}
                width={1800}
                height={1062}
                className="platform-image"
                loading="lazy"
            />
        </div>
    );

    const TextComponent = (
        <div className="platform-use-cases-text-wrapper">
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
    );

    return (
        <section className="platform-section">
            <h2 className="platform-heading">{title}</h2>
            <div className="platform-use-cases-container">
                {imagePosition === 'Right' ? (
                    <>
                        {TextComponent}
                        {ImageComponent}
                    </>
                ) : (
                    <>
                        {ImageComponent}
                        {TextComponent}
                    </>
                )}
            </div>
        </section>
    );
};

export default ImageTextSection;