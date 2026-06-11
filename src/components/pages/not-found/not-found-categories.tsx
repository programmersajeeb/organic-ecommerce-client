import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NotFoundCategory } from "./not-found.types";

type NotFoundCategoriesProps = Readonly<{
  categories: readonly NotFoundCategory[];
}>;

export function NotFoundCategories({ categories }: NotFoundCategoriesProps) {
  return (
    <section
      className="gb-not-found-page__categories"
      aria-labelledby="not-found-categories-title"
    >
      <div className="gb-not-found-page__section-header">
        <h2
          id="not-found-categories-title"
          className="gb-not-found-page__section-title"
        >
          Popular Categories
        </h2>

        <Link
          href="/"
          className="gb-not-found-page__section-link"
          aria-label="View all product categories"
        >
          View Store
          <ArrowRight
            aria-hidden="true"
            className="gb-not-found-page__section-link-icon"
            focusable="false"
          />
        </Link>
      </div>

      <ul className="gb-not-found-page__category-grid">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <li key={category.href}>
              <Link
                href={category.href}
                className="gb-not-found-page__category-card"
                aria-label={category.ariaLabel ?? `Shop ${category.label}`}
              >
                <span
                  className="gb-not-found-page__category-media"
                  aria-hidden="true"
                >
                  {category.image ? (
                    <Image
                      src={category.image.src}
                      alt=""
                      className="gb-not-found-page__category-image"
                      width={category.image.width}
                      height={category.image.height}
                      sizes="(max-width: 767px) 42vw, (max-width: 1023px) 28vw, 12vw"
                    />
                  ) : (
                    <Icon
                      aria-hidden="true"
                      className="gb-not-found-page__category-icon"
                      focusable="false"
                    />
                  )}
                </span>

                <span className="gb-not-found-page__category-label">
                  {category.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}