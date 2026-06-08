"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import type { KeyboardEvent } from "react";

import { HeaderIcon } from "./header-icons";
import type {
  HeaderAccountLink,
  HeaderCartSummary,
  HeaderCounts,
  HeaderIconKey,
  HeaderNotification,
  HeaderPanel,
  HeaderPanelKey,
  HeaderUserState,
} from "./header.types";

type HeaderActionsProps = Readonly<{
  accountLinks: readonly HeaderAccountLink[];
  activePanel: HeaderPanel;
  accountMenuId: string;
  cartSummary: HeaderCartSummary;
  counts: HeaderCounts;
  notifications: readonly HeaderNotification[];
  notificationsMenuId: string;
  user: HeaderUserState;
  onCloseAll: () => void;
  onTogglePanel: (panel: HeaderPanelKey) => void;
}>;

type HeaderCountBadgeProps = Readonly<{
  count: number;
}>;

type HeaderActionIconProps = Readonly<{
  icon: HeaderIconKey;
  count?: number;
}>;

type HeaderNotificationMenuProps = Readonly<{
  id: string;
  notifications: readonly HeaderNotification[];
  notificationsHref: string;
  unreadCount: number;
  onCloseAll: () => void;
}>;

type HeaderThemeMode = "light" | "dark";

const ACCOUNT_OVERVIEW_HREF = "/account";
const ACCOUNT_LOGIN_HREF = "/account/login";
const ACCOUNT_REGISTER_HREF = "/account/register";
const CART_HREF = "/cart";
const HELP_CENTER_HREF = "/help-center";
const TRACK_ORDER_HREF = "/track-order";

const NOTIFICATIONS_HREF = ACCOUNT_OVERVIEW_HREF;
const WISHLIST_FALLBACK_HREF = ACCOUNT_LOGIN_HREF;

const SIGN_IN_LINK_ID = "sign-in";
const CREATE_ACCOUNT_LINK_ID = "create-account";
const MY_ACCOUNT_LINK_ID = "my-account";
const SAVED_WISHLIST_LINK_ID = "saved-wishlist";

const GUEST_ACCOUNT_LINK_ORDER = [
  "track-order",
  "help-center",
  SAVED_WISHLIST_LINK_ID,
] as const;

const AUTHENTICATED_ACCOUNT_LINK_ORDER = [
  SAVED_WISHLIST_LINK_ID,
  "track-order",
  "help-center",
] as const;

const NOTIFICATION_PREVIEW_LIMIT = 4;

const SUPPORTED_HEADER_ROUTES = new Set<string>([
  "/",
  ACCOUNT_OVERVIEW_HREF,
  ACCOUNT_LOGIN_HREF,
  ACCOUNT_REGISTER_HREF,
  CART_HREF,
  "/checkout",
  TRACK_ORDER_HREF,
  HELP_CENTER_HREF,
]);

export function getProtectedHref(
  href: string,
  user: HeaderUserState,
  requiresAuth?: boolean,
) {
  if (!requiresAuth || user.isAuthenticated) {
    return href;
  }

  const searchParams = new URLSearchParams({
    next: href,
  });

  return `${ACCOUNT_LOGIN_HREF}?${searchParams.toString()}`;
}

