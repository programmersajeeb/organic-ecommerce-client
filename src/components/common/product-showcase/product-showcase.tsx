"use client";

import type { Route } from "next";
import { useId, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "../product-card";
import type { ProductShowcaseProps } from "./product-showcase.types";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProductShowcase({
  id,
  title,
  subtitle,
  eyebrow,
  icon,
  products,
  countdown,
  action,
  variant = "default",
  layout = "carousel",
  showArrows = true,
  emptyMessage = "Products are not available right now.",
  className,
  listClassName,
  cardOptions,
}: ProductShowcaseProps) {
  const reactId = useId();
  const cleanReactId = reactId.replaceAll(":", "");
  const sectionId = id ?? `product-showcase-${cleanReactId}`;
  const titleId = `${sectionId}-title`;
  const listRef = useRef<HTMLDivElement | null>(null);
  const actionHref = action?.href as Route | undefined;

  const hasProducts = products.length > 0;
  const hasCountdown = Boolean(countdown?.length);
  const hasAction = Boolean(action && actionHref);
  const hasToolbar = hasCountdown || hasAction;
  const canShowArrows = showArrows && layout === "carousel" && hasProducts;

  function handleScroll(direction: "previous" | "next") {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const scrollAmount = Math.round(list.clientWidth * 0.86);

    list.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section
      id={sectionId}
      className={cn("gb-product-showcase", className)}
      data-variant={variant}
      data-layout={layout}
      aria-labelledby={titleId}
    >
      <div className="gb-container gb-product-showcase__container">
        <header className="gb-product-showcase__header">
          <div className="gb-product-showcase__heading-group">
            <div className="gb-product-showcase__title-row">
              {icon ? (
                <span className="gb-product-showcase__icon" aria-hidden="true">
                  {icon}
                </span>
              ) : null}

              <div className="gb-product-showcase__title-stack">
                {eyebrow ? (
                  <p className="gb-product-showcase__eyebrow">{eyebrow}</p>
                ) : null}

                <h2 id={titleId} className="gb-product-showcase__title">
                  {title}
                </h2>
              </div>
            </div>

            {subtitle ? (
              <p className="gb-product-showcase__subtitle">{subtitle}</p>
            ) : null}
          </div>

          {hasToolbar ? (
            <div className="gb-product-showcase__toolbar">
              {hasCountdown && countdown ? (
                <div
                  className="gb-product-showcase__countdown"
                  aria-label="Deal countdown"
                >
                  <span className="gb-product-showcase__countdown-label">
                    Ends in:
                  </span>

                  <div className="gb-product-showcase__countdown-list">
                    {countdown.map((item, index) => (
                      <span
                        key={`${item.value}-${item.label}-${index}`}
                        className="gb-product-showcase__countdown-item"
                      >
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasAction && action && actionHref ? (
                <Link
                  href={actionHref}
                  className="gb-product-showcase__action"
                  aria-label={action.ariaLabel ?? action.label}
                >
                  <span>{action.label}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="gb-product-showcase__content">
          {canShowArrows ? (
            <button
              type="button"
              className="gb-product-showcase__arrow gb-product-showcase__arrow--previous"
              aria-label={`Previous products in ${title}`}
              onClick={() => handleScroll("previous")}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
          ) : null}

          {hasProducts ? (
            <div
              ref={listRef}
              className={cn("gb-product-showcase__list", listClassName)}
              role="list"
              aria-label={title}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="gb-product-showcase__item"
                  role="listitem"
                >
                  <ProductCard
                    product={product}
                    priority={index < 4}
                    {...cardOptions}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="gb-product-showcase__empty">{emptyMessage}</p>
          )}

          {canShowArrows ? (
            <button
              type="button"
              className="gb-product-showcase__arrow gb-product-showcase__arrow--next"
              aria-label={`Next products in ${title}`}
              onClick={() => handleScroll("next")}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}