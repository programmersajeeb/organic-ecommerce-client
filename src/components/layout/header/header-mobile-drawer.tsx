"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { getProtectedHref } from "./header-actions";
import { HeaderIcon } from "./header-icons";
import type {
  HeaderAccountLink,
  HeaderCartSummary,
  HeaderCategory,
  HeaderCounts,
  HeaderIconKey,
  HeaderIconLink,
  HeaderLanguageId,
  HeaderLanguageOption,
  HeaderUserState,
} from "./header.types";

type HeaderMobileDrawerProps = Readonly<{
  accountLinks: readonly HeaderAccountLink[];
  cartSummary: HeaderCartSummary;
  counts: HeaderCounts;
  isOpen: boolean;
  languageOptions: readonly HeaderLanguageOption[];
  mobileDrawerId: string;
  moreCategories: readonly HeaderCategory[];
  primaryCategories: readonly HeaderCategory[];
  selectedLanguage: HeaderLanguageId;
  user: HeaderUserState;
  utilityLinks: readonly HeaderIconLink[];
  onCloseAll: () => void;
  onSelectLanguage: (languageId: HeaderLanguageId) => void;
}>;

type HeaderMobileLogoProps = Readonly<{
  onCloseAll: () => void;
}>;

type HeaderDrawerAccountLinkProps = Readonly<{
  counts: HeaderCounts;
  item: HeaderAccountLink;
  pathname: string;
  user: HeaderUserState;
  onCloseAll: () => void;
}>;

const ROOT_PATHNAME = "/";
const SIGN_IN_LINK_ID = "sign-in";
const CREATE_ACCOUNT_LINK_ID = "create-account";
const MY_ACCOUNT_LINK_ID = "my-account";

const GUEST_ACCOUNT_LINK_ORDER = [
  SIGN_IN_LINK_ID,
  CREATE_ACCOUNT_LINK_ID,
  "track-order",
  "help-center",
  "saved-wishlist",
] as const;

const AUTHENTICATED_ACCOUNT_LINK_ORDER = [
  MY_ACCOUNT_LINK_ID,
  "saved-wishlist",
  "track-order",
  "help-center",
] as const;

const PRIMARY_GUEST_LINK_IDS = new Set<string>([
  SIGN_IN_LINK_ID,
  CREATE_ACCOUNT_LINK_ID,
]);

const PRIMARY_AUTHENTICATED_LINK_IDS = new Set<string>([MY_ACCOUNT_LINK_ID]);

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getCleanPathname(pathname: string) {
  return pathname.split(/[?#]/)[0] || ROOT_PATHNAME;
}

function normalizePathname(pathname: string) {
  const cleanPathname = getCleanPathname(pathname);

  if (
    cleanPathname.length > ROOT_PATHNAME.length &&
    cleanPathname.endsWith("/")
  ) {
    return cleanPathname.slice(0, -1);
  }

  return cleanPathname;
}

function isInternalHref(href: string) {
  return href.startsWith(ROOT_PATHNAME) && !href.startsWith("//");
}

function isRouteActive(pathname: string, href: string) {
  if (!isInternalHref(href)) {
    return false;
  }

  const currentPathname = normalizePathname(pathname);
  const targetHref = normalizePathname(href);

  if (targetHref === ROOT_PATHNAME) {
    return currentPathname === ROOT_PATHNAME;
  }

  return (
    currentPathname === targetHref ||
    currentPathname.startsWith(`${targetHref}/`)
  );
}

function getMergedCategories(
  primaryCategories: readonly HeaderCategory[],
  moreCategories: readonly HeaderCategory[],
) {
  const categoryMap = new Map<string, HeaderCategory>();

  for (const category of primaryCategories) {
    categoryMap.set(category.id, category);
  }

  for (const category of moreCategories) {
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, category);
    }
  }

  return Array.from(categoryMap.values());
}

