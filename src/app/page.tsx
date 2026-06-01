import { ProductCard } from "@/components/common/product-card";
import { SectionHeading } from "@/components/common/section-heading";

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
  return (
    <main className="min-h-screen bg-page">
      <section className="gb-section-gradient gb-section">
        <div className="gb-container">
          <SectionHeading
            title="Top Selling Products"
            actionText="View All Items →"
          />

          <div className="gb-product-grid">
            {productData.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}