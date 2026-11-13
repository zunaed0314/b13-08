import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }) {
   const { id } = await params;

   const res = await fetch(`https://sun-cart-server-c57l.onrender.com/products/${id}`);

   if (!res.ok) {
      return {
         title: "Product Not Found",
         description: "The requested product could not be found.",
      };
   }

   const product = await res.json();

   return {
      title: product.title,
      description: product.description,
   };
}
const ProductDetailsPage = async ({ params }) => {
   const { id } = await params;
   const res = await fetch(`https://sun-cart-server-c57l.onrender.com/products/${id}`);
   const product = await res.json();
   const inStock = product.stock > 0;

   return (
      <div className="container mx-auto mt-25 mb-10 flex flex-col px-4">
         <div className="bg-base-200 border-base-content/10 grid grid-cols-1 gap-8 overflow-hidden rounded-4xl border shadow-xl md:grid-cols-[400px_1fr]">
            {/* Image column */}
            <div className="flex w-full items-center justify-center p-5">
               <div className="bg-base-100 border-base-content/10 w-full rounded-3xl border">
                  <Image
                     src={product.image}
                     alt={product.name}
                     width={400}
                     height={400}
                     className="h-96 w-full rounded-3xl object-contain p-4"
                  />
               </div>
            </div>

            {/* Details column */}
            <div className="flex flex-col space-y-5 p-5 md:p-8">
               <div className="flex flex-wrap items-center gap-2">
                  {product.category && <span className="badge badge-secondary border-0 font-semibold">{product.category}</span>}
                  {product.stock != null && (
                     <span className={`badge border-0 font-semibold ${inStock ? "badge-success" : "badge-error"}`}>
                        {inStock ? `${product.stock} in stock` : "Out of stock"}
                     </span>
                  )}
               </div>

               <div>
                  <p className="text-base-content text-4xl font-bold">{product.name}</p>
                  <p className="text-base-content/60 mt-1 text-lg">by {product.brand}</p>
               </div>

               <div className="bg-base-100 border-base-content/10 flex w-fit items-center gap-2 rounded-full border px-4 py-1.5">
                  <span className="text-warning text-xl">★</span>
                  <span className="text-base-content text-xl font-bold">{product.rating}</span>
                  <span className="text-base-content/60">/ 5</span>
               </div>

               <div>
                  <p className="text-base-content/60 text-sm font-semibold tracking-wide uppercase">Description</p>
                  <p className="text-base-content/80 mt-1 text-lg leading-relaxed">{product.description}</p>
               </div>

               <div className="border-base-content/10 mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-5">
                  <div>
                     <p className="text-base-content/60 text-sm font-semibold tracking-wide uppercase">Price</p>
                     <p className="text-primary text-4xl font-bold">${product.price}</p>
                  </div>
                  <Link
                     href="/products"
                     className="btn btn-primary rounded-full px-6"
                  >
                     Back to Products
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetailsPage;
