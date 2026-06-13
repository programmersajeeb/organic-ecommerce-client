import Image from "next/image";
import Link from "next/link";

import type { ShopByCategoryItem } from "./shop-by-category.types";

type ShopByCategoryCardProps = Readonly<{
  item: ShopByCategoryItem;
  className?: string;
}>;

function cn(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ShopByCategoryCard({
  item,
  className,
}: ShopByCategoryCardProps) {
  const isMore = item.id === "more";

  return (
    <Link
      href={item.href}
      className={cn("gb-shop-by-category-card", className)}
      aria-label={`Browse products in ${item.title}`}
      data-category-id={item.id}
    >
      <span
        className="gb-shop-by-category-card__image-wrapper"
        aria-hidden={isMore}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt || item.title}
          className="gb-shop-by-category-card__image"
          width={144}
          height={144}
          sizes="(max-width: 640px) 88px, (max-width: 1024px) 104px, 120px"
          draggable={false}
          priority={false}
        />
      </span>

      <span className="gb-shop-by-category-card__title">
        {item.title}
      </span>
    </Link>
  );
}