import ProductsClient from "./ProductsClient";

const ProductsPage = async () => {
   const res = await fetch("https://sun-cart-server-c57l.onrender.com/products");

   if (!res.ok) {
      throw new Error("Failed to fetch products");
   }

   const products = await res.json();

   return <ProductsClient products={products} />;
};

export default ProductsPage;
