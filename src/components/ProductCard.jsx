import Image from 'next/image';
import React from 'react';

const ProductCard = ({product}) => {
   return (
      <div className="card flex h-full flex-col space-y-3 rounded-lg border border-pink-500 px-7 py-3">
         <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="h-48 w-full object-contain"
         />
         <p className="text-base-content">
            {product.name} from {product.brand}
         </p>
         <p className="text-base-content">${product.price}</p>
         <div className="mt-auto flex justify-between pt-4 border-t border-text-base-content">
            <p className="text-base-content">Stock: {product.stock}</p>
            <p className="text-base-content">Rating: {product.rating}</p>
         </div>
      </div>
   );
};

export default ProductCard;