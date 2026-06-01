export function ProductCardSkeleton() {
  return (
    <div className="gb-product-card" aria-hidden="true">
      <div className="gb-product-image-wrap">
        <div className="gb-skeleton h-full w-full rounded-md" />
      </div>

      <div className="gb-product-content">
        <div className="gb-skeleton mb-2 h-4 w-4/5 rounded-sm" />
        <div className="gb-skeleton mb-3 h-4 w-3/5 rounded-sm" />

        <div className="gb-product-price-row">
          <div className="gb-skeleton h-5 w-16 rounded-sm" />
          <div className="gb-skeleton h-4 w-12 rounded-sm" />
        </div>

        <div className="gb-product-actions">
          <div className="gb-skeleton h-11 w-full rounded-sm" />
        </div>
      </div>
    </div>
  );
}