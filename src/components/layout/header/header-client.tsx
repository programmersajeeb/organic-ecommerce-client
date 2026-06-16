"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { getProtectedHref, HeaderActions } from "./header-actions";
import {
  HeaderCategoriesTrigger,
  HeaderCategoryNav,
} from "./header-category-nav";
import { HeaderIcon } from "./header-icons";
import { HeaderMobileDrawer } from "./header-mobile-drawer";
import { HeaderSearch } from "./header-search";
import type {
  HeaderAccountLink,
  HeaderCartSummary,
  HeaderCategory,
  HeaderCounts,
  HeaderIconKey,
  HeaderLanguageId,
  HeaderLanguageOption,
  HeaderPanel,
  HeaderPanelKey,
  HeaderSearchConfig,
  HeaderSearchPayload,
  HeaderUserState,
  HeaderViewModel,
} from "./header.types";

type HeaderClientProps = Readonly<{
  data: HeaderViewModel;
  searchConfig: HeaderSearchConfig;
}>;

type HeaderLogoProps = Readonly<{
  onClick: () => void;
}>;

type HeaderCountBadgeProps = Readonly<{
  count: number;
}>;

type HeaderMobileNotificationActionProps = Readonly<{
  count: number;
  href: string;
  onCloseAll: () => void;
}>;

type HeaderMobileSearchActionProps = Readonly<{
  buttonRef: RefObject<HTMLButtonElement | null>;
  searchOverlayId: string;
  onOpenSearch: () => void;
}>;

type HeaderMobileSearchDialogProps = Readonly<{
  dialogRef: RefObject<HTMLDivElement | null>;
  emptyQueryMessage: string;
  id: string;
  inputId: string;
  inputName: string;
  isOpen: boolean;
  label: string;
  placeholder: string;
  titleId: string;
  value: string;
  onClose: () => void;
  onSearch: (payload: HeaderSearchPayload) => void;
  onValueChange: (value: string) => void;
}>;

type HeaderMobileBottomNavigationProps = Readonly<{
  accountHref: string;
  cartSummary: HeaderCartSummary;
  counts: HeaderCounts;
  currentPathname: string;
  mobileDrawerId: string;
  primaryCategories: readonly HeaderCategory[];
  moreCategories: readonly HeaderCategory[];
  user: HeaderUserState;
  wishlistHref: string;
  onCloseAll: () => void;
  onOpenCategories: () => void;
}>;

type HeaderMobileBottomLinkProps = Readonly<{
  count?: number;
  href: string;
  icon: HeaderIconKey;
  isActive: boolean;
  label: string;
  ariaLabel?: string;
  onClick: () => void;
}>;

type HeaderMobileBottomButtonProps = Readonly<{
  controls: string;
  icon: HeaderIconKey;
  isActive: boolean;
  label: string;
  ariaLabel: string;
  onClick: () => void;
}>;

const DEFAULT_LANGUAGE_ID: HeaderLanguageId = "en";
const LANGUAGE_STORAGE_KEY = "gb-language";
const LANGUAGE_CHANGE_EVENT = "gb-language-change";
const HEADER_SCROLLED_THRESHOLD = 8;
const HEADER_MOBILE_SEARCH_COLLAPSE_Y = 112;
const HEADER_MOBILE_SEARCH_EXPAND_Y = 44;
const HEADER_SCROLL_DELTA_GUARD = 8;
const ROOT_PATHNAME = "/";
const ACCOUNT_OVERVIEW_HREF = "/account";
const ACCOUNT_LOGIN_HREF = "/account/login";
const ACCOUNT_REGISTER_HREF = "/account/register";
const CART_HREF = "/cart";
const CHECKOUT_HREF = "/checkout";
const TRACK_ORDER_HREF = "/track-order";
const HELP_CENTER_HREF = "/help-center";
const SEARCH_FALLBACK_HREF = ROOT_PATHNAME;
const NOTIFICATIONS_HREF = ACCOUNT_OVERVIEW_HREF;
const WISHLIST_HREF = "/account/wishlist";
const SIGN_IN_LINK_ID = "sign-in";
const MY_ACCOUNT_LINK_ID = "my-account";
const SAVED_WISHLIST_LINK_ID = "saved-wishlist";

