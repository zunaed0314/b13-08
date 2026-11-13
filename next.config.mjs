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
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "images.pexels.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "plus.unsplash.com",
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
