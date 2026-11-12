"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import "animate.css";


const ProductsClient = ({ products }) => {
   const searchParams = useSearchParams();
   const router = useRouter();

   const appliedSearch = searchParams.get("search") || "";
   const selectedCategory = searchParams.get("category") || "All";

   const [searchInp, setSearchInp] = useState(appliedSearch);

   const handleSearch = () => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchInp.trim()) {
         params.set("search", searchInp.trim());
      } else {
         params.delete("search");
      }

      const queryString = params.toString();

      router.replace(queryString ? `/products?${queryString}` : "/products");
   };

   const handleCategory = (value) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "All") {
         params.delete("category");
      } else {
         params.set("category", value);
      }

      const queryString = params.toString();

      router.replace(queryString ? `/products?${queryString}` : "/products");
   };

   const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(appliedSearch.toLowerCase());

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
   });

   return ( 
      <div className="container mx-auto mt-25 flex flex-col items-center justify-center">
         <h1 className="animate__animated animate__bounce">An animated element</h1>

         <div className="flex w-full flex-col items-center gap-5 px-5 sm:flex-row sm:justify-start">
            {/* Search */}
            <form
               className="flex w-full max-w-lg items-center gap-2"
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
               }}
            >
               <label className="input border-base-300 bg-base-100 focus-within:border-primary h-12 w-full border focus-within:outline-none">
                  <svg
                     className="h-5 w-5 opacity-50"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                  >
                     <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                     >
                        <circle
                           cx="11"
                           cy="11"
                           r="8"
                        />
                        <path d="m21 21-4.3-4.3" />
                     </g>
                  </svg>

                  <input
                     type="search"
                     value={searchInp}
                     onChange={(e) => setSearchInp(e.target.value)}
                     placeholder="Search products..."
                     className="grow"
                  />
               </label>

               <button
                  type="submit"
                  className="btn bg-primary text-primary-content h-12 border-0 px-6 hover:opacity-90"
               >
                  Search
               </button>
            </form>

            {/* Category Filter */}
            <div className="flex w-full flex-col gap-2 sm:w-auto">
               <select
                  className="select border-base-300 bg-base-100 focus:border-primary h-12 w-full border focus:outline-none sm:w-52"
                  value={selectedCategory}
                  onChange={(e) => handleCategory(e.target.value)}
               >
                  <option value="All">All Categories</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
               </select>
            </div>
         </div>

         <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
               {filteredProducts.map((product) => (
                  <div key={product.id}>
                     {/* <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                     > */}
                     <ProductCard product={product}></ProductCard>
                     {/* </Link> */}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProductsClient;
