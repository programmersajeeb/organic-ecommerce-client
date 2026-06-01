import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";

import { HeaderAction } from "@/components/common/header-action";
import { SearchBox } from "@/components/common/search-box";
import { SiteLogo } from "@/components/common/site-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { headerActions, mobileMenuItems } from "@/constants/navigation";

export function MainHeader() {
  return (
    <div className="gb-shop-main-header">
      <div className="gb-shop-header-container gb-shop-main-header__inner">
        <details className="gb-shop-mobile-menu">
          <summary className="gb-shop-icon-button gb-shop-mobile-menu__trigger">
            <Menu className="gb-shop-mobile-menu__open-icon" />
            <X className="gb-shop-mobile-menu__close-icon" />
          </summary>

          <div className="gb-shop-mobile-menu__panel">
            {mobileMenuItems.map((item) => (
              <Link key={item.href} href={item.href} className="gb-shop-mobile-menu__link">
                {item.label}
              </Link>
            ))}
          </div>
        </details>

        <div className="gb-shop-main-header__logo">
          <SiteLogo />
        </div>

        <div className="gb-shop-main-header__search">
          <SearchBox />
        </div>

        <div className="gb-shop-main-header__actions">
          {headerActions.map((action) => (
            <HeaderAction key={action.label} {...action} />
          ))}

          <ThemeToggle />
        </div>

        <Link href="/cart" aria-label="Cart" className="gb-shop-mobile-cart">
          <ShoppingCart />
          <span>2</span>
        </Link>
      </div>
    </div>
  );
}