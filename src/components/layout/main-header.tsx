import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";

import { SearchBox } from "@/components/common/search-box";
import { SiteLogo } from "@/components/common/site-logo";
import { AccountMenu } from "@/components/layout/account-menu";
import { mobileMenuItems } from "@/constants/navigation";

const cartPreview = {
  itemCount: 2,
  subtotal: "৳2,450",
  href: "/cart",
};

export function MainHeader() {
  return (
    <div className="gb-shop-main-header" aria-label="Main site header">
      <div className="gb-shop-header-container gb-shop-main-header__inner">
        <details className="gb-shop-mobile-menu">
          <summary
            className="gb-shop-icon-button gb-shop-mobile-menu__trigger"
            aria-label="Open mobile navigation menu"
          >
            <span className="gb-sr-only">Open mobile navigation menu</span>
            <Menu
              aria-hidden="true"
              focusable="false"
              className="gb-shop-mobile-menu__open-icon"
            />
            <X
              aria-hidden="true"
              focusable="false"
              className="gb-shop-mobile-menu__close-icon"
            />
          </summary>

          <nav
            aria-label="Mobile primary navigation"
            className="gb-shop-mobile-menu__panel"
          >
            {mobileMenuItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="gb-shop-mobile-menu__link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>

        <div className="gb-shop-main-header__logo">
          <SiteLogo />
        </div>

        <div className="gb-shop-main-header__search">
          <SearchBox />
        </div>

        <div
          className="gb-shop-main-header__actions"
          aria-label="Account and cart actions"
        >
          <AccountMenu />

          <Link
            href={cartPreview.href}
            aria-label={`Open cart, ${cartPreview.itemCount} items, subtotal ${cartPreview.subtotal}`}
            className="gb-shop-header-cart"
          >
            <span className="gb-shop-header-cart__icon" aria-hidden="true">
              <ShoppingCart aria-hidden="true" focusable="false" />
              <span className="gb-shop-header-cart__badge">
                {cartPreview.itemCount}
              </span>
            </span>

            <span className="gb-shop-header-cart__content">
              <span className="gb-shop-header-cart__label">Cart</span>
              <span className="gb-shop-header-cart__sub-label">
                {cartPreview.subtotal}
              </span>
            </span>
          </Link>
        </div>

        <div className="gb-shop-mobile-actions" aria-label="Mobile actions">
          <AccountMenu variant="mobile" />

          <Link
            href={cartPreview.href}
            aria-label={`Open cart, ${cartPreview.itemCount} items, subtotal ${cartPreview.subtotal}`}
            className="gb-shop-mobile-cart"
          >
            <ShoppingCart aria-hidden="true" focusable="false" />
            <span aria-hidden="true">{cartPreview.itemCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}