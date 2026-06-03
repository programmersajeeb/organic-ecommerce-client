"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Apple,
  BadgePercent,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Droplets,
  Gift,
  Grid3X3,
  Headphones,
  Leaf,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Wheat,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { SearchBox } from "@/components/common/search-box";
import { SiteLogo } from "@/components/common/site-logo";
import { AccountMenu } from "@/components/layout/account-menu";

const cartPreview = {
  itemCount: 2,
  subtotal: "৳2,450",
  href: "/cart",
};

type DrawerItemType = "category" | "seasonal" | "offer";

type DrawerShopItem = Readonly<{
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  keywords: ReadonlyArray<string>;
  type: DrawerItemType;
  badge?: string;
}>;

type DrawerFilterOption = Readonly<{
  label: string;
  shortLabel: string;
  value: "all" | DrawerItemType;
}>;

const drawerFilterOptions: DrawerFilterOption[] = [
  {
    label: "All Categories",
    shortLabel: "All",
    value: "all",
  },
  {
    label: "Main Categories",
    shortLabel: "Main",
    value: "category",
  },
  {
    label: "Seasonal",
    shortLabel: "Seasonal",
    value: "seasonal",
  },
  {
    label: "Offers",
    shortLabel: "Offers",
    value: "offer",
  },
];

const drawerShopItems: DrawerShopItem[] = [
  {
    label: "Honey",
    description: "Pure & raw honey from trusted sources",
    href: "/categories/honey",
    icon: PackageCheck,
    keywords: ["honey", "modhu", "raw honey", "forest honey"],
    type: "category",
  },
  {
    label: "Oil & Ghee",
    description: "Cold-pressed oils and pure ghee",
    href: "/categories/oil-and-ghee",
    icon: Droplets,
    keywords: ["oil", "ghee", "mustard oil", "cooking oil"],
    type: "category",
  },
  {
    label: "Dates",
    description: "Premium quality dates and gift packs",
    href: "/categories/dates",
    icon: Sparkles,
    keywords: ["dates", "khejur", "ajwa", "medjool"],
    type: "category",
  },
  {
    label: "Spices",
    description: "Aromatic and farm-fresh spices",
    href: "/categories/spices",
    icon: Leaf,
    keywords: ["spices", "masala", "turmeric", "chili", "cumin"],
    type: "category",
  },
  {
    label: "Rice & Lentils",
    description: "Daily pantry staples for every home",
    href: "/categories/rice-and-lentils",
    icon: Wheat,
    keywords: ["rice", "lentils", "dal", "pantry", "staples"],
    type: "category",
  },
  {
    label: "Fruits",
    description: "Fresh seasonal and organic fruits",
    href: "/categories/fruits",
    icon: Apple,
    keywords: ["fruits", "mango", "banana", "apple", "seasonal"],
    type: "category",
  },
  {
    label: "Mango Pre-Order",
    description: "Pre-order premium seasonal mangoes",
    href: "/collections/mango-pre-order",
    icon: CalendarDays,
    keywords: ["mango", "pre order", "seasonal fruits"],
    type: "seasonal",
    badge: "New",
  },
  {
    label: "Eid 2026",
    description: "Festive organic grocery and gift picks",
    href: "/collections/eid-2026",
    icon: Gift,
    keywords: ["eid", "gift", "festival", "collection"],
    type: "seasonal",
  },
  {
    label: "Offer Zone",
    description: "Best offers and exclusive grocery deals",
    href: "/offers",
    icon: BadgePercent,
    keywords: ["offer", "deals", "discount", "sale"],
    type: "offer",
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\s+/g, " ")
    .trim();
}

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function subscribeToClientStore() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function focusElementWithoutScrolling(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  const currentScrollX = window.scrollX;
  const currentScrollY = window.scrollY;

  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }

  if (window.scrollX !== currentScrollX || window.scrollY !== currentScrollY) {
    window.scrollTo(currentScrollX, currentScrollY);
  }
}