function getVisibleAccountLinks(
  accountLinks: readonly HeaderAccountLink[],
  user: HeaderUserState,
) {
  const orderedIds = user.isAuthenticated
    ? AUTHENTICATED_ACCOUNT_LINK_ORDER
    : GUEST_ACCOUNT_LINK_ORDER;

  const hiddenIds = new Set<string>(
    user.isAuthenticated
      ? [SIGN_IN_LINK_ID, CREATE_ACCOUNT_LINK_ID]
      : [MY_ACCOUNT_LINK_ID],
  );

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

function getPrimaryAccountLinks(
  accountLinks: readonly HeaderAccountLink[],
  user: HeaderUserState,
) {
  const primaryLinkIds = user.isAuthenticated
    ? PRIMARY_AUTHENTICATED_LINK_IDS
    : PRIMARY_GUEST_LINK_IDS;

  return accountLinks.filter((item) => primaryLinkIds.has(item.id));
}

function getSecondaryAccountLinks(
  accountLinks: readonly HeaderAccountLink[],
  user: HeaderUserState,
) {
  const primaryLinkIds = user.isAuthenticated
    ? PRIMARY_AUTHENTICATED_LINK_IDS
    : PRIMARY_GUEST_LINK_IDS;

  return accountLinks.filter((item) => !primaryLinkIds.has(item.id));
}

function getVisibleUtilityLinks(
  utilityLinks: readonly HeaderIconLink[],
  accountLinks: readonly HeaderAccountLink[],
) {
  const accountLinkIds = new Set(accountLinks.map((item) => item.id));
  const accountLinkHrefs = new Set(accountLinks.map((item) => item.href));

  return utilityLinks.filter(
    (item) => !accountLinkIds.has(item.id) && !accountLinkHrefs.has(item.href),
  );
}

function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function getItemCountLabel(
  count: number,
  singularLabel: string,
  pluralLabel: string,
) {
  return count === 1 ? `${count} ${singularLabel}` : `${count} ${pluralLabel}`;
}

function getCartAriaLabel(cartSummary: HeaderCartSummary) {
  const itemLabel = getItemCountLabel(cartSummary.itemCount, "item", "items");

  return `View cart, ${itemLabel}, total ${cartSummary.totalLabel}`;
}

function getWishlistAriaLabel(count: number) {
  const wishlistLabel = getItemCountLabel(count, "saved item", "saved items");

  return `View wishlist, ${wishlistLabel}`;
}

function isWishlistLink(item: HeaderAccountLink) {
  return item.id === "saved-wishlist" || item.href.includes("wishlist");
}

function getAccountLinkAriaLabel(item: HeaderAccountLink, counts: HeaderCounts) {
  if (isWishlistLink(item)) {
    return getWishlistAriaLabel(counts.wishlist);
  }

  return item.ariaLabel ?? item.label;
}

function getAccountLinkIconName(item: HeaderAccountLink): HeaderIconKey {
  const normalizedId = item.id.toLowerCase();

  if (normalizedId.includes("sign")) {
    return "user";
  }

  if (normalizedId.includes("create")) {
    return "check";
  }

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

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    const isDisabled =
      element.hasAttribute("disabled") ||
      element.getAttribute("aria-disabled") === "true";

    const isHidden =
      element.getAttribute("aria-hidden") === "true" ||
      element.hidden ||
      element.tabIndex < 0;

    return !isDisabled && !isHidden;
  });
}

function HeaderMobileLogo({ onCloseAll }: HeaderMobileLogoProps) {
  return (
    <Link
      className="gb-site-header__logo"
      href="/"
      aria-label="365 SHOP home"
      onClick={onCloseAll}
    >
      <span className="gb-site-header__logo-mark" aria-hidden="true">
        <span className="gb-site-header__logo-brand">
          <span className="gb-site-header__logo-number">365</span>
          <span className="gb-site-header__logo-cart">
            <HeaderIcon name="cart" />
          </span>
        </span>

        <span className="gb-site-header__logo-name">SHOP</span>
      </span>
    </Link>
  );
}

function HeaderDrawerAccountLink({
  counts,
  item,
  pathname,
  user,
  onCloseAll,
}: HeaderDrawerAccountLinkProps) {
  const href = getProtectedHref(item.href, user, item.requiresAuth);
  const isActive = isRouteActive(pathname, href);
  const shouldShowWishlistCount = isWishlistLink(item) && counts.wishlist > 0;

  return (
    <Link
      className="gb-site-header__drawer-link"
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-label={getAccountLinkAriaLabel(item, counts)}
      onClick={onCloseAll}
    >
      <span>
        {item.label}
        {item.description ? (
          <span className="gb-sr-only"> — {item.description}</span>
        ) : null}
      </span>

      {shouldShowWishlistCount ? (
        <span aria-hidden="true">{formatCount(counts.wishlist)}</span>
      ) : (
        <HeaderIcon name={getAccountLinkIconName(item)} />
      )}
    </Link>
  );
}

