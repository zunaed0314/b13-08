"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ProductCarousel = ({ products }) => {
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      if (products.length <= 1) return;

      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 2500);

      return () => clearInterval(interval);
   }, [products.length]);

   if (!products.length) {
      return <p>No products available.</p>;
   }

   return (
      <div className="relative h-80 w-full overflow-hidden">
         {products.map((p, index) => (
            <div
               key={p.id}
               className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  index === currentIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
               }`}
            >
               <Image
                  src={p.image}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="h-64 w-full object-contain"
               />
            </div>
         ))}
      </div>
   );
};

export default ProductCarousel;