const SUPPORTED_HEADER_ROUTES = new Set<string>([
  ROOT_PATHNAME,
  ACCOUNT_OVERVIEW_HREF,
  ACCOUNT_LOGIN_HREF,
  ACCOUNT_REGISTER_HREF,
  CART_HREF,
  CHECKOUT_HREF,
  TRACK_ORDER_HREF,
  HELP_CENTER_HREF,
]);

type HeaderScrollSnapshot = Readonly<{
  isScrolled: boolean;
  isMobileSearchCollapsed: boolean;
}>;

const HEADER_SCROLL_TOP_SNAPSHOT: HeaderScrollSnapshot = {
  isScrolled: false,
  isMobileSearchCollapsed: false,
};

const HEADER_SCROLL_EXPANDED_SNAPSHOT: HeaderScrollSnapshot = {
  isScrolled: true,
  isMobileSearchCollapsed: false,
};

const HEADER_SCROLL_COLLAPSED_SNAPSHOT: HeaderScrollSnapshot = {
  isScrolled: true,
  isMobileSearchCollapsed: true,
};

let headerScrollSnapshot = HEADER_SCROLL_TOP_SNAPSHOT;
let previousHeaderScrollY = 0;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getClassName(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function getRouteHref(href: string) {
  return href as Route;
}

function normalizePathname(pathname: string) {
  const cleanPathname = pathname.split(/[?#]/)[0] || ROOT_PATHNAME;

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

function isSupportedHeaderHref(href: string) {
  if (!isInternalHref(href)) {
    return true;
  }

  return SUPPORTED_HEADER_ROUTES.has(normalizePathname(href));
}

function getSafeHeaderHref(href: string, fallbackHref = ACCOUNT_OVERVIEW_HREF) {
  if (isSupportedHeaderHref(href)) {
    return href;
  }

  return fallbackHref;
}

function getSafeProtectedHeaderHref(
  href: string,
  user: HeaderUserState,
  requiresAuth?: boolean,
  fallbackHref = ACCOUNT_OVERVIEW_HREF,
) {
  const protectedHref = getProtectedHref(href, user, requiresAuth);

  if (protectedHref.startsWith(`${ACCOUNT_LOGIN_HREF}?`)) {
    return protectedHref;
  }

  return getSafeHeaderHref(protectedHref, fallbackHref);
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

function normalizeSearchQuery(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function isHeaderLanguageId(
  value: string | null,
  options: readonly HeaderLanguageOption[],
): value is HeaderLanguageId {
  return options.some((option) => option.id === value);
}

function getFallbackLanguageId(
  options: readonly HeaderLanguageOption[],
): HeaderLanguageId {
  return (
    options.find((option) => option.id === DEFAULT_LANGUAGE_ID)?.id ??
    options[0]?.id ??
    DEFAULT_LANGUAGE_ID
  );
}

function getSelectedLanguageLabel(
  options: readonly HeaderLanguageOption[],
  selectedLanguage: HeaderLanguageId,
) {
  return (
    options.find((option) => option.id === selectedLanguage)?.label ??
    options[0]?.label ??
    "English"
  );
}

function getSafeStoredLanguage(
  options: readonly HeaderLanguageOption[],
): HeaderLanguageId {
  const fallbackLanguageId = getFallbackLanguageId(options);

  if (typeof window === "undefined") {
    return fallbackLanguageId;
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isHeaderLanguageId(storedLanguage, options)) {
      return storedLanguage;
    }
  } catch {
    return fallbackLanguageId;
  }

  return fallbackLanguageId;
}

function subscribeToLanguageStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

function setStoredLanguage(language: HeaderLanguageId) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Storage can fail in restricted browser contexts.
  }

  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

function useStoredLanguage(options: readonly HeaderLanguageOption[]) {
  const getSnapshot = useCallback(
    () => getSafeStoredLanguage(options),
    [options],
  );

  const getServerSnapshot = useCallback(
    () => getFallbackLanguageId(options),
    [options],
  );

  return useSyncExternalStore(
    subscribeToLanguageStore,
    getSnapshot,
    getServerSnapshot,
  );
}

function getStableHeaderScrollSnapshot(
  scrollY: number,
  previousScrollY: number,
  currentSnapshot: HeaderScrollSnapshot,
) {
  const scrollDelta = scrollY - previousScrollY;
  const isScrolled = scrollY > HEADER_SCROLLED_THRESHOLD;
  let isMobileSearchCollapsed = currentSnapshot.isMobileSearchCollapsed;

  if (scrollY <= HEADER_MOBILE_SEARCH_EXPAND_Y) {
    isMobileSearchCollapsed = false;
  } else if (
    scrollY >= HEADER_MOBILE_SEARCH_COLLAPSE_Y &&
    scrollDelta >= HEADER_SCROLL_DELTA_GUARD
  ) {
    isMobileSearchCollapsed = true;
  }

  if (!isScrolled) {
    return HEADER_SCROLL_TOP_SNAPSHOT;
  }

  return isMobileSearchCollapsed
    ? HEADER_SCROLL_COLLAPSED_SNAPSHOT
    : HEADER_SCROLL_EXPANDED_SNAPSHOT;
}

function refreshHeaderScrollSnapshot(forceNotify: boolean) {
  if (typeof window === "undefined") {
    return false;
  }

  const currentScrollY = Math.max(0, window.scrollY);
  const scrollDelta = Math.abs(currentScrollY - previousHeaderScrollY);

  if (
    !forceNotify &&
    scrollDelta < HEADER_SCROLL_DELTA_GUARD &&
    currentScrollY > HEADER_MOBILE_SEARCH_EXPAND_Y &&
    currentScrollY < HEADER_MOBILE_SEARCH_COLLAPSE_Y
  ) {
    return false;
  }

  const nextSnapshot = getStableHeaderScrollSnapshot(
    currentScrollY,
    previousHeaderScrollY,
    headerScrollSnapshot,
  );

  previousHeaderScrollY = currentScrollY;

  if (nextSnapshot === headerScrollSnapshot) {
    return false;
  }

  headerScrollSnapshot = nextSnapshot;
  return true;
}

function getHeaderScrollSnapshot() {
  return headerScrollSnapshot;
}

function subscribeToHeaderScrollStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  let animationFrameId: number | null = null;

  previousHeaderScrollY = Math.max(0, window.scrollY);
  headerScrollSnapshot =
    previousHeaderScrollY >= HEADER_MOBILE_SEARCH_COLLAPSE_Y
      ? HEADER_SCROLL_COLLAPSED_SNAPSHOT
      : previousHeaderScrollY > HEADER_SCROLLED_THRESHOLD
        ? HEADER_SCROLL_EXPANDED_SNAPSHOT
        : HEADER_SCROLL_TOP_SNAPSHOT;

  const handleScroll = () => {
    if (animationFrameId !== null) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(() => {
      animationFrameId = null;

      if (refreshHeaderScrollSnapshot(false)) {
        onStoreChange();
      }
    });
  };

  const handleScrollPositionReset = () => {
    if (refreshHeaderScrollSnapshot(true)) {
      onStoreChange();
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScrollPositionReset);
  window.addEventListener("orientationchange", handleScrollPositionReset);

  return () => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);
    }

    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScrollPositionReset);
    window.removeEventListener("orientationchange", handleScrollPositionReset);
  };
}