function getClassName(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function getCleanPathname(href: string) {
  return href.split(/[?#]/)[0] || "/";
}

function isSupportedHeaderHref(href: string) {
  const cleanHref = getCleanPathname(href);

  return SUPPORTED_HEADER_ROUTES.has(cleanHref);
}

function getSafeHeaderHref(href: string) {
  if (isSupportedHeaderHref(href)) {
    return href;
  }

  if (href.includes("wishlist")) {
    return WISHLIST_FALLBACK_HREF;
  }

  if (href.includes("order")) {
    return TRACK_ORDER_HREF;
  }

  if (href.includes("help") || href.includes("support")) {
    return HELP_CENTER_HREF;
  }

  if (href.includes("notification")) {
    return ACCOUNT_OVERVIEW_HREF;
  }

  return ACCOUNT_OVERVIEW_HREF;
}

function getSafeProtectedHref(
  href: string,
  user: HeaderUserState,
  requiresAuth?: boolean,
) {
  const protectedHref = getProtectedHref(href, user, requiresAuth);

  if (protectedHref.startsWith(`${ACCOUNT_LOGIN_HREF}?`)) {
    return protectedHref;
  }

  return getSafeHeaderHref(protectedHref);
}

function isHeaderThemeMode(value: string | undefined): value is HeaderThemeMode {
  return value === "light" || value === "dark";
}

function getResolvedThemeMode(
  resolvedTheme: string | undefined,
  theme: string | undefined,
): HeaderThemeMode | null {
  if (isHeaderThemeMode(resolvedTheme)) {
    return resolvedTheme;
  }

  if (isHeaderThemeMode(theme)) {
    return theme;
  }

  return null;
}

function getThemeModeLabel(themeMode: HeaderThemeMode | null) {
  if (themeMode === "dark") {
    return "Dark Mode";
  }

  if (themeMode === "light") {
    return "Light Mode";
  }

  return "Theme";
}

function getThemeModeDescription(themeMode: HeaderThemeMode | null) {
  if (themeMode === "dark") {
    return "Tap to switch to light";
  }

  if (themeMode === "light") {
    return "Tap to switch to dark";
  }

  return "Tap to switch theme";
}

function getNextThemeMode(themeMode: HeaderThemeMode | null): HeaderThemeMode {
  return themeMode === "dark" ? "light" : "dark";
}

function getAccountLabel(user: HeaderUserState) {
  if (user.isAuthenticated && user.displayName) {
    return user.displayName;
  }

  if (user.isAuthenticated) {
    return "Signed in account";
  }

  return "Guest account";
}

function getAccountStatusText(user: HeaderUserState) {
  if (user.isAuthenticated && user.displayName) {
    return user.displayName;
  }

  if (user.isAuthenticated) {
    return "Manage orders and wishlist";
  }

  return "Login / Sign up";
}

function getItemCountLabel(
  count: number,
  singularLabel: string,
  pluralLabel: string,
) {
  return count === 1 ? `${count} ${singularLabel}` : `${count} ${pluralLabel}`;
}

function formatBadgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function HeaderCountBadge({ count }: HeaderCountBadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <span className="gb-site-header__count" aria-hidden="true">
      {formatBadgeCount(count)}
    </span>
  );
}

function HeaderActionIcon({ icon, count = 0 }: HeaderActionIconProps) {
  return (
    <span className="gb-site-header__action-icon" aria-hidden="true">
      <HeaderIcon name={icon} />
      <HeaderCountBadge count={count} />
    </span>
  );
}

function findAccountLink(
  accountLinks: readonly HeaderAccountLink[],
  id: string,
) {
  return accountLinks.find((item) => item.id === id);
}

function findWishlistLink(accountLinks: readonly HeaderAccountLink[]) {
  return (
    findAccountLink(accountLinks, SAVED_WISHLIST_LINK_ID) ??
    accountLinks.find((item) => item.href.includes("wishlist"))
  );
}

function getAccountMenuIconName(item: HeaderAccountLink): HeaderIconKey {
  const normalizedId = item.id.toLowerCase();

  if (
    normalizedId.includes("track") ||
    normalizedId.includes("order") ||
    normalizedId.includes("delivery")
  ) {
    return "track";
  }

  if (
    normalizedId.includes("help") ||
    normalizedId.includes("support") ||
    normalizedId.includes("center")
  ) {
    return "help";
  }

  if (
    normalizedId.includes("wishlist") ||
    normalizedId.includes("saved") ||
    normalizedId.includes("favorite")
  ) {
    return "wishlist";
  }

  if (
    normalizedId.includes("account") ||
    normalizedId.includes("profile") ||
    normalizedId.includes("user")
  ) {
    return "user";
  }

  return "check";
}

function isWishlistLink(item: HeaderAccountLink) {
  return item.id === SAVED_WISHLIST_LINK_ID || item.href.includes("wishlist");
}

function getAccountShortcutAriaLabel(
  item: HeaderAccountLink,
  counts: HeaderCounts,
) {
  if (isWishlistLink(item)) {
    const wishlistLabel = getItemCountLabel(
      counts.wishlist,
      "saved item",
      "saved items",
    );

    return `View wishlist, ${wishlistLabel}`;
  }

  return item.ariaLabel ?? item.label;
}

function getSortedAccountLinks(
  accountLinks: readonly HeaderAccountLink[],
  user: HeaderUserState,
) {
  const orderedIds = user.isAuthenticated
    ? AUTHENTICATED_ACCOUNT_LINK_ORDER
    : GUEST_ACCOUNT_LINK_ORDER;

  const hiddenIds = new Set<string>([
    SIGN_IN_LINK_ID,
    CREATE_ACCOUNT_LINK_ID,
    MY_ACCOUNT_LINK_ID,
  ]);

  const orderMap = new Map<string, number>(
    orderedIds.map((itemId, index) => [itemId, index]),
  );

  return [...accountLinks]
    .filter((item) => !hiddenIds.has(item.id))
    .sort((firstItem, secondItem) => {
      const firstIndex = orderMap.get(firstItem.id) ?? Number.MAX_SAFE_INTEGER;
      const secondIndex =
        orderMap.get(secondItem.id) ?? Number.MAX_SAFE_INTEGER;

      return firstIndex - secondIndex;
    });
}

function getNotificationAriaLabel(item: HeaderNotification) {
  return item.ariaLabel ?? `${item.title}, ${item.description}`;
}

function getMenuItems(menu: HTMLElement) {
  return Array.from(
    menu.querySelectorAll<HTMLElement>(
      '[role="menuitem"], [role="menuitemcheckbox"]',
    ),
  );
}

function focusMenuItem(menu: HTMLElement, index: number) {
  const menuItems = getMenuItems(menu);
  const targetItem = menuItems[index];

  targetItem?.focus();
}

function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  const menu = event.currentTarget;
  const menuItems = getMenuItems(menu);

  if (menuItems.length === 0) {
    return;
  }

  const activeElement = document.activeElement;
  const currentIndex = menuItems.findIndex((item) => item === activeElement);

  if (event.key === "Home") {
    event.preventDefault();
    focusMenuItem(menu, 0);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    focusMenuItem(menu, menuItems.length - 1);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    const nextIndex =
      currentIndex >= 0 ? (currentIndex + 1) % menuItems.length : 0;

    focusMenuItem(menu, nextIndex);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    const nextIndex =
      currentIndex >= 0
        ? (currentIndex - 1 + menuItems.length) % menuItems.length
        : menuItems.length - 1;

    focusMenuItem(menu, nextIndex);
  }
}

function HeaderNotificationMenu({
  id,
  notifications,
  notificationsHref,
  onCloseAll,
  unreadCount,
}: HeaderNotificationMenuProps) {
  const previewNotifications = notifications.slice(0, NOTIFICATION_PREVIEW_LIMIT);
  const unreadLabel = getItemCountLabel(
    unreadCount,
    "unread notification",
    "unread notifications",
  );

  return (
    <div
      id={id}
      className="gb-site-header__notification-menu"
      role="menu"
      aria-label="Notifications"
      onKeyDown={handleMenuKeyDown}
    >
      <div className="gb-site-header__notification-menu-head" role="presentation">
        <span className="gb-site-header__notification-menu-title">
          Notifications
        </span>

        <span className="gb-site-header__notification-menu-count">
          {unreadLabel}
        </span>
      </div>

      {previewNotifications.length > 0 ? (
        <div
          className="gb-site-header__notification-menu-list"
          role="group"
          aria-label="Recent notifications"
        >
          {previewNotifications.map((item) => (
            <Link
              key={item.id}
              className={getClassName(
                "gb-site-header__notification-item",
                item.isUnread && "gb-site-header__notification-item--unread",
              )}
              href={getSafeHeaderHref(item.href)}
              role="menuitem"
              aria-label={getNotificationAriaLabel(item)}
              onClick={onCloseAll}
            >
              <span
                className="gb-site-header__notification-item-icon"
                aria-hidden="true"
              >
                <HeaderIcon name={item.icon} />
              </span>

              <span className="gb-site-header__notification-item-copy">
                <span className="gb-site-header__notification-item-title">
                  {item.title}
                </span>

                <span className="gb-site-header__notification-item-description">
                  {item.description}
                </span>

                <span className="gb-site-header__notification-item-time">
                  {item.createdAtLabel}
                </span>
              </span>

              {item.isUnread ? (
                <span
                  className="gb-site-header__notification-item-dot"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className="gb-site-header__notification-empty" role="presentation">
          <span className="gb-site-header__notification-empty-icon">
            <HeaderIcon name="bell" />
          </span>

          <span className="gb-site-header__notification-empty-title">
            No notifications
          </span>

          <span className="gb-site-header__notification-empty-description">
            New order updates and offers will appear here.
          </span>
        </div>
      )}

      <Link
        className="gb-site-header__notification-view-all"
        href={notificationsHref}
        role="menuitem"
        aria-label="View all notifications"
        onClick={onCloseAll}
      >
        <span>View all notifications</span>
        <HeaderIcon name="chevronDown" />
      </Link>
    </div>
  );
}

export function HeaderActions({
  accountLinks,
  accountMenuId,
  activePanel,
  cartSummary,
  counts,
  notifications,
  notificationsMenuId,
  onCloseAll,
  onTogglePanel,
  user,
}: HeaderActionsProps) {
  const { resolvedTheme, setTheme, theme } = useTheme();

  const themeMode = getResolvedThemeMode(resolvedTheme, theme);
  const isDarkMode = themeMode === "dark";
  const nextThemeMode = getNextThemeMode(themeMode);

  const accountLabel = getAccountLabel(user);
  const accountStatusText = getAccountStatusText(user);
  const isAccountMenuOpen = activePanel === "account";
  const isNotificationsMenuOpen = activePanel === "notifications";

  const signInLink = findAccountLink(accountLinks, SIGN_IN_LINK_ID);
  const createAccountLink = findAccountLink(accountLinks, CREATE_ACCOUNT_LINK_ID);
  const myAccountLink = findAccountLink(accountLinks, MY_ACCOUNT_LINK_ID);
  const wishlistLink = findWishlistLink(accountLinks);
  const visibleAccountLinks = getSortedAccountLinks(accountLinks, user);

  const notificationsHref = getSafeProtectedHref(
    NOTIFICATIONS_HREF,
    user,
    true,
  );

  const wishlistHref = getSafeProtectedHref(
    wishlistLink?.href ?? WISHLIST_FALLBACK_HREF,
    user,
    wishlistLink?.requiresAuth ?? true,
  );

  const notificationLabel = getItemCountLabel(
    counts.notifications,
    "unread notification",
    "unread notifications",
  );

  const wishlistLabel = getItemCountLabel(
    counts.wishlist,
    "saved item",
    "saved items",
  );

  const cartItemLabel = getItemCountLabel(
    cartSummary.itemCount,
    "item",
    "items",
  );

  const themeModeLabel = getThemeModeLabel(themeMode);
  const themeModeDescription = getThemeModeDescription(themeMode);

  function handleThemeToggle() {
    setTheme(nextThemeMode);
  }

  return (
    <nav className="gb-site-header__actions" aria-label="Store actions">
      <div className="gb-site-header__notifications">
        <button
          type="button"
          className="gb-site-header__action"
          aria-label={`Open notifications, ${notificationLabel}`}
          aria-expanded={isNotificationsMenuOpen}
          aria-controls={notificationsMenuId}
          aria-haspopup="menu"
          data-active={isNotificationsMenuOpen ? "true" : undefined}
          data-state={isNotificationsMenuOpen ? "open" : "closed"}
          onClick={() => onTogglePanel("notifications")}
        >
          <HeaderActionIcon icon="bell" count={counts.notifications} />
        </button>

        {isNotificationsMenuOpen ? (
          <HeaderNotificationMenu
            id={notificationsMenuId}
            notifications={notifications}
            notificationsHref={notificationsHref}
            unreadCount={counts.notifications}
            onCloseAll={onCloseAll}
          />
        ) : null}
      </div>

      <div className="gb-site-header__account">
        <button
          type="button"
          className="gb-site-header__action"
          aria-label={`Open account menu, ${accountLabel}`}
          aria-expanded={isAccountMenuOpen}
          aria-controls={accountMenuId}
          aria-haspopup="menu"
          data-active={isAccountMenuOpen ? "true" : undefined}
          data-state={isAccountMenuOpen ? "open" : "closed"}
          onClick={() => onTogglePanel("account")}
        >
          <HeaderActionIcon icon="user" />
        </button>

        {isAccountMenuOpen ? (
          <div
            id={accountMenuId}
            className="gb-site-header__account-menu"
            role="menu"
            aria-label="Account menu"
            onKeyDown={handleMenuKeyDown}
          >
            <div className="gb-site-header__account-card" role="presentation">
              <div
                className="gb-site-header__account-card-main"
                role="presentation"
              >
                <span
                  className="gb-site-header__account-card-icon"
                  aria-hidden="true"
                >
                  <HeaderIcon name="user" />
                </span>

                <span className="gb-site-header__account-card-copy">
                  <span className="gb-site-header__account-card-title">
                    Account
                  </span>
                  <span className="gb-site-header__account-card-subtitle">
                    {accountStatusText}
                  </span>
                </span>

                <span
                  className="gb-site-header__account-card-caret"
                  aria-hidden="true"
                >
                  <HeaderIcon name="chevronDown" />
                </span>
              </div>

              <div
                className="gb-site-header__account-card-actions"
                role="group"
                aria-label="Account access"
              >
                {user.isAuthenticated ? (
                  <Link
                    className="gb-site-header__account-card-link gb-site-header__account-card-link--primary"
                    href={myAccountLink?.href ?? ACCOUNT_OVERVIEW_HREF}
                    role="menuitem"
                    aria-label={myAccountLink?.ariaLabel ?? "Open my account"}
                    onClick={onCloseAll}
                  >
                    My account
                  </Link>
                ) : (
                  <>
                    <Link
                      className="gb-site-header__account-card-link gb-site-header__account-card-link--primary"
                      href={signInLink?.href ?? ACCOUNT_LOGIN_HREF}
                      role="menuitem"
                      aria-label={signInLink?.ariaLabel ?? "Sign in"}
                      onClick={onCloseAll}
                    >
                      Sign in
                    </Link>

                    <Link
                      className="gb-site-header__account-card-link"
                      href={createAccountLink?.href ?? ACCOUNT_REGISTER_HREF}
                      role="menuitem"
                      aria-label={
                        createAccountLink?.ariaLabel ??
                        "Create a new customer account"
                      }
                      onClick={onCloseAll}
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>

            {visibleAccountLinks.length > 0 ? (
              <div
                className="gb-site-header__account-menu-list"
                role="group"
                aria-label="Account shortcuts"
              >
                {visibleAccountLinks.map((item) => {
                  const shouldShowWishlistCount =
                    isWishlistLink(item) && counts.wishlist > 0;

                  return (
                    <Link
                      key={item.id}
                      className={getClassName(
                        "gb-site-header__account-menu-item",
                        shouldShowWishlistCount &&
                          "gb-site-header__account-menu-item--with-badge",
                      )}
                      href={getSafeProtectedHref(
                        item.href,
                        user,
                        item.requiresAuth,
                      )}
                      role="menuitem"
                      aria-label={getAccountShortcutAriaLabel(item, counts)}
                      onClick={onCloseAll}
                    >
                      <span
                        className="gb-site-header__account-menu-item-icon"
                        aria-hidden="true"
                      >
                        <HeaderIcon name={getAccountMenuIconName(item)} />
                      </span>

                      <span className="gb-site-header__account-menu-item-copy">
                        <span className="gb-site-header__account-menu-item-title">
                          {item.label}
                        </span>

                        {item.description ? (
                          <span className="gb-site-header__account-menu-item-description">
                            {item.description}
                          </span>
                        ) : null}

                        {shouldShowWishlistCount ? (
                          <span className="gb-sr-only">
                            {" "}
                            — {wishlistLabel}
                          </span>
                        ) : null}
                      </span>

                      {shouldShowWishlistCount ? (
                        <span
                          className="gb-site-header__account-menu-item-badge"
                          aria-hidden="true"
                        >
                          {formatBadgeCount(counts.wishlist)}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            ) : null}

            <div
              className="gb-site-header__account-menu-separator"
              role="separator"
              aria-hidden="true"
            />

            <button
              type="button"
              className="gb-site-header__account-menu-item gb-site-header__account-menu-item--theme"
              role="menuitemcheckbox"
              aria-checked={isDarkMode}
              aria-label={`Switch to ${nextThemeMode} mode`}
              suppressHydrationWarning
              onClick={handleThemeToggle}
            >
              <span
                className="gb-site-header__account-menu-item-icon"
                aria-hidden="true"
                suppressHydrationWarning
              >
                <HeaderIcon name={isDarkMode ? "moon" : "sun"} />
              </span>

              <span className="gb-site-header__account-menu-item-copy">
                <span
                  className="gb-site-header__account-menu-item-title"
                  suppressHydrationWarning
                >
                  {themeModeLabel}
                </span>
                <span
                  className="gb-site-header__account-menu-item-description"
                  suppressHydrationWarning
                >
                  {themeModeDescription}
                </span>
              </span>

              <span
                className="gb-site-header__theme-switch"
                data-state={isDarkMode ? "checked" : "unchecked"}
                aria-hidden="true"
                suppressHydrationWarning
              >
                <span className="gb-site-header__theme-switch-thumb" />
              </span>
            </button>
          </div>
        ) : null}
      </div>

      <Link
        className="gb-site-header__action"
        href={wishlistHref}
        aria-label={`View wishlist, ${wishlistLabel}`}
        onClick={onCloseAll}
      >
        <HeaderActionIcon icon="wishlist" count={counts.wishlist} />
      </Link>

      <Link
        className="gb-site-header__action gb-site-header__action--cart"
        href={cartSummary.cartHref}
        aria-label={`View cart, ${cartItemLabel}, total ${cartSummary.totalLabel}`}
        onClick={onCloseAll}
      >
        <HeaderActionIcon icon="cart" count={cartSummary.itemCount} />

        <span className="gb-site-header__cart-total" aria-hidden="true">
          {cartSummary.totalLabel}
        </span>
      </Link>
    </nav>
  );
}