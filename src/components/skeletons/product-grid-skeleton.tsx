import { ProductCardSkeleton } from "./product-card-skeleton";

type ProductGridSkeletonProps = {
  count?: number;
};

export function ProductGridSkeleton({ count = 10 }: ProductGridSkeletonProps) {
  return (
    <div className="gb-product-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}