function useHeaderScrollState() {
  return useSyncExternalStore(
    subscribeToHeaderScrollStore,
    getHeaderScrollSnapshot,
    () => HEADER_SCROLL_TOP_SNAPSHOT,
  );
}

function formatBadgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function getItemCountLabel(
  count: number,
  singularLabel: string,
  pluralLabel: string,
) {
  return count === 1 ? `${count} ${singularLabel}` : `${count} ${pluralLabel}`;
}

function getCartLabel(itemCount: number) {
  return getItemCountLabel(itemCount, "item", "items");
}

function getCartAriaLabel(cartSummary: HeaderCartSummary) {
  return `View cart, ${getCartLabel(cartSummary.itemCount)}, total ${cartSummary.totalLabel}`;
}

function getNotificationLabel(count: number) {
  return getItemCountLabel(count, "unread notification", "unread notifications");
}

function getWishlistLabel(count: number) {
  return getItemCountLabel(count, "saved item", "saved items");
}

function getSearchHref(searchHref: string, query: string) {
  const searchParams = new URLSearchParams({
    q: query,
  });

  const normalizedSearchHref = normalizePathname(searchHref);
  const safeSearchHref = isSupportedHeaderHref(normalizedSearchHref)
    ? normalizedSearchHref
    : SEARCH_FALLBACK_HREF;

  return `${safeSearchHref}?${searchParams.toString()}`;
}

