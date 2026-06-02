import Link from "next/link";

import { topBarLeftItems, topBarRightItems } from "@/constants/navigation";

export function TopAnnouncementBar() {
  const primaryAnnouncement = topBarLeftItems[0];

  return (
    <div className="gb-shop-topbar">
      <nav
        aria-label="Store announcements and quick links"
        className="gb-shop-header-container gb-shop-topbar__inner"
      >
        <ul
          className="gb-shop-topbar__left"
          aria-label="Store benefit announcements"
        >
          {topBarLeftItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={`${item.label}-${item.href}`} className="contents">
                <Link href={item.href} className="gb-shop-topbar__item">
                  <Icon aria-hidden="true" focusable="false" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {primaryAnnouncement ? (
          <Link
            href={primaryAnnouncement.href}
            className="gb-shop-topbar__mobile-announcement"
            aria-label={primaryAnnouncement.label}
          >
            <primaryAnnouncement.icon aria-hidden="true" focusable="false" />
            <span>{primaryAnnouncement.label}</span>
          </Link>
        ) : null}

        <ul className="gb-shop-topbar__right" aria-label="Store quick links">
          {topBarRightItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={`${item.label}-${item.href}`} className="contents">
                <Link href={item.href} className="gb-shop-topbar__item">
                  <Icon aria-hidden="true" focusable="false" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li className="contents">
            <Link
              href="/language"
              className="gb-shop-topbar__language"
              aria-label="Change language between English and Bengali"
            >
              EN | বাংলা
            </Link>
          </li>
        </ul>

        <Link
          href="/language"
          className="gb-shop-topbar__mobile-language"
          aria-label="Change language between English and Bengali"
        >
          EN | বাংলা
        </Link>
      </nav>
    </div>
  );
}