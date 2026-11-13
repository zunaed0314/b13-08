import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
   return (
      <div className="card animate__animated animate__bounce bg-base-300 hover:border-primary flex h-full flex-col overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
         {/* Product Image */}
         <div className="bg-base-200 flex h-48 w-full items-center justify-center rounded-lg p-3">
            <Image
               src={product.image}
               alt={product.name}
               width={200}
               height={200}
               className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
         </div>

         {/* Product Information */}
         <div className="mt-4 flex flex-col gap-3">
            <div>
               <h2 className="text-base-content text-xl font-bold">{product.name}</h2>
               <p className="text-base-content/60 mt-1 text-sm">by {product.brand}</p>
            </div>

            <p className="text-primary text-2xl font-bold">${product.price}</p>
         </div>

         {/* Stock and Rating */}
         <div className=" mt-auto flex items-center justify-between border-t border-base-100/60 pt-4">
            <div className="flex flex-col">
               <span className={`font-semibold ${product.stock > 0 ? "text-success" : "text-error"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
               </span>
               <span className="text-base-content font-semibold">★ {product.rating}/5</span>
            </div>

            <Link href={`/products/${product.id}`}>
               <button className="btn flex flex-col items-end border border-black">Show details</button>
            </Link>
         </div>
      </div>
   );
};

export default ProductCard;