export function MainHeader() {
  const pathname = usePathname();

  const mobileMenuId = useId();
  const drawerTitleId = useId();
  const drawerSearchId = useId();
  const drawerFilterLabelId = useId();
  const drawerFilterMenuId = useId();

  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerPanelRef = useRef<HTMLElement>(null);
  const drawerFilterRef = useRef<HTMLDivElement>(null);

  const isClient = useSyncExternalStore(
    subscribeToClientStore,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerFilterOpen, setIsDrawerFilterOpen] = useState(false);
  const [drawerSearchQuery, setDrawerSearchQuery] = useState("");
  const [drawerFilter, setDrawerFilter] =
    useState<DrawerFilterOption["value"]>("all");

  const filteredDrawerItems = useMemo(() => {
    const normalizedQuery = normalizeText(drawerSearchQuery);

    return drawerShopItems.filter((item) => {
      const isTypeMatched =
        drawerFilter === "all" ? true : item.type === drawerFilter;

      if (!isTypeMatched) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = normalizeText(
        [item.label, item.description, ...item.keywords].join(" "),
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [drawerFilter, drawerSearchQuery]);

  const selectedDrawerFilter = useMemo(() => {
    return (
      drawerFilterOptions.find((option) => option.value === drawerFilter) ??
      drawerFilterOptions[0]
    );
  }, [drawerFilter]);

  const resultText =
    filteredDrawerItems.length === 1
      ? "1 item found"
      : `${filteredDrawerItems.length} items found`;

  const closeDrawerFilter = useCallback(() => {
    setIsDrawerFilterOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsDrawerFilterOpen(false);
    setDrawerSearchQuery("");
    setDrawerFilter("all");
  }, []);

  const closeMobileMenuAndFocusTrigger = useCallback(() => {
    closeMobileMenu();

    window.requestAnimationFrame(() => {
      focusElementWithoutScrolling(mobileMenuTriggerRef.current);
    });
  }, [closeMobileMenu]);

  const handleMobileMenuTriggerClick = useCallback(() => {
    setIsMobileMenuOpen((currentValue) => {
      const nextValue = !currentValue;

      if (!nextValue) {
        setIsDrawerFilterOpen(false);
        setDrawerSearchQuery("");
        setDrawerFilter("all");
      }

      return nextValue;
    });
  }, []);

  const handleDrawerFilterTriggerClick = useCallback(() => {
    setIsDrawerFilterOpen((currentValue) => !currentValue);
  }, []);

  const handleDrawerFilterChange = useCallback(
    (value: DrawerFilterOption["value"]) => {
      setDrawerFilter(value);
      setIsDrawerFilterOpen(false);
    },
    [],
  );

  const clearDrawerSearch = useCallback(() => {
    setDrawerSearchQuery("");
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscrollBehavior =
      document.documentElement.style.overscrollBehavior;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      document.body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      focusElementWithoutScrolling(mobileDrawerPanelRef.current);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isDrawerFilterOpen) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!drawerFilterRef.current?.contains(target)) {
        closeDrawerFilter();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (isDrawerFilterOpen) {
          closeDrawerFilter();
          return;
        }

        closeMobileMenuAndFocusTrigger();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = mobileDrawerPanelRef.current;

      if (!panel) {
        return;
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
          ].join(", "),
        ),
      );

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    const handleResize = () => {
      if (window.matchMedia("(min-width: 901px)").matches) {
        closeMobileMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    closeDrawerFilter,
    closeMobileMenu,
    closeMobileMenuAndFocusTrigger,
    isDrawerFilterOpen,
    isMobileMenuOpen,
  ]);

  const mobileDrawer = isMobileMenuOpen ? (
    <div
      id={mobileMenuId}
      className="gb-shop-mobile-drawer"
      aria-labelledby={drawerTitleId}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="gb-shop-mobile-drawer__backdrop"
        aria-label="Close mobile category sidebar"
        tabIndex={-1}
        onClick={closeMobileMenu}
      />

      <aside
        ref={mobileDrawerPanelRef}
        className="gb-shop-mobile-drawer__panel"
        tabIndex={-1}
      >
        <div className="gb-shop-mobile-drawer__header">
          <SiteLogo compact />

          <div className="gb-shop-mobile-drawer__header-actions">
            <Link
              href="/language"
              className="gb-shop-mobile-drawer__language"
              aria-label="Change language between English and Bengali"
              onClick={closeMobileMenu}
            >
              EN <span aria-hidden="true">|</span> বাংলা
            </Link>

            <button
              type="button"
              className="gb-shop-mobile-drawer__close"
              aria-label="Close mobile category sidebar"
              onClick={closeMobileMenu}
            >
              <X aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>

        <h2 id={drawerTitleId} className="gb-sr-only">
          Shop categories
        </h2>

        <div className="gb-shop-mobile-drawer__search-wrap">
          <div className="gb-shop-mobile-drawer__search-row">
            <label htmlFor={drawerSearchId} className="gb-sr-only">
              Search categories
            </label>

            <div className="gb-shop-mobile-drawer__search">
              <Search aria-hidden="true" focusable="false" />

              <input
                id={drawerSearchId}
                type="search"
                inputMode="search"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Search categories..."
                value={drawerSearchQuery}
                onChange={(event) => setDrawerSearchQuery(event.target.value)}
              />

              {drawerSearchQuery ? (
                <button
                  type="button"
                  aria-label="Clear category search"
                  onClick={clearDrawerSearch}
                >
                  <X aria-hidden="true" focusable="false" />
                </button>
              ) : null}
            </div>

            <div
              ref={drawerFilterRef}
              className="gb-shop-mobile-drawer__filter-control"
            >
              <button
                type="button"
                className="gb-shop-mobile-drawer__filter"
                aria-labelledby={drawerFilterLabelId}
                aria-expanded={isDrawerFilterOpen}
                aria-controls={drawerFilterMenuId}
                aria-haspopup="menu"
                onClick={handleDrawerFilterTriggerClick}
              >
                <span
                  id={drawerFilterLabelId}
                  className="gb-shop-mobile-drawer__filter-label"
                >
                  {selectedDrawerFilter.label}
                </span>

                <ChevronDown
                  aria-hidden="true"
                  focusable="false"
                  className="gb-shop-mobile-drawer__filter-icon"
                />
              </button>

              {isDrawerFilterOpen ? (
                <div
                  id={drawerFilterMenuId}
                  className="gb-shop-mobile-drawer__filter-menu"
                  role="menu"
                  aria-label="Choose category filter"
                >
                  {drawerFilterOptions.map((option) => {
                    const isSelected = option.value === drawerFilter;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isSelected}
                        className={
                          isSelected
                            ? "gb-shop-mobile-drawer__filter-menu-item gb-shop-mobile-drawer__filter-menu-item--active"
                            : "gb-shop-mobile-drawer__filter-menu-item"
                        }
                        onClick={() => handleDrawerFilterChange(option.value)}
                      >
                        <span>{option.label}</span>

                        {isSelected ? (
                          <span aria-hidden="true">✓</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="gb-shop-mobile-drawer__filter-tabs"
            role="group"
            aria-label="Filter category list"
          >
            {drawerFilterOptions.map((option) => {
              const isSelected = option.value === drawerFilter;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={
                    isSelected
                      ? "gb-shop-mobile-drawer__filter-tab gb-shop-mobile-drawer__filter-tab--active"
                      : "gb-shop-mobile-drawer__filter-tab"
                  }
                  aria-pressed={isSelected}
                  onClick={() => handleDrawerFilterChange(option.value)}
                >
                  {option.shortLabel}
                </button>
              );
            })}
          </div>

          <p className="gb-shop-mobile-drawer__result-text">{resultText}</p>
        </div>

        <nav
          className="gb-shop-mobile-drawer__body"
          aria-label="Mobile category navigation"
        >
          <section
            className="gb-shop-mobile-drawer__section"
            aria-label="Shop categories"
          >
            <div className="gb-shop-mobile-drawer__section-header">
              <p className="gb-shop-mobile-drawer__eyebrow">
                Shop Categories
              </p>

              <Link
                href="/categories"
                className="gb-shop-mobile-drawer__view-link"
                onClick={closeMobileMenu}
              >
                View all
              </Link>
            </div>

            {filteredDrawerItems.length > 0 ? (
              <div className="gb-shop-mobile-drawer__category-list">
                {filteredDrawerItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        isActive
                          ? "gb-shop-mobile-drawer__category-item gb-shop-mobile-drawer__category-item--active"
                          : "gb-shop-mobile-drawer__category-item"
                      }
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMobileMenu}
                    >
                      <span
                        className="gb-shop-mobile-drawer__item-icon"
                        aria-hidden="true"
                      >
                        <Icon aria-hidden="true" focusable="false" />
                      </span>

                      <span className="gb-shop-mobile-drawer__item-content">
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>

                      {item.badge ? (
                        <span className="gb-shop-mobile-drawer__badge">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight aria-hidden="true" focusable="false" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="gb-shop-mobile-drawer__empty">
                <strong>No category found</strong>
                <span>Try honey, oil, dates, spices or rice.</span>
              </div>
            )}
          </section>

          <section className="gb-shop-mobile-drawer__section">
            <div className="gb-shop-mobile-drawer__info-grid">
              <Link
                href="/quality"
                className="gb-shop-mobile-drawer__trust-card"
                onClick={closeMobileMenu}
              >
                <span aria-hidden="true">
                  <ShieldCheck aria-hidden="true" focusable="false" />
                </span>

                <span>
                  <strong>100% Natural & Authentic</strong>
                  <small>Carefully sourced products for your family.</small>
                </span>

                <ChevronRight aria-hidden="true" focusable="false" />
              </Link>

              <Link
                href="/help-center"
                className="gb-shop-mobile-drawer__help-card"
                onClick={closeMobileMenu}
              >
                <span aria-hidden="true">
                  <Headphones aria-hidden="true" focusable="false" />
                </span>

                <span>
                  <strong>Need help?</strong>
                  <small>We are here to support your shopping.</small>
                </span>

                <ChevronRight aria-hidden="true" focusable="false" />
              </Link>
            </div>
          </section>
        </nav>

        <div className="gb-shop-mobile-drawer__footer">
          <div className="gb-shop-mobile-drawer__footer-actions">
            <Link
              href="/categories"
              className="gb-shop-mobile-drawer__primary-action"
              onClick={closeMobileMenu}
            >
              <Grid3X3 aria-hidden="true" focusable="false" />
              <span>View All Categories</span>
            </Link>

            <Link
              href={cartPreview.href}
              className="gb-shop-mobile-drawer__cart-action"
              aria-label={`Open cart, ${cartPreview.itemCount} items, subtotal ${cartPreview.subtotal}`}
              onClick={closeMobileMenu}
            >
              <ShoppingCart aria-hidden="true" focusable="false" />

              <span>
                <strong>Cart ({cartPreview.itemCount})</strong>
                <small>{cartPreview.subtotal}</small>
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <div className="gb-shop-main-header" aria-label="Main site header">
      <div className="gb-shop-header-container gb-shop-main-header__inner">
        <div className="gb-shop-mobile-menu">
          <button
            ref={mobileMenuTriggerRef}
            type="button"
            className="gb-shop-icon-button gb-shop-mobile-menu__trigger"
            aria-label={
              isMobileMenuOpen
                ? "Close mobile category sidebar"
                : "Open mobile category sidebar"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            onClick={handleMobileMenuTriggerClick}
          >
            <span className="gb-sr-only">
              {isMobileMenuOpen
                ? "Close mobile category sidebar"
                : "Open mobile category sidebar"}
            </span>

            {isMobileMenuOpen ? (
              <X
                aria-hidden="true"
                focusable="false"
                className="gb-shop-mobile-menu__close-icon"
              />
            ) : (
              <Menu
                aria-hidden="true"
                focusable="false"
                className="gb-shop-mobile-menu__open-icon"
              />
            )}
          </button>
        </div>

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

      {isClient && mobileDrawer ? createPortal(mobileDrawer, document.body) : null}
    </div>
  );
}