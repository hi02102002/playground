/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2', '@node-rs/bcrypt'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
