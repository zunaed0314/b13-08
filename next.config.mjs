/** @type {import('next').NextConfig} */
const nextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "i.postimg.cc",
            port: "",
            pathname: "/**",
         },
      ],
   },
   reactCompiler: true,
   turbopack: {
      rules: {
         "*.css": {
            loaders: ["@tailwindcss/turbopack"],
            as: "*.css",
         },
      },
   },
};

export default nextConfig;
