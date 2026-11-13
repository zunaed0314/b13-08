import Image from "next/image";
import React from "react";

const ProductDetailsPage = async ({ params }) => {
   const { id } = await params;
   const res = await fetch(`https://sun-cart-server-c57l.onrender.com/products/${id}`);
   const product = await res.json();
   return (
      <div className="container mx-auto mt-25 flex flex-col">
         <div className="grid grid-cols-1 md:grid-cols-[400px_1fr]  gap-8 rounded-4xl border">
            {/* Image column */}
            <div className="flex w-full items-center justify-center p-5">
               <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-96 w-full rounded-3xl border border-black object-contain"
               />
            </div>

            {/* Details column */}
            <div className="flex flex-col space-y-6 p-5">
               <p className="text-base-content text-4xl font-bold">{product.name}</p>

               <div>
                  <span className="text-xl font-bold">Brand: </span>
                  <span className="text-xl">{product.brand}</span>
               </div>

               <div>
                  <span className="text-xl font-bold">Description: </span>
                  <span className="text-xl">{product.description}</span>
               </div>

               <div>
                  <span className="text-xl font-bold">Rating: </span>
                  <span className="text-xl font-bold">{product.rating}</span>
               </div>

               <div className="mt-auto">
                  <span className="text-xl font-bold">Price: </span>
                  <span className="text-success text-2xl font-bold">${product.price}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetailsPage;