function getMenuItems(menu: HTMLElement) {
  return Array.from(
    menu.querySelectorAll<HTMLElement>(
      '[role="menuitem"], [role="menuitemradio"]',
    ),
  );
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

function focusMenuItem(menu: HTMLElement, index: number) {
  const menuItems = getMenuItems(menu);
  const targetItem = menuItems[index];

  targetItem?.focus();
}

function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
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

function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getFocusableElements(event.currentTarget);
  const firstElement = focusableElements.at(0);
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
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

function getPreferredAccountLink(
  accountLinks: readonly HeaderAccountLink[],
  user: HeaderUserState,
) {
  if (user.isAuthenticated) {
    return findAccountLink(accountLinks, MY_ACCOUNT_LINK_ID);
  }

  return findAccountLink(accountLinks, SIGN_IN_LINK_ID);
}

function getCategoryNavActiveState(
  pathname: string,
  primaryCategories: readonly HeaderCategory[],
  moreCategories: readonly HeaderCategory[],
) {
  return [...primaryCategories, ...moreCategories].some((category) =>
    isRouteActive(pathname, category.href),
  );
}

function isWishlistPath(pathname: string) {
  const currentPathname = normalizePathname(pathname);

  return (
    currentPathname === WISHLIST_HREF ||
    currentPathname.startsWith(`${WISHLIST_HREF}/`)
  );
}

function getSafeNextPathname(nextHref: string | null) {
  if (!nextHref || !isInternalHref(nextHref)) {
    return null;
  }

  return normalizePathname(nextHref);
}

function getMobileActivePathname(pathname: string, nextHref: string | null) {
  const nextPathname = getSafeNextPathname(nextHref);

  if (nextPathname && isWishlistPath(nextPathname)) {
    return nextPathname;
  }

  return pathname;
}

function isAccountPath(pathname: string) {
  const currentPathname = normalizePathname(pathname);

  return (
    (currentPathname === ACCOUNT_OVERVIEW_HREF ||
      currentPathname.startsWith(`${ACCOUNT_OVERVIEW_HREF}/`)) &&
    !isWishlistPath(currentPathname)
  );
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

function HeaderMobileNotificationAction({
  count,
  href,
  onCloseAll,
}: HeaderMobileNotificationActionProps) {
  return (
    <Link
      className="gb-site-header__mobile-button"
      href={getRouteHref(href)}
      aria-label={`View notifications, ${getNotificationLabel(count)}`}
      onClick={onCloseAll}
    >
      <HeaderIcon name="bell" />
      <HeaderCountBadge count={count} />
    </Link>
  );
}

function HeaderMobileSearchAction({
  buttonRef,
  searchOverlayId,
  onOpenSearch,
}: HeaderMobileSearchActionProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="gb-site-header__mobile-button gb-site-header__mobile-search-action"
      aria-label="Open product search"
      aria-controls={searchOverlayId}
      aria-haspopup="dialog"
      onClick={onOpenSearch}
    >
      <HeaderIcon name="search" />
    </button>
  );
}

function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <Link
      className="gb-site-header__logo"
      href={getRouteHref(ROOT_PATHNAME)}
      aria-label="365 SHOP home"
      onClick={onClick}
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

function HeaderMobileSearchDialog({
  dialogRef,
  emptyQueryMessage,
  id,
  inputId,
  inputName,
  isOpen,
  label,
  placeholder,
  titleId,
  value,
  onClose,
  onSearch,
  onValueChange,
}: HeaderMobileSearchDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div id={id} className="gb-site-header__mobile-search-overlay">
      <button
        type="button"
        className="gb-site-header__mobile-search-backdrop"
        aria-label="Close product search"
        tabIndex={-1}
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="gb-site-header__mobile-search-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="gb-site-header__mobile-search-header">
          <button
            type="button"
            className="gb-site-header__mobile-button gb-site-header__mobile-search-close"
            aria-label="Close search"
            onClick={onClose}
          >
            <HeaderIcon name="close" />
          </button>

          <h2 id={titleId} className="gb-sr-only">
            Search products
          </h2>

          <HeaderSearch
            id={inputId}
            name={inputName}
            label={label}
            placeholder={placeholder}
            emptyQueryMessage={emptyQueryMessage}
            source="mobile"
            value={value}
            className="gb-site-header__search--mobile-overlay"
            onValueChange={onValueChange}
            onSearch={onSearch}
          />
        </div>
      </div>
    </div>
  );
}

