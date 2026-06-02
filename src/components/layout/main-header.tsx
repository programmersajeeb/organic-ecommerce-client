"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Apple,
  BadgePercent,
  CalendarDays,
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
} from "react";
import type { ChangeEvent, MouseEvent } from "react";

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
  value: "all" | DrawerItemType;
}>;

const drawerFilterOptions: DrawerFilterOption[] = [
  {
    label: "All Categories",
    value: "all",
  },
  {
    label: "Main Categories",
    value: "category",
  },
  {
    label: "Seasonal",
    value: "seasonal",
  },
  {
    label: "Offers",
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
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainHeader() {
  const pathname = usePathname();
  const mobileMenuId = useId();
  const drawerTitleId = useId();
  const drawerSearchId = useId();
  const drawerFilterId = useId();

  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerPanelRef = useRef<HTMLElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const resultText =
    filteredDrawerItems.length === 1
      ? "1 item found"
      : `${filteredDrawerItems.length} items found`;

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setDrawerSearchQuery("");
    setDrawerFilter("all");
  }, []);

  const closeMobileMenuAndFocusTrigger = useCallback(() => {
    setIsMobileMenuOpen(false);
    setDrawerSearchQuery("");
    setDrawerFilter("all");
    mobileMenuTriggerRef.current?.focus();
  }, []);

  const handleMobileMenuTriggerClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsMobileMenuOpen((currentValue) => !currentValue);
    },
    [],
  );

  const handleDrawerFilterChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setDrawerFilter(event.target.value as DrawerFilterOption["value"]);
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

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      mobileDrawerPanelRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
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
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMobileMenu, closeMobileMenuAndFocusTrigger, isMobileMenuOpen]);

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

      {isMobileMenuOpen ? (
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
                  onClick={closeMobileMenuAndFocusTrigger}
                >
                  <X aria-hidden="true" focusable="false" />
                </button>
              </div>
            </div>

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
                    onChange={(event) =>
                      setDrawerSearchQuery(event.target.value)
                    }
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

                <label htmlFor={drawerFilterId} className="gb-sr-only">
                  Filter category list
                </label>

                <div className="gb-shop-mobile-drawer__filter">
                  <select
                    id={drawerFilterId}
                    value={drawerFilter}
                    onChange={handleDrawerFilterChange}
                    aria-label="Filter category list"
                  >
                    {drawerFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronRight aria-hidden="true" focusable="false" />
                </div>
              </div>

              <p className="gb-shop-mobile-drawer__result-text">
                {resultText}
              </p>
            </div>

            <nav
              className="gb-shop-mobile-drawer__body"
              aria-label="Mobile category navigation"
            >
              <section
                className="gb-shop-mobile-drawer__section"
                aria-labelledby={drawerTitleId}
              >
                <div className="gb-shop-mobile-drawer__section-header">
                  <div>
                    <p className="gb-shop-mobile-drawer__eyebrow">
                      Shop Categories
                    </p>

                    <h2 id={drawerTitleId}>Browse Categories</h2>
                  </div>

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
                            <ChevronRight
                              aria-hidden="true"
                              focusable="false"
                            />
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
      ) : null}
    </div>
  );
}