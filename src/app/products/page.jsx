import ProductsClient from "./ProductsClient";

export const metadata = {
   title: "Explore Products",
   description: "Explore the SunCart product collection. Discover products, browse available options, and find what you're looking for.",
};
const ProductsPage = async () => {
   const res = await fetch("https://sun-cart-server-c57l.onrender.com/products");

   if (!res.ok) {
      throw new Error("Failed to fetch products");
   }

   const products = await res.json();

   return <ProductsClient products={products} />;
};

export default ProductsPage;
