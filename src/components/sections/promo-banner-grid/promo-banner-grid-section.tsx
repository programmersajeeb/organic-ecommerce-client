import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";

import { promoBannerGridData } from "./promo-banner-grid.data";
import type {
  PromoBannerGridSectionProps,
  PromoBannerItem,
} from "./promo-banner-grid.types";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getRouteHref(href: string) {
  return href as Route;
}

function PromoBannerCard({
  banner,
  priority = false,
}: Readonly<{
  banner: PromoBannerItem;
  priority?: boolean;
}>) {
  const tone = banner.tone ?? "primary";
  const size = banner.size ?? "compact";
  const isLarge = size === "large";

  return (
    <Link
      href={getRouteHref(banner.href)}
      className={cn(
        "gb-promo-banner-grid__card",
        `gb-promo-banner-grid__card--${tone}`,
        `gb-promo-banner-grid__card--${size}`,
      )}
      aria-label={`${banner.ctaLabel}: ${banner.title}`}
      data-banner-id={banner.id}
      data-banner-tone={tone}
      data-banner-size={size}
    >
      <span className="gb-promo-banner-grid__inner">
        <span className="gb-promo-banner-grid__card-content">
          <span className="gb-promo-banner-grid__eyebrow-row">
            <span className="gb-promo-banner-grid__card-eyebrow">
              {banner.eyebrow}
            </span>

            {banner.badgeLabel ? (
              <span className="gb-promo-banner-grid__badge">
                {banner.badgeLabel}
              </span>
            ) : null}
          </span>

          <span className="gb-promo-banner-grid__copy">
            <span className="gb-promo-banner-grid__card-title">
              {banner.title}
            </span>

            <span className="gb-promo-banner-grid__card-description">
              {banner.description}
            </span>
          </span>

          <span className="gb-promo-banner-grid__cta">
            <span>{banner.ctaLabel}</span>
            <ArrowRight aria-hidden="true" />
          </span>
        </span>

        <span className="gb-promo-banner-grid__media" aria-hidden="true">
          <span className="gb-promo-banner-grid__media-frame">
            <Image
              src={banner.image.src}
              alt={banner.image.alt}
              width={isLarge ? 520 : 360}
              height={isLarge ? 380 : 280}
              sizes={
                isLarge
                  ? "(min-width: 1024px) 22vw, (min-width: 768px) 34vw, 48vw"
                  : "(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 38vw"
              }
              priority={priority}
              className="gb-promo-banner-grid__image"
            />
          </span>
        </span>
      </span>
    </Link>
  );
}

export function PromoBannerGridSection({
  data = promoBannerGridData,
  className,
}: PromoBannerGridSectionProps) {
  return (
    <section
      className={cn("gb-promo-banner-grid", className)}
      aria-labelledby={data.headingId}
    >
      <div className="gb-container gb-promo-banner-grid__container">
        <div className="gb-promo-banner-grid__header">
          <div className="gb-promo-banner-grid__heading-group">
            <div className="gb-promo-banner-grid__title-row">
              <span
                className="gb-promo-banner-grid__section-icon"
                aria-hidden="true"
              >
                <BadgePercent />
              </span>

              <div className="gb-promo-banner-grid__title-stack">
                <p className="gb-promo-banner-grid__section-eyebrow">
                  {data.eyebrow}
                </p>

                <h2
                  id={data.headingId}
                  className="gb-promo-banner-grid__title"
                >
                  {data.title}
                </h2>
              </div>
            </div>

            <p className="gb-promo-banner-grid__subtitle">{data.subtitle}</p>
          </div>
        </div>

        <div className="gb-promo-banner-grid__layout">
          {data.banners.map((banner, index) => (
            <PromoBannerCard
              key={banner.id}
              banner={banner}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}