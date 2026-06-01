import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "error";
};

export function ProductCard({
  title,
  image,
  price,
  oldPrice,
  badge,
  badgeType = "success",
}: ProductCardProps) {
  const badgeClass =
    badgeType === "warning"
      ? "gb-badge-warning"
      : badgeType === "error"
        ? "gb-badge-error"
        : "gb-badge-success";

  return (
    <article className="gb-product-card">
      {badge ? (
        <span className={`gb-product-badge ${badgeClass}`}>{badge}</span>
      ) : null}

      <div className="gb-product-image-wrap">
        <Image
          src={image}
          alt={title}
          fill
          className="gb-product-image"
          sizes="(max-width: 380px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>

      <div className="gb-product-content">
        <h3 className="gb-product-title">{title}</h3>

        <div className="gb-product-price-row">
          <span className="gb-price">{price}</span>
          {oldPrice ? <span className="gb-old-price">{oldPrice}</span> : null}
        </div>

        <div className="gb-product-actions">
          <button
            type="button"
            className="gb-btn-outline gb-product-cart-btn"
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingCart aria-hidden="true" size={15} />
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}