// next.config.js

/** @type {import('next').NextConfig} */

const strapiUrlString = process.env.STRAPI_API_URL || "http://localhost:1337";

const strapiUrl = new URL(strapiUrlString);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(':', ''),
        hostname: strapiUrl.hostname,                   
        port: strapiUrl.port,                           
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;