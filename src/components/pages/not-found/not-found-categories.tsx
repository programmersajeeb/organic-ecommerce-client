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

        <Link href="/" className="gb-not-found-page__section-link">
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
              >
                <Icon
                  aria-hidden="true"
                  className="gb-not-found-page__category-image"
                  focusable="false"
                />
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