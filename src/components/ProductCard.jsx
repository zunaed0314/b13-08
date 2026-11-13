import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
   const inStock = product.stock > 0;

   return (
      <div className="group card animate__animated animate__fadeInUp bg-base-200 border-base-content/10 hover:border-primary/60 hover:shadow-primary/15 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
         {/* Product Image */}
         <div className="bg-base-100 relative m-3 flex h-52 items-center justify-center overflow-hidden rounded-2xl">
            <Image
               src={product.image}
               alt={product.name}
               width={200}
               height={200}
               className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Stock badge */}
            <span className={`badge badge-sm absolute top-3 left-3 border-0 font-semibold ${inStock ? "badge-success" : "badge-error"}`}>
               {inStock ? `${product.stock} in stock` : "Out of stock"}
            </span>

            {/* Rating chip */}
            <span className="bg-base-100/90 text-base-content border-base-content/10 absolute top-3 right-3 flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm font-semibold backdrop-blur">
               <span className="text-warning">★</span>
               {product.rating}
            </span>
         </div>

         {/* Product Information */}
         <div className="flex flex-1 flex-col gap-1 px-5 pt-1">
            {product.category && <p className="text-secondary text-xs font-semibold tracking-wide uppercase">{product.category}</p>}
            <h2 className="text-base-content line-clamp-2 text-xl font-bold">{product.name}</h2>
            <p className="text-base-content/60 text-sm">by {product.brand}</p>
         </div>

         {/* Price and action */}
         <div className="border-base-content/10 mx-5 mt-4 mb-5 flex items-center justify-between border-t pt-4">
            <p className="text-primary text-3xl font-bold">${product.price}</p>

            <Link
               href={`/products/${product.id}`}
               className="btn btn-primary btn-sm rounded-full px-5"
            >
               Show details
            </Link>
         </div>
      </div>
   );
};

export default ProductCard;
