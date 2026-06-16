import { ProductCardSkeleton } from "../product-card";
import type {
  ProductShowcaseLayout,
  ProductShowcaseVariant,
} from "./product-showcase.types";

type ProductShowcaseSkeletonProps = Readonly<{
  productCount?: number;
  showCountdown?: boolean;
  showAction?: boolean;
  variant?: ProductShowcaseVariant;
  layout?: ProductShowcaseLayout;
  className?: string | undefined;
}>;

const MIN_PRODUCT_COUNT = 1;
const MAX_PRODUCT_COUNT = 24;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getSafeProductCount(count: number) {
  if (!Number.isFinite(count)) {
    return MIN_PRODUCT_COUNT;
  }

  return Math.min(
    MAX_PRODUCT_COUNT,
    Math.max(MIN_PRODUCT_COUNT, Math.floor(count)),
  );
}

export function ProductShowcaseSkeleton({
  productCount = 6,
  showCountdown = true,
  showAction = true,
  variant = "default",
  layout = "carousel",
  className,
}: ProductShowcaseSkeletonProps) {
  const safeProductCount = getSafeProductCount(productCount);
  const hasToolbar = showCountdown || showAction;

  return (
    <section
      className={cn(
        "gb-product-showcase gb-product-showcase--skeleton",
        className,
      )}
      data-variant={variant}
      data-layout={layout}
      aria-hidden="true"
    >
      <div className="gb-container gb-product-showcase__container">
        <header className="gb-product-showcase__header">
          <div className="gb-product-showcase__heading-group">
            <div className="gb-product-showcase__title-row">
              <div className="gb-product-showcase__skeleton-icon gb-skeleton" />

              <div className="gb-product-showcase__title-stack">
                <div className="gb-product-showcase__skeleton-eyebrow gb-skeleton" />
                <div className="gb-product-showcase__skeleton-title gb-skeleton" />
              </div>
            </div>

            <div className="gb-product-showcase__skeleton-subtitle gb-skeleton" />
          </div>

          {hasToolbar ? (
            <div className="gb-product-showcase__toolbar">
              {showCountdown ? (
                <div className="gb-product-showcase__skeleton-countdown">
                  <div className="gb-product-showcase__skeleton-countdown-label gb-skeleton" />
                  <div className="gb-product-showcase__skeleton-countdown-box gb-skeleton" />
                  <div className="gb-product-showcase__skeleton-countdown-box gb-skeleton" />
                  <div className="gb-product-showcase__skeleton-countdown-box gb-skeleton" />
                  <div className="gb-product-showcase__skeleton-countdown-box gb-skeleton" />
                </div>
              ) : null}

              {showAction ? (
                <div className="gb-product-showcase__skeleton-action gb-skeleton" />
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="gb-product-showcase__content">
          <div className="gb-product-showcase__list" role="list">
            <ProductCardSkeleton count={safeProductCount} />
          </div>
        </div>
      </div>
    </section>
  );
}