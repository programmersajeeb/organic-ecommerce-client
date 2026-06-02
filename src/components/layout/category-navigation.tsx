import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { categoryNavItems } from "@/constants/navigation";

export function CategoryNavigation() {
  return (
    <nav className="gb-shop-category-nav" aria-label="Product categories">
      <div className="gb-shop-header-container gb-shop-category-nav__inner">
        <Link
          href="/categories"
          className="gb-shop-category-nav__button"
          aria-label="Browse all product categories"
        >
          <Menu aria-hidden="true" focusable="false" />
          <span>Shop by Category</span>
          <ChevronDown aria-hidden="true" focusable="false" />
        </Link>

        <div
          className="gb-shop-category-nav__items"
          aria-label="Featured product categories"
        >
          {categoryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.isHighlighted
                  ? "gb-shop-category-nav__link gb-shop-category-nav__link--active"
                  : "gb-shop-category-nav__link"
              }
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/categories"
            className="gb-shop-category-nav__link gb-shop-category-nav__more"
            aria-label="View more product categories"
          >
            <span>More</span>
            <ChevronDown aria-hidden="true" focusable="false" />
          </Link>
        </div>
      </div>
    </nav>
  );
}