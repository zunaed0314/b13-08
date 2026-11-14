import ProductCard from "@/components/ProductCard";
import AnimatedHero from "@/components/AnimatedHero";
import ScrollReveal from "@/components/ScrollReveal";

const tips = [
   {
      title: "Stay hydrated",
      text: "Drink water through the day, especially when you are outdoors.",
      accent: "border-t-secondary",
   },
   {
      title: "Protect your skin",
      text: "Apply sunscreen before going out and reapply during long days in the sun.",
      accent: "border-t-primary",
   },
   {
      title: "Keep cool",
      text: "Wear light, breathable clothes and take breaks in the shade.",
      accent: "border-t-accent",
   },
];

export default async function Home() {
   const res = await fetch("https://sun-cart-server-c57l.onrender.com/products");
   const products = await res.json();

   // Aggregate ratings per brand
   const brandStats = new Map();

   for (const p of products) {
      if (!p.brand || p.brand.trim() === "" || p.rating == null) continue;

      const key = p.brand.trim().toLowerCase();
      const entry = brandStats.get(key) ?? {
         brand: p.brand.trim(),
         total: 0,
         count: 0,
      };

      entry.total += Number(p.rating);
      entry.count += 1;
      brandStats.set(key, entry);
   }

   // Top 3 brands by average rating
   const topBrands = [...brandStats.values()]
      .map((e) => ({
         brand: e.brand,
         avgRating: e.total / e.count,
         count: e.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 3);

   return (
      <div className="bg-base-100 text-base-content mt-8">
         {/* HERO START */}
         <AnimatedHero products={products.slice(0, 6)} />

         {/* POPULAR PRODUCTS */}
         <ScrollReveal
            direction="up"
            once={true}
            delay={100}
         >
            <div className="container mx-auto mb-10 space-y-7">
               <h1 className="text-base-content text-center text-4xl font-bold md:text-start md:text-6xl">Popular Products</h1>

               <hr className="border-base-content/15" />

               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {products.slice(0, 3).map((product) => (
                     <ProductCard
                        key={product.id}
                        product={product}
                     />
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* SUMMER CARE TIPS */}
         <ScrollReveal
            direction="left"
            once={true}
            delay={150}
         >
            <div className="container mx-auto space-y-5">
               <h1 className="text-center text-4xl font-bold md:text-start md:text-6xl">Summer Care Tips</h1>

               <hr className="border-base-content/15" />

               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tips.map((tip) => (
                     <div
                        key={tip.title}
                        className={`bg-base-200 border-base-content/10 rounded-2xl border border-t-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${tip.accent}`}
                     >
                        <p className="text-base-content mb-2 text-xl font-bold">{tip.title}</p>

                        <p className="text-base-content/70 text-base">{tip.text}</p>
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* TOP BRANDS */}
         <ScrollReveal
            direction="up"
            once={true}
            delay={200}
            animationConfig={{
               tension: 80,
               friction: 25,
            }}
         >
            <div className="container mx-auto mt-10 space-y-5">
               <h1 className="text-center text-4xl font-bold md:text-start md:text-6xl">Top Brands</h1>

               <hr className="border-base-content/15" />

               <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {topBrands.map((b) => (
                     <div
                        key={b.brand.toLowerCase()}
                        className="bg-base-200 border-base-content/10 hover:border-warning flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                     >
                        <p className="text-base-content text-3xl font-semibold">{b.brand}</p>

                        <p className="text-primary text-2xl font-semibold">★ {b.avgRating.toFixed(1)}</p>
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>
      </div>
   );
}
