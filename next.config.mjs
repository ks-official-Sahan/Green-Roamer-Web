// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    // Enable as needed, do not use `output: 'export'`
  },
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
    ],
  },
};

export default nextConfig;
