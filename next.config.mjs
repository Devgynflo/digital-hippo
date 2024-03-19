/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost", pathname: "**", port: "3000", protocol: "http" },
      {
        hostname:
          "https://vercel.com/gynflos-projects/digital-hippo/F95vfLD7nvzRxewAsFbRktdDFdiE",
      },
    ],
  },
};

export default nextConfig;
