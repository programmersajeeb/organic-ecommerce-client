"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Quote,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import { customerReviewsData } from "./customer-reviews.data";
import type {
  CustomerReviewItem,
  CustomerReviewsSectionProps,
} from "./customer-reviews.types";

const AUTO_SLIDE_DELAY_MS = 4200;
const SCROLL_EDGE_OFFSET = 8;

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CustomerRatingStars({ rating }: Readonly<{ rating: number }>) {
  const activeStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span
      className="gb-customer-reviews__stars"
      aria-label={`${rating} out of 5 rating`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "gb-customer-reviews__star",
            index < activeStars && "gb-customer-reviews__star--active",
          )}
        />
      ))}
    </span>
  );
}

function CustomerAvatar({
  fallback,
}: Readonly<{
  fallback: string;
}>) {
  return (
    <span className="gb-customer-reviews__avatar" aria-hidden="true">
      {fallback}
    </span>
  );
}

function VerifiedBadge({
  label,
}: Readonly<{
  label: string | undefined;
}>) {
  if (!label) {
    return null;
  }

  return (
    <span className="gb-customer-reviews__verified">
      <ShieldCheck aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function CustomerReviewCard({
  review,
}: Readonly<{
  review: CustomerReviewItem;
}>) {
  return (
    <article className="gb-customer-reviews__card" data-review-id={review.id}>
      <div className="gb-customer-reviews__card-top">
        <CustomerRatingStars rating={review.rating} />

        <span className="gb-customer-reviews__quote" aria-hidden="true">
          <Quote />
        </span>
      </div>

      <div className="gb-customer-reviews__card-copy">
        <h3 className="gb-customer-reviews__card-title">{review.title}</h3>

        <p className="gb-customer-reviews__comment">{review.comment}</p>
      </div>

      <div className="gb-customer-reviews__customer-row">
        <CustomerAvatar fallback={review.avatarFallback} />

        <span className="gb-customer-reviews__customer-meta">
          <span className="gb-customer-reviews__customer-name">
            {review.name}
          </span>

          <span className="gb-customer-reviews__customer-role">
            {review.role}
          </span>

          <span className="gb-customer-reviews__customer-location">
            {review.location}
          </span>
        </span>
      </div>

      <VerifiedBadge label={review.verifiedLabel} />
    </article>
  );
}

function FeaturedReviewCard({
  review,
}: Readonly<{
  review: CustomerReviewItem;
}>) {
  return (
    <article
      className="gb-customer-reviews__featured-card"
      data-review-id={review.id}
    >
      <span className="gb-customer-reviews__featured-glow" aria-hidden="true" />

      <div className="gb-customer-reviews__featured-top">
        <span className="gb-customer-reviews__featured-icon" aria-hidden="true">
          <Quote />
        </span>

        <CustomerRatingStars rating={review.rating} />
      </div>

      <div className="gb-customer-reviews__featured-copy">
        <h3 className="gb-customer-reviews__featured-title">
          “{review.title}”
        </h3>

        <p className="gb-customer-reviews__featured-comment">
          {review.comment}
        </p>
      </div>

      <div className="gb-customer-reviews__featured-footer">
        <div className="gb-customer-reviews__customer-row">
          <CustomerAvatar fallback={review.avatarFallback} />

          <span className="gb-customer-reviews__customer-meta">
            <span className="gb-customer-reviews__customer-name">
              {review.name}
            </span>

            <span className="gb-customer-reviews__customer-role">
              {review.role}
            </span>

            <span className="gb-customer-reviews__customer-location">
              {review.location}
            </span>
          </span>
        </div>

        <VerifiedBadge label={review.verifiedLabel} />
      </div>
    </article>
  );
}

export function CustomerReviewsSection({
  data = customerReviewsData,
  className,
}: CustomerReviewsSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const [featuredReview, ...reviewCards] = data.reviews;
  const canShowControls = reviewCards.length > 3;

  const handleScroll = useCallback((direction: "previous" | "next") => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>(
      ".gb-customer-reviews__card",
    );

    if (!firstCard) {
      return;
    }

    const trackStyles = window.getComputedStyle(track);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap);
    const scrollAmount = firstCard.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const isAtStart = track.scrollLeft <= SCROLL_EDGE_OFFSET;
    const isAtEnd = track.scrollLeft >= maxScrollLeft - SCROLL_EDGE_OFFSET;

    if (direction === "next" && isAtEnd) {
      track.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    if (direction === "previous" && isAtStart) {
      track.scrollTo({
        left: maxScrollLeft,
        behavior: "smooth",
      });
      return;
    }

    track.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!canShowControls || isCarouselPaused) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      handleScroll("next");
    }, AUTO_SLIDE_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canShowControls, handleScroll, isCarouselPaused]);

  return (
    <section
      className={cn("gb-customer-reviews", className)}
      aria-labelledby={data.headingId}
    >
      <div className="gb-container gb-customer-reviews__container">
        <div className="gb-customer-reviews__shell">
          <div className="gb-customer-reviews__hero">
            <div className="gb-customer-reviews__heading-group">
              <div className="gb-customer-reviews__title-row">
                <span
                  className="gb-customer-reviews__section-icon"
                  aria-hidden="true"
                >
                  <MessageSquareQuote />
                </span>

                <div className="gb-customer-reviews__title-stack">
                  <p className="gb-customer-reviews__eyebrow">
                    {data.eyebrow}
                  </p>

                  <h2 id={data.headingId} className="gb-customer-reviews__title">
                    {data.title}
                  </h2>
                </div>
              </div>

              <p className="gb-customer-reviews__subtitle">{data.subtitle}</p>
            </div>

            <div className="gb-customer-reviews__summary">
              <div className="gb-customer-reviews__summary-main">
                <span className="gb-customer-reviews__summary-rating">
                  {data.averageRating}
                </span>

                <span className="gb-customer-reviews__summary-content">
                  <CustomerRatingStars rating={Number(data.averageRating)} />

                  <span className="gb-customer-reviews__summary-text">
                    {data.totalReviews} customer reviews
                  </span>
                </span>
              </div>

              <div className="gb-customer-reviews__trust-grid">
                <span className="gb-customer-reviews__trust-item">
                  <ShieldCheck aria-hidden="true" />
                  <span>{data.trustLabel}</span>
                </span>

                <span className="gb-customer-reviews__trust-item">
                  <Truck aria-hidden="true" />
                  <span>Fast delivery experience</span>
                </span>
              </div>
            </div>
          </div>

          {featuredReview ? <FeaturedReviewCard review={featuredReview} /> : null}
        </div>

        <div
          className="gb-customer-reviews__carousel"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocus={() => setIsCarouselPaused(true)}
          onBlur={() => setIsCarouselPaused(false)}
        >
          <div className="gb-customer-reviews__carousel-header">
            <div className="gb-customer-reviews__carousel-heading">
              <span className="gb-customer-reviews__carousel-eyebrow">
                Trusted voices
              </span>

              <h3 className="gb-customer-reviews__carousel-title">
                What customers are saying
              </h3>
            </div>

            {canShowControls ? (
              <div
                className="gb-customer-reviews__carousel-controls"
                aria-label="Customer review carousel controls"
              >
                <button
                  type="button"
                  className="gb-customer-reviews__carousel-button"
                  aria-label="Show previous customer review"
                  onClick={() => handleScroll("previous")}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="gb-customer-reviews__carousel-button"
                  aria-label="Show next customer review"
                  onClick={() => handleScroll("next")}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>

          <div
            ref={trackRef}
            className="gb-customer-reviews__track"
            aria-label="Customer reviews"
          >
            {reviewCards.map((review) => (
              <CustomerReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}