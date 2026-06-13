import { Skeleton } from "@/components/common/skeleton";

const SHOP_BY_CATEGORY_SKELETON_ITEM_COUNT = 7;

const skeletonItems = Array.from(
  { length: SHOP_BY_CATEGORY_SKELETON_ITEM_COUNT },
  (_, index) => `shop-by-category-skeleton-${index + 1}`,
);

type ShopByCategorySkeletonProps = Readonly<{
  className?: string;
}>;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ShopByCategorySkeleton({
  className,
}: ShopByCategorySkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className={cn("gb-section-tight gb-shop-by-category", className)}
    >
      <div className="gb-container">
        <div className="gb-shop-by-category__header">
          <Skeleton className="gb-shop-by-category-skeleton__title" />
          <Skeleton className="gb-shop-by-category-skeleton__action" />
        </div>

        <ul className="gb-shop-by-category__grid">
          {skeletonItems.map((itemId) => (
            <li key={itemId} className="gb-shop-by-category__item">
              <div className="gb-shop-by-category-card">
                <div className="gb-shop-by-category-card__image-wrapper">
                  <Skeleton className="gb-shop-by-category-skeleton__image" />
                </div>

                <Skeleton className="gb-shop-by-category-skeleton__text" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}