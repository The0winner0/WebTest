// next.config.js

/** @type {import('next').NextConfig} */

const strapiUrlString = process.env.NEXT_PUBLIC_STRAPI_URL;
if (!strapiUrlString) {
  console.error("CRITICAL ERROR: The NEXT_PUBLIC_STRAPI_URL environment variable is not defined!");
  throw new Error("Missing required environment variable: NEXT_PUBLIC_STRAPI_URL");
}
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