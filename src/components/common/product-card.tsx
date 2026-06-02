import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = Readonly<{
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "error";
  href?: string;
  buttonLabel?: string;
  imagePriority?: boolean;
}>;

function getBadgeClassName(badgeType: ProductCardProps["badgeType"]) {
  if (badgeType === "warning") {
    return "gb-badge-warning";
  }

  if (badgeType === "error") {
    return "gb-badge-error";
  }

  return "gb-badge-success";
}

export function ProductCard({
  title,
  image,
  price,
  oldPrice,
  badge,
  badgeType = "success",
  href,
  buttonLabel = "Add To Cart",
  imagePriority = false,
}: ProductCardProps) {
  const badgeClass = getBadgeClassName(badgeType);
  const productTitleId = `product-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

  const productImage = (
    <Image
      src={image}
      alt={title}
      fill
      className="gb-product-image"
      sizes="(max-width: 380px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      priority={imagePriority}
    />
  );

  return (
    <article className="gb-product-card" aria-labelledby={productTitleId}>
      {badge ? (
        <span className={`gb-product-badge ${badgeClass}`}>{badge}</span>
      ) : null}

      <div className="gb-product-image-wrap">
        {href ? (
          <Link
            href={href}
            className="gb-product-image-link"
            aria-label={`View details for ${title}`}
          >
            {productImage}
          </Link>
        ) : (
          productImage
        )}
      </div>

      <div className="gb-product-content">
        <h3 id={productTitleId} className="gb-product-title">
          {href ? (
            <Link href={href} className="gb-product-title-link">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        <div className="gb-product-price-row" aria-label="Product price">
          <span className="gb-price">{price}</span>

          {oldPrice ? (
            <del
              className="gb-old-price"
              aria-label={`Previous price ${oldPrice}`}
            >
              {oldPrice}
            </del>
          ) : null}
        </div>

        <div className="gb-product-actions">
          <button
            type="button"
            className="gb-btn-outline gb-product-cart-btn"
            aria-label={`${buttonLabel} - ${title}`}
            data-product-title={title}
          >
            <ShoppingCart aria-hidden="true" focusable="false" size={15} />
            <span>{buttonLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}