
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Create a URL object to easily access protocol, hostname, and port
const strapiUrlObj = new URL(strapiUrl);
/** @type {import('next').NextConfig} */
const nextConfig = {

  //   images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '1337',
  //       pathname: '/uploads/**',
  //     },
  //   ],
  // },
   images: {
    remotePatterns: [
      {
        protocol: strapiUrlObj.protocol.slice(0, -1),
        hostname: strapiUrlObj.hostname,
        port: strapiUrlObj.port || '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