function HeaderMobileBottomLink({
  count = 0,
  href,
  icon,
  isActive,
  label,
  ariaLabel,
  onClick,
}: HeaderMobileBottomLinkProps) {
  return (
    <Link
      className="gb-site-header__mobile-nav-link"
      href={getRouteHref(href)}
      aria-label={ariaLabel ?? label}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "true" : undefined}
      onClick={onClick}
    >
      <span className="gb-site-header__mobile-nav-icon" aria-hidden="true">
        <HeaderIcon name={icon} />
        <HeaderCountBadge count={count} />
      </span>
      <span className="gb-site-header__mobile-nav-label">{label}</span>
    </Link>
  );
}

function HeaderMobileBottomButton({
  controls,
  icon,
  isActive,
  label,
  ariaLabel,
  onClick,
}: HeaderMobileBottomButtonProps) {
  return (
    <button
      type="button"
      className="gb-site-header__mobile-nav-link"
      aria-label={ariaLabel}
      aria-controls={controls}
      aria-haspopup="dialog"
      data-active={isActive ? "true" : undefined}
      onClick={onClick}
    >
      <span className="gb-site-header__mobile-nav-icon" aria-hidden="true">
        <HeaderIcon name={icon} />
      </span>
      <span className="gb-site-header__mobile-nav-label">{label}</span>
    </button>
  );
}

function HeaderMobileBottomNavigation({
  accountHref,
  cartSummary,
  counts,
  currentPathname,
  mobileDrawerId,
  primaryCategories,
  moreCategories,
  user,
  wishlistHref,
  onCloseAll,
  onOpenCategories,
}: HeaderMobileBottomNavigationProps) {
  const isWishlistActive = isWishlistPath(currentPathname);
  const isAccountActive = isAccountPath(currentPathname);
  const isCartActive = isRouteActive(currentPathname, cartSummary.cartHref);
  const isHomeActive =
    !isWishlistActive &&
    !isAccountActive &&
    !isCartActive &&
    isRouteActive(currentPathname, ROOT_PATHNAME);
  const isCategoriesActive =
    !isWishlistActive &&
    !isAccountActive &&
    !isCartActive &&
    getCategoryNavActiveState(currentPathname, primaryCategories, moreCategories);

  return (
    <nav
      className="gb-site-header__mobile-nav"
      aria-label="Mobile primary navigation"
    >
      <HeaderMobileBottomLink
        href={ROOT_PATHNAME}
        icon="home"
        isActive={isHomeActive}
        label="Home"
        onClick={onCloseAll}
      />

      <HeaderMobileBottomButton
        controls={mobileDrawerId}
        icon="categories"
        isActive={isCategoriesActive}
        label="Categories"
        ariaLabel="Open categories menu"
        onClick={onOpenCategories}
      />

      <HeaderMobileBottomLink
        href={wishlistHref}
        icon="wishlist"
        count={counts.wishlist}
        isActive={isWishlistActive}
        label="Wishlist"
        ariaLabel={`View wishlist, ${getWishlistLabel(counts.wishlist)}`}
        onClick={onCloseAll}
      />

      <HeaderMobileBottomLink
        href={cartSummary.cartHref}
        icon="cart"
        count={cartSummary.itemCount}
        isActive={isCartActive}
        label="Cart"
        ariaLabel={getCartAriaLabel(cartSummary)}
        onClick={onCloseAll}
      />

      <HeaderMobileBottomLink
        href={accountHref}
        icon="user"
        isActive={isAccountActive}
        label="Account"
        ariaLabel={
          user.isAuthenticated ? "View account" : "Sign in to your account"
        }
        onClick={onCloseAll}
      />
    </nav>
  );
}

