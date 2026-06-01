"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/common/product-card";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";

type Product = {
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "error";
};

const productData: Product[] = [
  {
    title: "Sundarban Honey 1kg",
    image: "/placeholder-product.png",
    price: "৳2,300",
    oldPrice: "৳2,500",
    badge: "Save 8%",
  },
  {
    title: "Deshi Mustard Oil 5 liter",
    image: "/placeholder-product.png",
    price: "৳1,550",
    badge: "Best Selling",
    badgeType: "warning",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productData);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="gb-section-soft min-h-screen">
      <section className="gb-container gb-section">
        <SectionHeading title="Top Selling Products" actionText="View All Items →" />

        {isLoading ? (
          <ProductGridSkeleton count={productData.length} />
        ) : (
          <div className="gb-product-grid">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}