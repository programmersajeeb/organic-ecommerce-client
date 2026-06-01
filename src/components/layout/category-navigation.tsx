import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { categoryNavItems } from "@/constants/navigation";

export function CategoryNavigation() {
  return (
    <nav className="gb-shop-category-nav" aria-label="Product categories">
      <div className="gb-shop-header-container gb-shop-category-nav__inner">
        <Link href="/categories" className="gb-shop-category-nav__button">
          <Menu aria-hidden="true" />
          <span>Shop by Category</span>
          <ChevronDown aria-hidden="true" />
        </Link>

        <div className="gb-shop-category-nav__items">
          {categoryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isHighlighted ? "page" : undefined}
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
          >
            <span>More</span>
            <ChevronDown aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  );
}