export function HeaderClient({ data, searchConfig }: HeaderClientProps) {
  const {
    accountLinks,
    cartSummary,
    counts,
    languageOptions,
    moreCategories,
    notifications,
    primaryCategories,
    trustItems,
    user,
    utilityLinks,
  } = data;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activePanel, setActivePanel] = useState<HeaderPanel>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isMobileSearchCollapsed, isScrolled } = useHeaderScrollState();
  const selectedLanguage = useStoredLanguage(languageOptions);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileSearchDialogRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchTriggerRef = useRef<HTMLButtonElement | null>(null);

  const languageMenuId = useId();
  const categoriesMenuId = useId();
  const accountMenuId = useId();
  const notificationsMenuId = useId();
  const moreMenuId = useId();
  const mobileDrawerId = useId();
  const desktopSearchId = useId();
  const mobileSearchId = useId();
  const mobileSearchOverlayId = useId();
  const mobileSearchOverlayInputId = useId();
  const mobileSearchOverlayTitleId = useId();

  const selectedLanguageLabel = getSelectedLanguageLabel(
    languageOptions,
    selectedLanguage,
  );

  const notificationsHref = getProtectedHref(NOTIFICATIONS_HREF, user, true);
  const isLanguageMenuOpen = activePanel === "language";
  const isBodyLocked = isMobileMenuOpen || isMobileSearchOpen;
  const mobileActiveNextHref = searchParams.get("next");
  const mobileActivePathname = useMemo(
    () => getMobileActivePathname(pathname, mobileActiveNextHref),
    [mobileActiveNextHref, pathname],
  );

  const mobileNavigationHrefs = useMemo(() => {
    const wishlistLink = findWishlistLink(accountLinks);
    const accountLink = getPreferredAccountLink(accountLinks, user);

    return {
      accountHref: getSafeProtectedHeaderHref(
        accountLink?.href ?? ACCOUNT_OVERVIEW_HREF,
        user,
        accountLink?.requiresAuth ?? !user.isAuthenticated,
        user.isAuthenticated ? ACCOUNT_OVERVIEW_HREF : ACCOUNT_LOGIN_HREF,
      ),
      wishlistHref: getSafeProtectedHeaderHref(
        wishlistLink?.href ?? WISHLIST_HREF,
        user,
        wishlistLink?.requiresAuth ?? true,
        user.isAuthenticated ? ACCOUNT_OVERVIEW_HREF : ACCOUNT_LOGIN_HREF,
      ),
    };
  }, [accountLinks, user]);

  const headerClassName = getClassName(
    "gb-site-header",
    isScrolled && "gb-site-header--scrolled",
    isMobileSearchCollapsed && "gb-site-header--mobile-search-collapsed",
    isMobileMenuOpen && "gb-site-header--mobile-menu-open",
    isMobileSearchOpen && "gb-site-header--mobile-search-open",
  );

  const closePanels = useCallback(() => {
    setActivePanel(null);
  }, []);

  const closeMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(false);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        mobileSearchTriggerRef.current?.focus();
      });
    }
  }, []);

  const closeAll = useCallback(() => {
    setActivePanel(null);
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, []);

  const togglePanel = useCallback((panel: HeaderPanelKey) => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  }, []);

  const openMobileMenu = useCallback(() => {
    setActivePanel(null);
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(true);
  }, []);

  const openMobileSearch = useCallback(() => {
    setActivePanel(null);
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(true);
  }, []);

  const handleSelectLanguage = useCallback(
    (language: HeaderLanguageId) => {
      setStoredLanguage(language);
      closePanels();
    },
    [closePanels],
  );

  const handleSearchValueChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSearch = useCallback(
    ({ query }: HeaderSearchPayload) => {
      const normalizedQuery = normalizeSearchQuery(query);

      if (!normalizedQuery) {
        return;
      }

      setSearchQuery(normalizedQuery);
      closeAll();
      router.push(getRouteHref(getSearchHref(searchConfig.searchHref, normalizedQuery)));
    },
    [closeAll, router, searchConfig.searchHref],
  );

  useEffect(() => {
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!headerRef.current?.contains(target)) {
        closePanels();
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAll, closePanels]);

  useEffect(() => {
    if (!isBodyLocked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBodyLocked]);

  useEffect(() => {
    if (!isMobileSearchOpen) {
      return;
    }

    mobileSearchDialogRef.current
      ?.querySelector<HTMLInputElement>('input[type="search"]')
      ?.focus();
  }, [isMobileSearchOpen]);

  return (
    <header
      ref={headerRef}
      className={headerClassName}
      data-mobile-search-state={
        isMobileSearchCollapsed ? "collapsed" : "expanded"
      }
    >
      <div className="gb-site-header__topbar">
        <div className="gb-container-wide gb-site-header__topbar-inner">
          <div
            className="gb-site-header__trust-list"
            aria-label="Store trust benefits"
          >
            {trustItems.map((item) =>
              item.href ? (
                <Link
                  key={item.id}
                  className="gb-site-header__trust-item"
                  href={getRouteHref(getSafeHeaderHref(item.href))}
                  aria-label={item.ariaLabel ?? item.label}
                  onClick={closePanels}
                >
                  <HeaderIcon name={item.icon} />
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.id}
                  className="gb-site-header__trust-item"
                  aria-label={item.ariaLabel}
                >
                  <HeaderIcon name={item.icon} />
                  {item.label}
                </span>
              ),
            )}
          </div>

          <div className="gb-site-header__utility-list">
            {utilityLinks.map((item) => (
              <Link
                key={item.id}
                className="gb-site-header__utility-link"
                href={getRouteHref(getSafeHeaderHref(item.href))}
                aria-label={item.ariaLabel ?? item.label}
                onClick={closePanels}
              >
                <HeaderIcon name={item.icon} />
                {item.label}
              </Link>
            ))}

            {languageOptions.length > 0 ? (
              <div className="gb-site-header__language">
                <button
                  type="button"
                  className="gb-site-header__language-trigger"
                  aria-label={`Select language, current language is ${selectedLanguageLabel}`}
                  aria-expanded={isLanguageMenuOpen}
                  aria-controls={languageMenuId}
                  aria-haspopup="menu"
                  data-active={isLanguageMenuOpen ? "true" : undefined}
                  data-state={isLanguageMenuOpen ? "open" : "closed"}
                  onClick={() => togglePanel("language")}
                >
                  <HeaderIcon name="globe" />
                  <span>{selectedLanguageLabel}</span>
                  <HeaderIcon name="chevronDown" />
                </button>

                {isLanguageMenuOpen ? (
                  <div
                    id={languageMenuId}
                    className="gb-site-header__language-menu"
                    role="menu"
                    aria-label="Language options"
                    onKeyDown={handleMenuKeyDown}
                  >
                    {languageOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className="gb-site-header__language-option"
                        role="menuitemradio"
                        aria-checked={selectedLanguage === option.id}
                        onClick={() => handleSelectLanguage(option.id)}
                      >
                        <span>{option.label}</span>
                        <span>{option.nativeLabel}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="gb-site-header__main">
        <div className="gb-container-wide gb-site-header__main-inner">
          <HeaderLogo onClick={closeAll} />

          <HeaderCategoriesTrigger
            activePanel={activePanel}
            categoriesMenuId={categoriesMenuId}
            primaryCategories={primaryCategories}
            moreCategories={moreCategories}
            onCloseAll={closeAll}
            onTogglePanel={togglePanel}
          />

          <HeaderSearch
            id={desktopSearchId}
            name={searchConfig.desktopInputName}
            label="Product search"
            placeholder={searchConfig.placeholder}
            emptyQueryMessage={searchConfig.emptyQueryMessage}
            source="desktop"
            value={searchQuery}
            onValueChange={handleSearchValueChange}
            onSearch={handleSearch}
          />

          <HeaderActions
            accountLinks={accountLinks}
            activePanel={activePanel}
            accountMenuId={accountMenuId}
            cartSummary={cartSummary}
            counts={counts}
            notifications={notifications}
            notificationsMenuId={notificationsMenuId}
            user={user}
            onCloseAll={closeAll}
            onTogglePanel={togglePanel}
          />
        </div>
      </div>

      <HeaderCategoryNav
        activePanel={activePanel}
        moreMenuId={moreMenuId}
        primaryCategories={primaryCategories}
        moreCategories={moreCategories}
        onCloseAll={closeAll}
        onTogglePanel={togglePanel}
      />

      <div className="gb-container-wide gb-site-header__mobile-main">
        <button
          type="button"
          className="gb-site-header__mobile-button"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileDrawerId}
          aria-haspopup="dialog"
          onClick={openMobileMenu}
        >
          <HeaderIcon name="menu" />
        </button>

        <HeaderLogo onClick={closeAll} />

        <div className="gb-site-header__mobile-actions">
          <HeaderMobileSearchAction
            buttonRef={mobileSearchTriggerRef}
            searchOverlayId={mobileSearchOverlayId}
            onOpenSearch={openMobileSearch}
          />

          <HeaderMobileNotificationAction
            count={counts.notifications}
            href={notificationsHref}
            onCloseAll={closeAll}
          />
        </div>
      </div>

      <div className="gb-container-wide gb-site-header__mobile-search">
        <HeaderSearch
          id={mobileSearchId}
          name={searchConfig.mobileInputName}
          label="Mobile product search"
          placeholder={searchConfig.placeholder}
          emptyQueryMessage={searchConfig.emptyQueryMessage}
          source="mobile"
          value={searchQuery}
          onValueChange={handleSearchValueChange}
          onSearch={handleSearch}
        />
      </div>

      <HeaderMobileSearchDialog
        dialogRef={mobileSearchDialogRef}
        emptyQueryMessage={searchConfig.emptyQueryMessage}
        id={mobileSearchOverlayId}
        inputId={mobileSearchOverlayInputId}
        inputName={searchConfig.mobileInputName}
        isOpen={isMobileSearchOpen}
        label="Mobile product search overlay"
        placeholder={searchConfig.placeholder}
        titleId={mobileSearchOverlayTitleId}
        value={searchQuery}
        onClose={closeMobileSearch}
        onSearch={handleSearch}
        onValueChange={handleSearchValueChange}
      />

      <HeaderMobileDrawer
        accountLinks={accountLinks}
        cartSummary={cartSummary}
        counts={counts}
        isOpen={isMobileMenuOpen}
        languageOptions={languageOptions}
        mobileDrawerId={mobileDrawerId}
        moreCategories={moreCategories}
        primaryCategories={primaryCategories}
        selectedLanguage={selectedLanguage}
        user={user}
        utilityLinks={utilityLinks}
        onCloseAll={closeAll}
        onSelectLanguage={handleSelectLanguage}
      />

      <HeaderMobileBottomNavigation
        accountHref={mobileNavigationHrefs.accountHref}
        cartSummary={cartSummary}
        counts={counts}
        currentPathname={mobileActivePathname}
        mobileDrawerId={mobileDrawerId}
        primaryCategories={primaryCategories}
        moreCategories={moreCategories}
        user={user}
        wishlistHref={mobileNavigationHrefs.wishlistHref}
        onCloseAll={closeAll}
        onOpenCategories={openMobileMenu}
      />
    </header>
  );
}