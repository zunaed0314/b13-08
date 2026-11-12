"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const ProductCarousel = ({ products }) => {
   const carouselRef = useRef(null);
   const indexRef = useRef(1);

   const autoResetTimeoutRef = useRef(null);
   const navResetTimeoutRef = useRef(null);
   const resumeTimeoutRef = useRef(null);

   const [isPaused, setIsPaused] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);

   const slides = products.length ? [products[products.length - 1], ...products, products[0]] : [];

   // Scroll to a particular slide
   const scrollTo = useCallback(
      (index, smooth = true) => {
         const carousel = carouselRef.current;
         if (!carousel) return;

         const items = carousel.querySelectorAll(".carousel-item");
         if (!items[index]) return;

         carousel.scrollTo({
            left: items[index].offsetLeft,
            behavior: smooth ? "smooth" : "instant",
         });

         indexRef.current = index;

         // Update the active pagination dot
         const realIndex = index === 0 ? products.length - 1 : index === slides.length - 1 ? 0 : index - 1;

         setActiveIndex(realIndex);
      },
      [products.length, slides.length],
   );

   // Start from the first actual product
   useEffect(() => {
      if (products.length) {
         scrollTo(1, false);
      }
   }, [scrollTo, products.length]);

   // Auto-play
   useEffect(() => {
      if (isPaused || products.length <= 1) return;

      const interval = setInterval(() => {
         const next = indexRef.current + 1;

         scrollTo(next);

         // Reached the last clone
         if (next === slides.length - 1) {
            clearTimeout(autoResetTimeoutRef.current);

            autoResetTimeoutRef.current = setTimeout(() => {
               scrollTo(1, false);
            }, 600);
         }
      }, 2500);

      return () => {
         clearInterval(interval);
         clearTimeout(autoResetTimeoutRef.current);
      };
   }, [isPaused, products.length, slides.length, scrollTo]);

   // Block keyboard scrolling
   useEffect(() => {
      const blockKeys = (e) => {
         const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "PageUp", "PageDown", "Home", "End"];

         const carousel = carouselRef.current;

         if (keys.includes(e.key) && carousel && carousel.contains(document.activeElement)) {
            e.preventDefault();
         }
      };

      document.addEventListener("keydown", blockKeys);

      return () => document.removeEventListener("keydown", blockKeys);
   }, []);

   // Resume autoplay after manual interaction
   const resumeAutoPlay = () => {
      clearTimeout(resumeTimeoutRef.current);

      resumeTimeoutRef.current = setTimeout(() => {
         setIsPaused(false);
      }, 4000);
   };

   // Navigate directly using pagination dots
   const handleDirectNav = (index) => {
      setIsPaused(true);

      clearTimeout(navResetTimeoutRef.current);
      clearTimeout(resumeTimeoutRef.current);

      scrollTo(index + 1, true);

      resumeAutoPlay();
   };

   // Navigate using left and right arrows
   const handleManualNav = (dir) => {
      setIsPaused(true);

      clearTimeout(navResetTimeoutRef.current);
      clearTimeout(resumeTimeoutRef.current);

      const next = indexRef.current + dir;

      scrollTo(next);

      // Reached the first clone (last product)
      if (next === 0) {
         navResetTimeoutRef.current = setTimeout(() => {
            scrollTo(products.length, false);
         }, 600);
      }

      // Reached the last clone (first product)
      else if (next === slides.length - 1) {
         navResetTimeoutRef.current = setTimeout(() => {
            scrollTo(1, false);
         }, 600);
      }

      resumeAutoPlay();
   };

   // Empty products check
   if (!products.length) {
      return <p>No products available.</p>;
   }

   return (
      <div className="relative mb-10 w-full">
         {/* Carousel */}
         <div
            ref={carouselRef}
            tabIndex={-1}
            className="carousel rounded-box h-80 w-full overflow-x-auto outline-none"
            style={{ scrollbarWidth: "none" }}
         >
            {slides.map((p, i) => (
               <div
                  key={`${p.id}-${i}`}
                  className="carousel-item relative flex w-full items-center justify-center"
               >
                  <Image
                     src={p.image}
                     alt={p.name}
                     fill
                     sizes="(max-width: 768px) 100vw, 50vw"
                     className="object-contain"
                  />
               </div>
            ))}
         </div>

         {/* Pagination dots */}
         <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {products.map((product, index) => (
               <button
                  key={product.id}
                  onClick={() => handleDirectNav(index)}
                  aria-label={`Go to ${product.name}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                     activeIndex === index ? "bg-primary w-5" : "bg-base-300 hover:bg-primary/60 w-2.5"
                  }`}
               />
            ))}
         </div>

         {/* Navigation arrows */}
         <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
            <button
               className="btn btn-circle btn-sm"
               onClick={(e) => {
                  e.currentTarget.blur();
                  handleManualNav(-1);
               }}
            >
               ❮
            </button>

            <button
               className="btn btn-circle btn-sm"
               onClick={(e) => {
                  e.currentTarget.blur();
                  handleManualNav(1);
               }}
            >
               ❯
            </button>
         </div>
      </div>
   );
};

export default ProductCarousel;
