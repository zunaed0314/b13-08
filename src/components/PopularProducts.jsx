import React from 'react';
import ProductCard from './ProductCard';

const PopularProducts = ({products}) => {
   return (
      <div>
         {
            products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
         }
      </div>
   );
};

export default PopularProducts;