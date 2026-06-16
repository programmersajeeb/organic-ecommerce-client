import type { Route } from "next";
import Link from "next/link";

import { ShopByCategoryCard } from "./shop-by-category-card";
import { shopByCategoryData } from "./shop-by-category-data";
import type { ShopByCategorySectionViewModel } from "./shop-by-category.types";
import { ShopByCategorySkeleton } from "./skeleton";

type ShopByCategorySectionProps = Readonly<{
  data?: ShopByCategorySectionViewModel;
  loading?: boolean;
  className?: string | undefined;
}>;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ShopByCategorySection({
  className,
  data = shopByCategoryData,
  loading = false,
}: ShopByCategorySectionProps) {
  const items = data.items ?? [];
  const hasItems = items.length > 0;
  const viewAllHref = data.viewAllHref as Route;

  if (loading) {
    return <ShopByCategorySkeleton {...(className ? { className } : {})} />;
  }

  return (
    <section
      aria-labelledby={data.headingId}
      className={cn("gb-shop-by-category", className)}
    >
      <div className="gb-shop-by-category__container">
        <div className="gb-shop-by-category__header">
          <h2 id={data.headingId} className="gb-shop-by-category__title">
            {data.heading}
          </h2>

          <Link
            href={viewAllHref}
            className="gb-shop-by-category__view-all"
            aria-label={`${data.viewAllLabel}: ${data.heading}`}
          >
            <span>{data.viewAllLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {hasItems ? (
          <ul className="gb-shop-by-category__grid" aria-label={data.ariaLabel}>
            {items.map((item) => (
              <li key={item.id} className="gb-shop-by-category__item">
                <ShopByCategoryCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="gb-shop-by-category__empty" role="status">
            Categories are not available right now.
          </div>
        )}
      </div>
    </section>
  );
}