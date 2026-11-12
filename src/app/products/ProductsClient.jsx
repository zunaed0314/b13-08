"use client";

import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

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
         <div className="flex w-full items-center gap-6 px-5">
            <form
               className="flex items-center gap-6"
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
               }}
            >
               <label className="input border-base-300 border focus-within:border-blue-500 focus-within:outline-none">
                  <svg
                     className="h-[1em] opacity-50"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                  >
                     <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                     >
                        <circle
                           cx="11"
                           cy="11"
                           r="8"
                        ></circle>
                        <path d="m21 21-4.3-4.3"></path>
                     </g>
                  </svg>

                  <input
                     type="search"
                     value={searchInp}
                     onChange={(e) => setSearchInp(e.target.value)}
                     placeholder="Search products..."
                  />
               </label>

               <button
                  type="submit"
                  className="btn"
               >
                  Search
               </button>
            </form>

            <fieldset className="fieldset">
               <select
                  className="select border-base-300 border focus:border-blue-500 focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => handleCategory(e.target.value)}
               >
                  <option value="All">All Categories</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
               </select>
            </fieldset>
         </div>

         <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
               <div key={product.id}>
                  <ProductCard product={product}></ProductCard>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ProductsClient;
