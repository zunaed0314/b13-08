"use client";

import { useSpring, animated } from "@react-spring/web";
import { FaFire } from "react-icons/fa6";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";

const AnimatedHero = ({ products }) => {
   const springs = useSpring({
      from: {
         opacity: 0,
         transform: "translateY(40px)",
      },
      to: {
         opacity: 1,
         transform: "translateY(0px)",
      },
      config: {
         tension: 120,
         friction: 20,
      },
   });

   return (
      <animated.div
         style={springs}
         className="custom-hero bg-hero mb-10 grid min-h-screen w-full grid-cols-1 items-center justify-center rounded-xl p-5 md:grid-cols-2"
      >
         {/* First column */}
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
               <button className="btn btn-xl bg-warning text-warning-content shadow-warning/50 rounded-3xl border-0 shadow-lg">Shop now</button>
            </Link>
         </div>

         {/* Second column */}
         <div className="flex items-center justify-center">
            <ProductCarousel products={products} />
         </div>
      </animated.div>
   );
};

export default AnimatedHero;
