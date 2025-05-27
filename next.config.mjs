/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true, // Ignora warnings de dependencias como Bootstrap
  },
  images: {
    domains: ["images.ctfassets.net", "cdn.contentful.com"],
  },
};

export default nextConfig;
