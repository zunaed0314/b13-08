import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata = {
   metadataBase: new URL("https://b13-08.vercel.app"),

   title: {
      default: "SunCart | Your Smart Shopping Destination",
      template: "%s | SunCart",
   },

   description:
      "Discover a seamless online shopping experience with SunCart. Explore products, enjoy a responsive shopping experience, and manage your account with ease.",

   keywords: ["SunCart", "online shopping", "e-commerce", "online store", "product shopping", "shopping website"],

   authors: [{ name: "SunCart" }],
   creator: "SunCart",

   openGraph: {
      title: "SunCart | Your Smart Shopping Destination",
      description: "Explore SunCart for a seamless and modern online shopping experience.",
      url: "https://b13-08.vercel.app",
      siteName: "SunCart",
      type: "website",
      locale: "en_US",
      images: [
         {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "SunCart - Your Smart Shopping Destination",
         },
      ],
   },

   twitter: {
      card: "summary_large_image",
      title: "SunCart | Your Smart Shopping Destination",
      description: "Discover a seamless online shopping experience with SunCart.",
      images: ["/og-image.png"],
   },

   robots: {
      index: true,
      follow: true,
   },

   icons: {
      icon: "/favicon.ico",
   },
};

export default function RootLayout({ children }) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
         <body className="flex min-h-full flex-col">
            <NextThemeProvider>
               <Navbar></Navbar>
               <main>{children}</main>
               <Footer></Footer>
            </NextThemeProvider>
         </body>
      </html>
   );
}
