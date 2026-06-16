type ProductCardSkeletonProps = Readonly<{
  count?: number;
  className?: string | undefined;
}>;

const MIN_SKELETON_COUNT = 1;
const MAX_SKELETON_COUNT = 24;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getSafeSkeletonCount(count: number) {
  if (!Number.isFinite(count)) {
    return MIN_SKELETON_COUNT;
  }

  return Math.min(
    MAX_SKELETON_COUNT,
    Math.max(MIN_SKELETON_COUNT, Math.floor(count)),
  );
}

export function ProductCardSkeleton({
  count = MIN_SKELETON_COUNT,
  className,
}: ProductCardSkeletonProps) {
  const skeletonCount = getSafeSkeletonCount(count);

  return (
    <>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <article
          key={index}
          className={cn("gb-product-card gb-product-card--skeleton", className)}
          aria-hidden="true"
        >
          <div className="gb-product-card__media">
            <div className="gb-product-card__skeleton-badge gb-skeleton" />
            <div className="gb-product-card__skeleton-wishlist gb-skeleton" />
            <div className="gb-product-card__skeleton-image gb-skeleton" />
          </div>

          <div className="gb-product-card__body">
            <div className="gb-product-card__skeleton-title gb-skeleton" />
            <div className="gb-product-card__skeleton-title gb-product-card__skeleton-title--short gb-skeleton" />
            <div className="gb-product-card__skeleton-rating gb-skeleton" />
            <div className="gb-product-card__skeleton-price gb-skeleton" />
            <div className="gb-product-card__skeleton-button gb-skeleton" />
          </div>
        </article>
      ))}
    </>
  );
}