import { ProductCardSkeleton } from "./product-card-skeleton";

export function ProductGridSkeleton({ count = 10 }) {
  return (
    <div className="gb-product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}