"use client";

import type { Route } from "next";
import Link from "next/link";
import {
  type FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { featuredBrandsData } from "./featured-brands.data";
import type {
  FeaturedBrandItem,
  FeaturedBrandsSectionProps,
} from "./featured-brands.types";

const AUTO_SLIDE_DELAY_MS = 3600;
const SCROLL_EDGE_OFFSET = 8;

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getRouteHref(href: string) {
  return href as Route;
}

function getBrandInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word.at(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function FeaturedBrandCard({ brand }: Readonly<{ brand: FeaturedBrandItem }>) {
  return (
    <Link
      href={getRouteHref(brand.href)}
      className="gb-featured-brands__card"
      aria-label={`Shop ${brand.name} products`}
    >
      <span className="gb-featured-brands__logo" aria-hidden="true">
        {getBrandInitials(brand.name)}
      </span>

      <span className="gb-featured-brands__card-copy">
        <span className="gb-featured-brands__card-head">
          <span className="gb-featured-brands__name">{brand.name}</span>

          {brand.badgeLabel ? (
            <span className="gb-featured-brands__badge">
              {brand.badgeLabel}
            </span>
          ) : null}
        </span>

        <span className="gb-featured-brands__description">
          {brand.description}
        </span>
      </span>

      <span className="gb-featured-brands__card-icon" aria-hidden="true">
        <ArrowRight />
      </span>
    </Link>
  );
}

export function FeaturedBrandsSection({
  data = featuredBrandsData,
  className,
}: FeaturedBrandsSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);

  const hasBrands = data.brands.length > 0;
  const hasAction = Boolean(data.action);
  const canShowArrows = data.brands.length > 3;

  const handleScroll = useCallback((direction: "previous" | "next") => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;

    if (maxScrollLeft <= 0) {
      return;
    }

    const scrollAmount = Math.max(
      220,
      Math.round(Math.min(rail.clientWidth * 0.52, maxScrollLeft)),
    );

    const isAtStart = rail.scrollLeft <= SCROLL_EDGE_OFFSET;
    const isAtEnd = rail.scrollLeft >= maxScrollLeft - SCROLL_EDGE_OFFSET;

    if (direction === "previous") {
      if (isAtStart) {
        rail.scrollTo({
          left: maxScrollLeft,
          behavior: "smooth",
        });

        return;
      }

      rail.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });

      return;
    }

    if (isAtEnd) {
      rail.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    rail.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!canShowArrows || isAutoSlidePaused || prefersReducedMotion()) {
      return;
    }

    const autoSlideTimer = window.setInterval(() => {
      handleScroll("next");
    }, AUTO_SLIDE_DELAY_MS);

    return () => {
      window.clearInterval(autoSlideTimer);
    };
  }, [canShowArrows, handleScroll, isAutoSlidePaused]);

  function handleCarouselBlur(event: FocusEvent<HTMLDivElement>) {
    const nextFocusedElement = event.relatedTarget;

    if (
      !nextFocusedElement ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsAutoSlidePaused(false);
    }
  }

  return (
    <section
      className={cn("gb-featured-brands", className)}
      aria-labelledby={data.headingId}
    >
      <div className="gb-container gb-featured-brands__container">
        <div className="gb-featured-brands__header">
          <div className="gb-featured-brands__heading-group">
            <div className="gb-featured-brands__title-row">
              <span
                className="gb-featured-brands__section-icon"
                aria-hidden="true"
              >
                <BadgeCheck />
              </span>

              <div className="gb-featured-brands__title-stack">
                <p className="gb-featured-brands__eyebrow">{data.eyebrow}</p>

                <h2 id={data.headingId} className="gb-featured-brands__title">
                  {data.title}
                </h2>
              </div>
            </div>

            <p className="gb-featured-brands__subtitle">{data.subtitle}</p>
          </div>

          {hasAction && data.action ? (
            <Link
              href={getRouteHref(data.action.href)}
              className="gb-featured-brands__action"
              aria-label={data.action.ariaLabel ?? data.action.label}
            >
              <span>{data.action.label}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        {hasBrands ? (
          <div
            className="gb-featured-brands__carousel"
            onMouseEnter={() => setIsAutoSlidePaused(true)}
            onMouseLeave={() => setIsAutoSlidePaused(false)}
            onFocus={() => setIsAutoSlidePaused(true)}
            onBlur={handleCarouselBlur}
          >
            {canShowArrows ? (
              <button
                type="button"
                className="gb-featured-brands__arrow gb-featured-brands__arrow--previous"
                aria-label={`Previous brands in ${data.title}`}
                onClick={() => handleScroll("previous")}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            ) : null}

            <div
              ref={railRef}
              className="gb-featured-brands__rail"
              role="list"
              aria-label={data.title}
            >
              {data.brands.map((brand) => (
                <div
                  key={brand.id}
                  className="gb-featured-brands__item"
                  role="listitem"
                >
                  <FeaturedBrandCard brand={brand} />
                </div>
              ))}
            </div>

            {canShowArrows ? (
              <button
                type="button"
                className="gb-featured-brands__arrow gb-featured-brands__arrow--next"
                aria-label={`Next brands in ${data.title}`}
                onClick={() => handleScroll("next")}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : (
          <p className="gb-featured-brands__empty">
            Brand collections are not available right now.
          </p>
        )}
      </div>
    </section>
  );
}