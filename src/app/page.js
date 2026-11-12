import { ThemeSwitch } from "@/components/ThemeSwitch";
import { FaFire } from "react-icons/fa6";
import "animate.css";
import Image from "next/image";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";

export default async function Home() {
   const res = await fetch("https://sun-cart-server-c57l.onrender.com/products");
   const products = await res.json();

   return (
      <div className="bg-base-100 text-base-content">
         {/* GRID START */}
         <div className="custom-hero bg-hero grid min-h-screen w-full grid-cols-2 items-center justify-center rounded-xl p-5">
            {/* 1st COLUMN */}
            <div className="border-base-content-100 space-y-3 border-r p-8">
               <div className="bg-warning flex w-fit items-center justify-center gap-1 rounded-2xl px-4 py-1">
                  <span className="text-warning-content">
                     <FaFire />
                  </span>
                  <span className="text-warning-content font-semibold">Hot deals</span>
               </div>
               <div className="flex flex-col">
                  <p className="text-base-content text-7xl font-semibold">Summer Sale</p>
                  <p className="text-base-content text-7xl font-semibold">50% OFF</p>
               </div>
               <div className="flex flex-col">
                  <p className="text-hero-content1 text-3xl font-semibold">Sunglasses, summer outfits, skincare</p>
                  <p className="text-hero-content1 text-3xl font-semibold">and beach accessories</p>
               </div>
               <Link href='/products'>
                  <button className="btn btn-xl bg-warning text-warning-content animate__animated animate__bounce rounded-3xl">Shop now</button>
               </Link>
            </div>
            {/* 2nd COLUMN */}
            <div className="flex items-center justify-center">
               <ProductCarousel products={products.slice(0, 6)} />
            </div>
         </div>
      </div>
   );
}
