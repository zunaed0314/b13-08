import { ThemeSwitch } from "@/components/ThemeSwitch";
import { FaFire } from "react-icons/fa6";
import "animate.css";
import Image from "next/image";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import PopularProducts from "@/components/PopularProducts";
import ProductCard from "@/components/ProductCard";

const tips = [
   {
      title: "Stay hydrated",
      text: "Drink water through the day, especially when you are outdoors.",
      accent: "border-t-secondary",
   },
   {
      title: "Protect your skin",
      text: "Apply sunscreen before going out and reapply during long days in the sun.",
      accent: "border-t-primary",
   },
   {
      title: "Keep cool",
      text: "Wear light, breathable clothes and take breaks in the shade.",
      accent: "border-t-accent",
   },
];

export default async function Home() {
   const res = await fetch("https://sun-cart-server-c57l.onrender.com/products");
   const products = await res.json();

   // Aggregate ratings per brand
   const brandStats = new Map();

   for (const p of products) {
      if (!p.brand || p.brand.trim() === "" || p.rating == null) continue;

      const key = p.brand.trim().toLowerCase();
      const entry = brandStats.get(key) ?? {
         brand: p.brand.trim(),
         total: 0,
         count: 0,
      };

      entry.total += Number(p.rating);
      entry.count += 1;
      brandStats.set(key, entry);
   }

   // Top 3 brands by average rating
   const topBrands = [...brandStats.values()]
      .map((e) => ({
         brand: e.brand,
         avgRating: e.total / e.count,
         count: e.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 3);

   return (
      <div className="bg-base-100 text-base-content mt-8">
         {/* HERO START */}
         <div className="custom-hero bg-hero mb-10 grid min-h-screen w-full grid-cols-1 items-center justify-center rounded-xl p-5 md:grid-cols-2">
            {/* 1st COLUMN */}
            <div className="border-base-content flex flex-col items-center space-y-3 p-8 md:items-start">
               <div className="bg-warning flex w-fit items-center justify-center gap-1 rounded-2xl px-4 py-1 shadow-md">
                  <span className="text-warning-content">
                     <FaFire />
                  </span>
                  <span className="text-warning-content font-semibold">Hot deals</span>
               </div>
               <div className="mt-5 flex flex-col">
                  <p className="text-hero-content2 text-center text-7xl font-semibold md:text-start">Summer Sale</p>
                  <p className="text-primary text-center text-7xl font-extrabold md:text-start">50% OFF</p>
               </div>
               <div className="mt-5 flex flex-col">
                  <p className="text-hero-content1 text-center text-3xl font-semibold md:text-start">Sunglasses, summer outfits, skincare</p>
                  <p className="text-hero-content1 text-center text-3xl font-semibold md:text-start">and beach accessories</p>
               </div>
               <Link
                  href="/products"
                  className="mt-5"
               >
                  <button className="btn btn-xl bg-warning text-warning-content shadow-warning/50 animate__animated animate__bounce rounded-3xl border-0 shadow-lg">
                     Shop now
                  </button>
               </Link>
            </div>
            {/* 2nd COLUMN */}
            <div className="flex items-center justify-center">
               <ProductCarousel products={products.slice(0, 6)} />
            </div>
         </div>
         {/* Hero ends here */}

         {/* POPULAR PRODUCTS */}

         <div className="container mx-auto mb-10 space-y-7">
            <h1 className="text-base-content text-center text-4xl font-bold md:text-start md:text-6xl">Popular Products</h1>
            <hr className="border-base-content/15" />
            <div className="">
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {products.slice(0, 3).map((product) => (
                     <ProductCard
                        key={product.id}
                        product={product}
                     ></ProductCard>
                  ))}
               </div>
            </div>
         </div>

         {/* SUMMER CARE TIPS */}
         <div className="container mx-auto space-y-5">
            <h1 className="text-center text-4xl font-bold md:text-start md:text-6xl">Summer Care Tips</h1>
            <hr className="border-base-content/15" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
               {tips.map((tip) => (
                  <div
                     key={tip.title}
                     className={`bg-base-200 border-base-content/10 rounded-2xl border border-t-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${tip.accent}`}
                  >
                     <p className="text-base-content mb-2 text-xl font-bold">{tip.title}</p>
                     <p className="text-base-content/70 text-base">{tip.text}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Top brands */}
         <div className="container mx-auto mt-10 space-y-5">
            <h1 className="text-center text-4xl font-bold md:text-start md:text-6xl">Top Brands</h1>
            <hr className="border-base-content/15" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
               {topBrands.map((b) => (
                  <div
                     key={b.brand.toLowerCase()}
                     className="bg-base-200 border-base-content/10 hover:border-warning flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                     <p className="text-base-content text-3xl font-semibold">{b.brand}</p>
                     <p className="text-primary text-2xl font-semibold">★ {b.avgRating.toFixed(1)}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
