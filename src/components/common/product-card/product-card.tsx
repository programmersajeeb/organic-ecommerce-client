"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import type { ProductCardProduct, ProductCardProps } from "./product-card.types";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getSafeRatingValue(value: number) {
  return Math.min(5, Math.max(0, value));
}

function formatRatingLabel(value: number, count: number, label?: string) {
  if (label) {
    return label;
  }

  return `${getSafeRatingValue(value).toFixed(1)} out of 5 stars from ${count} reviews`;
}

export function ProductCard({
  product,
  priority = false,
  showWishlist = true,
  showBadge = true,
  showRating = true,
  showCartAction = true,
  className,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const hasOldPrice = Boolean(product.price.old);
  const hasDiscount = Boolean(product.price.discountLabel);
  const hasBadge = showBadge && Boolean(product.badge);
  const hasRating = showRating && Boolean(product.rating);
  const canAddToCart = product.inStock !== false;
  const productHref = product.href as Route;

  const safeRatingValue = product.rating
    ? getSafeRatingValue(product.rating.value)
    : 0;

  const filledStarCount = Math.round(safeRatingValue);

  function handleWishlistClick(selectedProduct: ProductCardProduct) {
    onToggleWishlist?.(selectedProduct);
  }

  function handleAddToCartClick(selectedProduct: ProductCardProduct) {
    if (!canAddToCart) {
      return;
    }

    onAddToCart?.(selectedProduct);
  }

  return (
    <article
      className={cn("gb-product-card", className)}
      data-product-id={product.id}
      data-product-stock={product.inStock === false ? "out" : "in"}
    >
      <div className="gb-product-card__media">
        {hasBadge ? (
          <span
            className="gb-product-card__badge"
            data-tone={product.badge?.tone ?? "neutral"}
          >
            {product.badge?.label}
          </span>
        ) : null}

        {showWishlist ? (
          <button
            type="button"
            className="gb-product-card__wishlist"
            aria-label={`Add ${product.title} to wishlist`}
            onClick={() => handleWishlistClick(product)}
          >
            <Heart aria-hidden="true" />
          </button>
        ) : null}

        <Link
          href={productHref}
          className="gb-product-card__image-link"
          aria-label={`View details for ${product.title}`}
        >
          <Image
            src={product.image.src}
            alt={product.image.alt}
            className="gb-product-card__image"
            width={320}
            height={320}
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 25vw, 220px"
            priority={priority}
            draggable={false}
          />
        </Link>
      </div>

      <div className="gb-product-card__body">
        {product.category ? (
          <p className="gb-product-card__eyebrow">{product.category}</p>
        ) : null}

        <h3 className="gb-product-card__title">
          <Link href={productHref}>{product.title}</Link>
        </h3>

        {hasRating && product.rating ? (
          <div
            className="gb-product-card__rating"
            aria-label={formatRatingLabel(
              product.rating.value,
              product.rating.count,
              product.rating.label,
            )}
          >
            <span className="gb-product-card__rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "gb-product-card__rating-star",
                    index < filledStarCount &&
                      "gb-product-card__rating-star--filled",
                  )}
                  aria-hidden="true"
                />
              ))}
            </span>

            <span className="gb-product-card__rating-count">
              ({product.rating.count})
            </span>
          </div>
        ) : null}

        <div className="gb-product-card__price-row">
          <span className="gb-product-card__price-current">
            {product.price.current}
          </span>

          {hasOldPrice ? (
            <span className="gb-product-card__price-old">
              {product.price.old}
            </span>
          ) : null}

          {hasDiscount ? (
            <span className="gb-product-card__discount">
              {product.price.discountLabel}
            </span>
          ) : null}
        </div>

        {showCartAction ? (
          <button
            type="button"
            className="gb-product-card__cart-button"
            disabled={!canAddToCart}
            aria-label={
              product.inStock === false
                ? `${product.title} is out of stock`
                : `Add ${product.title} to cart`
            }
            onClick={() => handleAddToCartClick(product)}
          >
            <ShoppingCart aria-hidden="true" />
            <span>
              {product.inStock === false ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>
        ) : null}
      </div>
    </article>
  );
}