export function HeaderMobileDrawer({
  accountLinks,
  cartSummary,
  counts,
  isOpen,
  languageOptions,
  mobileDrawerId,
  moreCategories,
  onCloseAll,
  onSelectLanguage,
  primaryCategories,
  selectedLanguage,
  user,
  utilityLinks,
}: HeaderMobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const allCategories = useMemo(
    () => getMergedCategories(primaryCategories, moreCategories),
    [moreCategories, primaryCategories],
  );

  const visibleAccountLinks = useMemo(
    () => getVisibleAccountLinks(accountLinks, user),
    [accountLinks, user],
  );

  const primaryAccountLinks = useMemo(
    () => getPrimaryAccountLinks(visibleAccountLinks, user),
    [visibleAccountLinks, user],
  );

  const secondaryAccountLinks = useMemo(
    () => getSecondaryAccountLinks(visibleAccountLinks, user),
    [visibleAccountLinks, user],
  );

  const visibleUtilityLinks = useMemo(
    () => getVisibleUtilityLinks(utilityLinks, accountLinks),
    [accountLinks, utilityLinks],
  );

  const drawerTitleId = `${mobileDrawerId}-title`;
  const accountHeadingId = `${mobileDrawerId}-account-heading`;
  const shopHeadingId = `${mobileDrawerId}-shop-heading`;
  const serviceHeadingId = `${mobileDrawerId}-service-heading`;
  const languageHeadingId = `${mobileDrawerId}-language-heading`;

  const handleOverlayPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.currentTarget === event.target) {
        onCloseAll();
      }
    },
    [onCloseAll],
  );

  const handleDrawerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseAll();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(drawerRef.current);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    [onCloseAll],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const animationFrameId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      if (previousActiveElement && document.contains(previousActiveElement)) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="gb-site-header__drawer-overlay"
      role="presentation"
      onPointerDown={handleOverlayPointerDown}
    >
      <aside
        ref={drawerRef}
        id={mobileDrawerId}
        className="gb-site-header__drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={drawerTitleId}
        onKeyDown={handleDrawerKeyDown}
      >
        <div className="gb-site-header__drawer-head">
          <h2 id={drawerTitleId} className="gb-sr-only">
            Mobile navigation
          </h2>

          <HeaderMobileLogo onCloseAll={onCloseAll} />

          <button
            ref={closeButtonRef}
            type="button"
            className="gb-site-header__mobile-button"
            aria-label="Close menu"
            onClick={onCloseAll}
          >
            <HeaderIcon name="close" />
          </button>
        </div>

        <div className="gb-site-header__drawer-body">
          <nav
            className="gb-site-header__drawer-section"
            aria-labelledby={accountHeadingId}
          >
            <h3 id={accountHeadingId} className="gb-site-header__drawer-title">
              Account
            </h3>

            {primaryAccountLinks.map((item) => (
              <HeaderDrawerAccountLink
                key={item.id}
                counts={counts}
                item={item}
                pathname={pathname}
                user={user}
                onCloseAll={onCloseAll}
              />
            ))}

            {secondaryAccountLinks.map((item) => (
              <HeaderDrawerAccountLink
                key={item.id}
                counts={counts}
                item={item}
                pathname={pathname}
                user={user}
                onCloseAll={onCloseAll}
              />
            ))}

            <Link
              className="gb-site-header__drawer-link"
              href={cartSummary.cartHref}
              aria-current={
                isRouteActive(pathname, cartSummary.cartHref)
                  ? "page"
                  : undefined
              }
              aria-label={getCartAriaLabel(cartSummary)}
              onClick={onCloseAll}
            >
              <span>My Cart</span>
              <span aria-hidden="true">{cartSummary.totalLabel}</span>
            </Link>
          </nav>

          {allCategories.length > 0 ? (
            <nav
              className="gb-site-header__drawer-section"
              aria-labelledby={shopHeadingId}
            >
              <h3 id={shopHeadingId} className="gb-site-header__drawer-title">
                Shop by category
              </h3>

              {allCategories.map((category) => {
                const isActive = isRouteActive(pathname, category.href);

                return (
                  <Link
                    key={category.id}
                    className="gb-site-header__drawer-link"
                    href={category.href}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={category.name}
                    onClick={onCloseAll}
                  >
                    <span>{category.name}</span>
                    <HeaderIcon name={category.icon} />
                  </Link>
                );
              })}
            </nav>
          ) : null}

          {visibleUtilityLinks.length > 0 ? (
            <nav
              className="gb-site-header__drawer-section"
              aria-labelledby={serviceHeadingId}
            >
              <h3 id={serviceHeadingId} className="gb-site-header__drawer-title">
                Customer service
              </h3>

              {visibleUtilityLinks.map((item) => {
                const isActive = isRouteActive(pathname, item.href);

                return (
                  <Link
                    key={item.id}
                    className="gb-site-header__drawer-link"
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.ariaLabel ?? item.label}
                    onClick={onCloseAll}
                  >
                    <span>{item.label}</span>
                    <HeaderIcon name={item.icon} />
                  </Link>
                );
              })}
            </nav>
          ) : null}

          {languageOptions.length > 0 ? (
            <section
              className="gb-site-header__drawer-section"
              aria-labelledby={languageHeadingId}
            >
              <h3
                id={languageHeadingId}
                className="gb-site-header__drawer-title"
              >
                Language
              </h3>

              {languageOptions.map((option) => {
                const isSelected = selectedLanguage === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className="gb-site-header__drawer-link"
                    aria-label={`Select language ${option.label}`}
                    aria-pressed={isSelected}
                    data-active={isSelected ? "true" : undefined}
                    onClick={() => {
                      onSelectLanguage(option.id);
                      onCloseAll();
                    }}
                  >
                    <span>{option.label}</span>
                    <span>{option.nativeLabel}</span>
                  </button>
                );
              })}
            </section>
          ) : null}
        </div>
      </aside>
    </div>
  );
}