
'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import PageHeading from '../components/PageHeading';
import '../Css/AboutUs.css';

const LazyImageSlideshow = dynamic(() => import('./ImageSlideshow'), {
  ssr: false, 
  loading: () => <div style={{ height: '500px', width: '100%', background: '#eee' }}><p>Loading Slideshow...</p></div>
});


const valuesData = [
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="value-card__icon">
        <path fill=" white" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
      </svg>
    ),
    title: "Stay Humble",
    description: "Humility guides us as we build from strength to strength",
  },
    {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="value-card__icon">
        <path fill=" white" d="M496.25 202.52l-110-15.44 41.82-104.34c6.67-16.64-11.6-32.18-26.59-22.63L307.44 120 273.35 12.82C270.64 4.27 263.32 0 256 0c-7.32 0-14.64 4.27-17.35 12.82l-34.09 107.19-94.04-59.89c-14.99-9.55-33.25 5.99-26.59 22.63l41.82 104.34-110 15.43c-17.54 2.46-21.68 26.27-6.03 34.67l98.16 52.66-74.48 83.54c-10.92 12.25-1.72 30.93 13.29 30.93 1.31 0 2.67-.14 4.07-.45l108.57-23.65-4.11 112.55c-.43 11.65 8.87 19.22 18.41 19.22 5.15 0 10.39-2.21 14.2-7.18l68.18-88.9 68.18 88.9c3.81 4.97 9.04 7.18 14.2 7.18 9.54 0 18.84-7.57 18.41-19.22l-4.11-112.55 108.57 23.65c17.36 3.76 29.21-17.2 17.35-30.49l-74.48-83.54 98.16-52.66c15.64-8.39 11.5-32.2-6.04-34.66zM338.51 311.68l-51.89-11.3 1.97 53.79L256 311.68l-32.59 42.49 1.96-53.79-51.89 11.3 35.6-39.93-46.92-25.17 52.57-7.38-19.99-49.87 44.95 28.62L256 166.72l16.29 51.23 44.95-28.62-19.99 49.87 52.57 7.38-46.92 25.17 35.61 39.93z"></path>
      </svg>
    ),
    title: "Stay Hungry",
    description: "Hunger lights the fire that keeps us going",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="value-card__icon">
        <path fill=" white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
      </svg>
    ),
    title: "Advance Confidently",
    description: "Confidence gives us belief in our ability to create success",
  },
];

const leadersData = [
  {
    imgSrc: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/1664804399829.jpeg?fit=400%2C400&ssl=1",
    name: "Jithendranadh N",
    title: "People and Business",
  },
  {
    imgSrc: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/1552894137429.jpeg?fit=400%2C400&ssl=1",
    name: "Sumit Dev",
    title: "Software and Products",
  },
  {
    imgSrc: "https://i0.wp.com/atollsolutions.com/wp-content/uploads/2024/01/1568492675841.jpeg?fit=400%2C400&ssl=1",
    name: "Padma Thunnan",
    title: "Hardware and Systems",
  },
];

const ValueCard = ({ icon, title, description }) => (
  <div className="value-card">
    <div className="value-card__icon-wrapper">{icon}</div>
    <h3 className="value-card__title">{title}</h3>
    <p className="value-card__description">{description}</p>
  </div>
);

const LeaderCard = ({ imgSrc, name, title }) => (
  <div className="leader-card">
    <Image
      src={imgSrc}
      alt={name}
      width={400}
      height={400}
      className="leader-card__image"
    />
    <h3 className="leader-card__name">{name}</h3>
    <p className="leader-card__title">{title}</p>
  </div>
);


export default function AboutUsPage() {
  return (
    <main className="About-us-page">
      <section className="hero-section">
        <div className="container">
          <PageHeading title="About Us"/>
          <h1 className="hero-section__heading">
            Making location intelligence precise & ubiquitous
          </h1>
        </div>
      </section>

      <section className="values-leaders-section">
        <div className="container">
          <h2 className="section-title">
            Our Values
          </h2>
          <div className="values-grid">
            {valuesData.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>

          <div className="leaders-title-wrapper">
            <div className="divider"></div>
            <span className="leaders-title">Our Leaders</span>
            <div className="divider"></div>
          </div>
          
          <div className="leaders-grid">
            {leadersData.map((leader, index) => (
              <LeaderCard key={index} {...leader} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <h2 className="team-section-title">
            Our team on the field
          </h2>
          <div className="slideshow-container">
            <LazyImageSlideshow />
          </div>
        </div>
      </section>
    </main>
  );
}