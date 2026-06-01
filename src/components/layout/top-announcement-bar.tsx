import Link from "next/link";

import { topBarLeftItems, topBarRightItems } from "@/constants/navigation";

export function TopAnnouncementBar() {
  return (
    <div className="gb-shop-topbar">
      <div className="gb-shop-header-container gb-shop-topbar__inner">
        <div className="gb-shop-topbar__left">
          {topBarLeftItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.label} href={item.href} className="gb-shop-topbar__item">
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="gb-shop-topbar__right">
          {topBarRightItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.label} href={item.href} className="gb-shop-topbar__item">
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link href="/language" className="gb-shop-topbar__language">
            EN | বাংলা
          </Link>
        </div>
      </div>
    </div>
  );
}