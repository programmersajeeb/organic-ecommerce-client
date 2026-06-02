import Link from "next/link";

import { topBarLeftItems, topBarRightItems } from "@/constants/navigation";

export function TopAnnouncementBar() {
  return (
    <div className="gb-shop-topbar">
      <nav
        aria-label="Store announcements and quick links"
        className="gb-shop-header-container gb-shop-topbar__inner"
      >
        <div
          className="gb-shop-topbar__left"
          aria-label="Store benefit announcements"
        >
          {topBarLeftItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="gb-shop-topbar__item"
              >
                <Icon aria-hidden="true" focusable="false" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="gb-shop-topbar__right" aria-label="Store quick links">
          {topBarRightItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="gb-shop-topbar__item"
              >
                <Icon aria-hidden="true" focusable="false" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/language"
            className="gb-shop-topbar__language"
            aria-label="Change language between English and Bengali"
          >
            EN | বাংলা
          </Link>
        </div>
      </nav>
    </div>
  );
}