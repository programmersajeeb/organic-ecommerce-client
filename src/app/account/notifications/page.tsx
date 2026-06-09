import Link from "next/link";

import { headerData } from "@/components/layout/header/header-data";
import { HeaderIcon } from "@/components/layout/header/header-icons";
import type { HeaderNotification } from "@/components/layout/header/header.types";
import "@/styles/components/pages/notifications-page.css";

const FILTERS = ["All", "Unread", "Orders", "Offers", "Updates"] as const;

const notifications: readonly HeaderNotification[] = headerData.notifications;

export default function AccountNotificationsPage() {
  const unreadCount = notifications.filter((item) => item.isUnread).length;

  return (
    <section
      className="gb-notifications-page"
      aria-labelledby="notifications-page-title"
    >
      <div className="gb-container-wide gb-notifications-page__inner">
        <div className="gb-notifications-page__head">
          <div className="gb-notifications-page__title-group">
            <Link
              className="gb-notifications-page__back-link"
              href="/"
              aria-label="Go back to home"
            >
              <HeaderIcon name="chevronDown" />
            </Link>

            <div>
              <h1
                id="notifications-page-title"
                className="gb-notifications-page__title"
              >
                Notifications
              </h1>

              <p className="gb-notifications-page__subtitle">
                {unreadCount} unread notifications
              </p>
            </div>
          </div>

          <button type="button" className="gb-notifications-page__mark-read">
            Mark all as read
          </button>
        </div>

        <div
          className="gb-notifications-page__filters"
          aria-label="Notification filters"
        >
          {FILTERS.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className="gb-notifications-page__filter"
              data-active={index === 0 ? "true" : undefined}
            >
              {filter}

              {filter === "All" ? (
                <span aria-hidden="true"> ({notifications.length})</span>
              ) : null}

              {filter === "Unread" ? (
                <span aria-hidden="true"> ({unreadCount})</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="gb-notifications-page__list">
          {notifications.map((item) => (
            <Link
              key={item.id}
              className="gb-notifications-page__item"
              href={item.href}
              aria-label={item.ariaLabel ?? item.title}
              data-unread={item.isUnread ? "true" : undefined}
            >
              <span
                className="gb-notifications-page__item-icon"
                aria-hidden="true"
              >
                <HeaderIcon name={item.icon} />
              </span>

              <span className="gb-notifications-page__item-copy">
                <span className="gb-notifications-page__item-title-row">
                  <span className="gb-notifications-page__item-title">
                    {item.title}
                  </span>

                  {item.isUnread ? (
                    <span
                      className="gb-notifications-page__item-dot"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>

                <span className="gb-notifications-page__item-description">
                  {item.description}
                </span>

                <span className="gb-notifications-page__item-time">
                  {item.createdAtLabel}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}