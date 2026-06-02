"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Apple,
  ChevronDown,
  ChevronRight,
  Droplet,
  Leaf,
  Menu,
  MoreHorizontal,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wheat,
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

import { categoryNavItems } from "@/constants/navigation";

type CategoryMenuItem = Readonly<{
  label: string;
  href: string;
}>;

type CategoryMenuGroup = Readonly<{
  title: string;
  href: string;
  items: ReadonlyArray<CategoryMenuItem>;
}>;

type CategoryFeaturedLink = Readonly<{
  label: string;
  href: string;
  icon: LucideIcon;
}>;

type CategoryPromotion = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}>;

type CategoryMenu = Readonly<{
  key: string;
  label: string;
  shortLabel: string;
  href: string;
  description: string;
  icon: LucideIcon;
  groups: ReadonlyArray<CategoryMenuGroup>;
  featuredLinks: ReadonlyArray<CategoryFeaturedLink>;
  promotion: CategoryPromotion;
}>;

type CategorySearchResult = Readonly<{
  id: string;
  label: string;
  href: string;
  eyebrow: string;
  icon: LucideIcon;
}>;

const DEFAULT_CATEGORY_KEY = "honey";

const categoryMenus: CategoryMenu[] = [
  {
    key: "honey",
    label: "Honey",
    shortLabel: "Honey",
    href: "/categories/honey",
    description: "Pure, raw and naturally sourced honey collections.",
    icon: Package,
    promotion: {
      eyebrow: "Featured Honey",
      title: "Pure forest honey for daily wellness",
      description: "Raw, natural and carefully sourced from trusted beekeepers.",
      ctaLabel: "Shop Honey",
      href: "/categories/honey",
    },
    groups: [
      {
        title: "Honey Types",
        href: "/categories/honey",
        items: [
          { label: "Raw Honey", href: "/categories/honey/raw-honey" },
          {
            label: "Mustard Flower Honey",
            href: "/categories/honey/mustard-flower",
          },
          { label: "Black Seed Honey", href: "/categories/honey/black-seed" },
          { label: "Forest Honey", href: "/categories/honey/forest-honey" },
        ],
      },
      {
        title: "Value Packs",
        href: "/categories/honey/value-packs",
        items: [
          { label: "Family Pack", href: "/categories/honey/family-pack" },
          { label: "Monthly Pack", href: "/categories/honey/monthly-pack" },
          { label: "Gift Pack", href: "/categories/honey/gift-pack" },
        ],
      },
      {
        title: "Popular Uses",
        href: "/categories/honey/uses",
        items: [
          { label: "For Breakfast", href: "/categories/honey/breakfast" },
          { label: "For Drinks", href: "/categories/honey/drinks" },
          { label: "For Wellness", href: "/categories/honey/wellness" },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Organic Honey",
        href: "/categories/honey/organic",
        icon: ShieldCheck,
      },
      {
        label: "New Arrivals",
        href: "/categories/honey/new-arrivals",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/honey/best-sellers",
        icon: Star,
      },
    ],
  },
  {
    key: "oil-and-ghee",
    label: "Oil & Ghee",
    shortLabel: "Oil",
    href: "/categories/oil-and-ghee",
    description: "Cold-pressed oils, pure ghee and kitchen essentials.",
    icon: Droplet,
    promotion: {
      eyebrow: "Kitchen Essentials",
      title: "Pure oil and ghee for healthy cooking",
      description: "Carefully selected essentials for everyday family meals.",
      ctaLabel: "Shop Oil & Ghee",
      href: "/categories/oil-and-ghee",
    },
    groups: [
      {
        title: "Cooking Oil",
        href: "/categories/oil-and-ghee/cooking-oil",
        items: [
          {
            label: "Mustard Oil",
            href: "/categories/oil-and-ghee/mustard-oil",
          },
          { label: "Olive Oil", href: "/categories/oil-and-ghee/olive-oil" },
          {
            label: "Coconut Oil",
            href: "/categories/oil-and-ghee/coconut-oil",
          },
          {
            label: "Sesame Oil",
            href: "/categories/oil-and-ghee/sesame-oil",
          },
        ],
      },
      {
        title: "Ghee",
        href: "/categories/oil-and-ghee/ghee",
        items: [
          { label: "Cow Ghee", href: "/categories/oil-and-ghee/cow-ghee" },
          {
            label: "Traditional Ghee",
            href: "/categories/oil-and-ghee/traditional-ghee",
          },
          {
            label: "Premium Ghee",
            href: "/categories/oil-and-ghee/premium-ghee",
          },
        ],
      },
      {
        title: "Special Picks",
        href: "/categories/oil-and-ghee/special-picks",
        items: [
          {
            label: "Cold Pressed",
            href: "/categories/oil-and-ghee/cold-pressed",
          },
          {
            label: "Family Pack",
            href: "/categories/oil-and-ghee/family-pack",
          },
          {
            label: "Organic Picks",
            href: "/categories/oil-and-ghee/organic",
          },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Cold Pressed",
        href: "/categories/oil-and-ghee/cold-pressed",
        icon: ShieldCheck,
      },
      {
        label: "New Arrivals",
        href: "/categories/oil-and-ghee/new-arrivals",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/oil-and-ghee/best-sellers",
        icon: Star,
      },
    ],
  },
  {
    key: "dates",
    label: "Dates",
    shortLabel: "Dates",
    href: "/categories/dates",
    description: "Premium dates, gift packs and family value packs.",
    icon: Sparkles,
    promotion: {
      eyebrow: "Premium Dates",
      title: "Naturally sweet and premium quality dates",
      description: "Perfect for daily nutrition, gifting and family sharing.",
      ctaLabel: "Shop Dates",
      href: "/categories/dates",
    },
    groups: [
      {
        title: "Popular Dates",
        href: "/categories/dates",
        items: [
          { label: "Ajwa Dates", href: "/categories/dates/ajwa" },
          { label: "Medjool Dates", href: "/categories/dates/medjool" },
          { label: "Mabroom Dates", href: "/categories/dates/mabroom" },
          { label: "Sukkari Dates", href: "/categories/dates/sukkari" },
        ],
      },
      {
        title: "Pack Sizes",
        href: "/categories/dates/pack-sizes",
        items: [
          { label: "250g Pack", href: "/categories/dates/250g" },
          { label: "500g Pack", href: "/categories/dates/500g" },
          { label: "1kg Pack", href: "/categories/dates/1kg" },
        ],
      },
      {
        title: "Occasions",
        href: "/categories/dates/occasions",
        items: [
          { label: "Gift Box", href: "/categories/dates/gift-box" },
          { label: "Ramadan Picks", href: "/categories/dates/ramadan" },
          {
            label: "Family Bundle",
            href: "/categories/dates/family-bundle",
          },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Premium Dates",
        href: "/categories/dates/premium",
        icon: ShieldCheck,
      },
      {
        label: "Gift Packs",
        href: "/categories/dates/gift-pack",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/dates/best-sellers",
        icon: Star,
      },
    ],
  },
  {
    key: "spices",
    label: "Spices",
    shortLabel: "Spices",
    href: "/categories/spices",
    description: "Fresh spices, whole spices and ready spice mixes.",
    icon: Leaf,
    promotion: {
      eyebrow: "Fresh Spices",
      title: "Perfect touch of natural flavor",
      description: "Clean, aromatic and carefully packed spices for your kitchen.",
      ctaLabel: "Shop Spices",
      href: "/categories/spices",
    },
    groups: [
      {
        title: "Ground Spices",
        href: "/categories/spices/ground",
        items: [
          {
            label: "Turmeric Powder",
            href: "/categories/spices/turmeric-powder",
          },
          { label: "Chili Powder", href: "/categories/spices/chili-powder" },
          { label: "Cumin Powder", href: "/categories/spices/cumin-powder" },
          {
            label: "Coriander Powder",
            href: "/categories/spices/coriander-powder",
          },
          { label: "Garam Masala", href: "/categories/spices/garam-masala" },
        ],
      },
      {
        title: "Whole Spices",
        href: "/categories/spices/whole",
        items: [
          { label: "Bay Leaf", href: "/categories/spices/bay-leaf" },
          { label: "Cinnamon", href: "/categories/spices/cinnamon" },
          { label: "Cardamom", href: "/categories/spices/cardamom" },
          { label: "Cloves", href: "/categories/spices/cloves" },
          {
            label: "Black Pepper",
            href: "/categories/spices/black-pepper",
          },
        ],
      },
      {
        title: "Spice Mixes",
        href: "/categories/spices/mixes",
        items: [
          {
            label: "Biryani Masala",
            href: "/categories/spices/biryani-masala",
          },
          {
            label: "Chaat Masala",
            href: "/categories/spices/chaat-masala",
          },
          {
            label: "Panch Phoron",
            href: "/categories/spices/panch-phoron",
          },
          { label: "Curry Masala", href: "/categories/spices/curry-masala" },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Organic Spices",
        href: "/categories/spices/organic",
        icon: ShieldCheck,
      },
      {
        label: "New Arrivals",
        href: "/categories/spices/new-arrivals",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/spices/best-sellers",
        icon: Star,
      },
    ],
  },
  {
    key: "rice-and-lentils",
    label: "Rice & Lentils",
    shortLabel: "Rice",
    href: "/categories/rice-and-lentils",
    description: "Premium rice, lentils and daily pantry staples.",
    icon: Wheat,
    promotion: {
      eyebrow: "Daily Staples",
      title: "Clean pantry essentials for every family",
      description: "Premium rice and lentils selected for daily cooking.",
      ctaLabel: "Shop Rice & Lentils",
      href: "/categories/rice-and-lentils",
    },
    groups: [
      {
        title: "Rice",
        href: "/categories/rice-and-lentils/rice",
        items: [
          {
            label: "Basmati Rice",
            href: "/categories/rice-and-lentils/basmati-rice",
          },
          {
            label: "Chinigura Rice",
            href: "/categories/rice-and-lentils/chinigura-rice",
          },
          {
            label: "Miniket Rice",
            href: "/categories/rice-and-lentils/miniket-rice",
          },
          {
            label: "Atop Rice",
            href: "/categories/rice-and-lentils/atop-rice",
          },
        ],
      },
      {
        title: "Lentils",
        href: "/categories/rice-and-lentils/lentils",
        items: [
          {
            label: "Red Lentil",
            href: "/categories/rice-and-lentils/red-lentil",
          },
          { label: "Mung Dal", href: "/categories/rice-and-lentils/mung-dal" },
          {
            label: "Chickpea",
            href: "/categories/rice-and-lentils/chickpea",
          },
        ],
      },
      {
        title: "Value Packs",
        href: "/categories/rice-and-lentils/value-packs",
        items: [
          {
            label: "Family Pack",
            href: "/categories/rice-and-lentils/family-pack",
          },
          {
            label: "Monthly Grocery Pack",
            href: "/categories/rice-and-lentils/monthly-pack",
          },
          {
            label: "Combo Pack",
            href: "/categories/rice-and-lentils/combo-pack",
          },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Premium Staples",
        href: "/categories/rice-and-lentils/premium",
        icon: ShieldCheck,
      },
      {
        label: "Value Packs",
        href: "/categories/rice-and-lentils/value-packs",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/rice-and-lentils/best-sellers",
        icon: Star,
      },
    ],
  },
  {
    key: "fruits",
    label: "Fruits",
    shortLabel: "Fruits",
    href: "/categories/fruits",
    description: "Fresh seasonal fruits and organic fruit boxes.",
    icon: Apple,
    promotion: {
      eyebrow: "Fresh Fruits",
      title: "Seasonal fruits delivered fresh",
      description: "Carefully packed fruits for healthy daily nutrition.",
      ctaLabel: "Shop Fruits",
      href: "/categories/fruits",
    },
    groups: [
      {
        title: "Seasonal Fruits",
        href: "/categories/fruits/seasonal",
        items: [
          { label: "Mango", href: "/categories/fruits/mango" },
          { label: "Banana", href: "/categories/fruits/banana" },
          { label: "Apple", href: "/categories/fruits/apple" },
          { label: "Orange", href: "/categories/fruits/orange" },
        ],
      },
      {
        title: "Fruit Boxes",
        href: "/categories/fruits/boxes",
        items: [
          {
            label: "Family Fruit Box",
            href: "/categories/fruits/family-box",
          },
          {
            label: "Office Fruit Box",
            href: "/categories/fruits/office-box",
          },
          { label: "Gift Fruit Box", href: "/categories/fruits/gift-box" },
        ],
      },
      {
        title: "Organic Picks",
        href: "/categories/fruits/organic",
        items: [
          {
            label: "Organic Mango",
            href: "/categories/fruits/organic-mango",
          },
          {
            label: "Organic Banana",
            href: "/categories/fruits/organic-banana",
          },
          {
            label: "Organic Apple",
            href: "/categories/fruits/organic-apple",
          },
        ],
      },
    ],
    featuredLinks: [
      {
        label: "Organic Fruits",
        href: "/categories/fruits/organic",
        icon: ShieldCheck,
      },
      {
        label: "New Season",
        href: "/categories/fruits/new-season",
        icon: Sparkles,
      },
      {
        label: "Best Sellers",
        href: "/categories/fruits/best-sellers",
        icon: Star,
      },
    ],
  },
];

const categorySearchResults: CategorySearchResult[] = categoryMenus.flatMap(
  (category) => [
    {
      id: `category-${category.key}`,
      label: category.label,
      href: category.href,
      eyebrow: "Category",
      icon: category.icon,
    },
    ...category.groups.flatMap((group) => [
      {
        id: `group-${category.key}-${group.title}`,
        label: group.title,
        href: group.href,
        eyebrow: category.label,
        icon: category.icon,
      },
      ...group.items.map((item) => ({
        id: `item-${category.key}-${group.title}-${item.label}`,
        label: item.label,
        href: item.href,
        eyebrow: `${category.label} / ${group.title}`,
        icon: category.icon,
      })),
    ]),
    ...category.featuredLinks.map((item) => ({
      id: `featured-${category.key}-${item.label}`,
      label: item.label,
      href: item.href,
      eyebrow: `${category.label} / Featured`,
      icon: item.icon,
    })),
  ],
);

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim();
}

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function findCategoryByLabel(label: string) {
  const normalizedLabel = normalizeText(label);

  return categoryMenus.find((category) => {
    return (
      normalizeText(category.label) === normalizedLabel ||
      normalizeText(category.shortLabel) === normalizedLabel
    );
  });
}

function findCategoryByPathname(pathname: string) {
  return categoryMenus.find((category) => isLinkActive(pathname, category.href));
}

function getCategoryByKey(key: string) {
  return (
    categoryMenus.find((category) => category.key === key) ?? categoryMenus[0]
  );
}

function getFilteredSearchResults(query: string) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  return categorySearchResults
    .filter((item) => {
      return normalizeText(`${item.label} ${item.eyebrow}`).includes(
        normalizedQuery,
      );
    })
    .slice(0, 12);
}

export function CategoryNavigation() {
  const pathname = usePathname();
  const desktopMenuId = useId();

  const navRef = useRef<HTMLElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);

  const routeCategory = findCategoryByPathname(pathname);
  const routeCategoryKey = routeCategory?.key ?? DEFAULT_CATEGORY_KEY;

  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [previewCategoryKey, setPreviewCategoryKey] = useState(routeCategoryKey);

  const activeDesktopCategory = getCategoryByKey(previewCategoryKey);

  const desktopSearchResults = useMemo(
    () => getFilteredSearchResults(desktopQuery),
    [desktopQuery],
  );

  const isDesktopSearching = normalizeText(desktopQuery).length > 0;

  const closeDesktopMenu = useCallback(() => {
    setIsDesktopMenuOpen(false);
    setDesktopQuery("");
  }, []);

  const openDesktopMenu = useCallback(() => {
    setPreviewCategoryKey(routeCategoryKey);
    setIsDesktopMenuOpen(true);
  }, [routeCategoryKey]);

  const toggleDesktopMenu = useCallback(() => {
    if (isDesktopMenuOpen) {
      closeDesktopMenu();
      return;
    }

    openDesktopMenu();
  }, [closeDesktopMenu, isDesktopMenuOpen, openDesktopMenu]);

  const handleDesktopCategoryPreview = useCallback((label: string) => {
    const category = findCategoryByLabel(label);

    if (category) {
      setPreviewCategoryKey(category.key);
    }
  }, []);

  useEffect(() => {
    if (!isDesktopMenuOpen) {
      setPreviewCategoryKey(routeCategoryKey);
    }
  }, [isDesktopMenuOpen, routeCategoryKey]);

  useEffect(() => {
    if (!isDesktopMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!navRef.current?.contains(target)) {
        closeDesktopMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      closeDesktopMenu();
      desktopTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDesktopMenu, isDesktopMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="gb-shop-category-nav"
      aria-label="Product categories"
    >
      <div className="gb-shop-header-container gb-shop-category-nav__inner">
        <button
          ref={desktopTriggerRef}
          type="button"
          className="gb-shop-category-nav__button"
          aria-label="Browse all product categories"
          aria-haspopup="true"
          aria-expanded={isDesktopMenuOpen}
          aria-controls={desktopMenuId}
          onClick={toggleDesktopMenu}
        >
          <Menu aria-hidden="true" focusable="false" />
          <span>Shop by Category</span>
          <ChevronDown aria-hidden="true" focusable="false" />
        </button>

        <div
          className="gb-shop-category-nav__items"
          aria-label="Featured product categories"
        >
          {categoryNavItems.map((item) => {
            const category = findCategoryByLabel(item.label);
            const Icon = category?.icon;
            const isActive = isLinkActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "gb-shop-category-nav__link gb-shop-category-nav__link--active"
                    : "gb-shop-category-nav__link"
                }
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => handleDesktopCategoryPreview(item.label)}
                onFocus={() => handleDesktopCategoryPreview(item.label)}
                onClick={closeDesktopMenu}
              >
                {Icon ? (
                  <Icon
                    className="gb-shop-category-nav__link-icon"
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : null}

                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            className={
              isDesktopMenuOpen
                ? "gb-shop-category-nav__link gb-shop-category-nav__more gb-shop-category-nav__link--active"
                : "gb-shop-category-nav__link gb-shop-category-nav__more"
            }
            aria-label="View more product categories"
            aria-haspopup="true"
            aria-expanded={isDesktopMenuOpen}
            aria-controls={desktopMenuId}
            onClick={toggleDesktopMenu}
          >
            <MoreHorizontal aria-hidden="true" focusable="false" />
            <span>More</span>
            <ChevronDown aria-hidden="true" focusable="false" />
          </button>
        </div>
      </div>

      {isDesktopMenuOpen ? (
        <div
          id={desktopMenuId}
          className="gb-shop-category-mega"
          role="region"
          aria-label="Expanded product categories"
        >
          <div className="gb-shop-header-container gb-shop-category-mega__inner">
            <div className="gb-shop-category-mega__aside">
              <label className="gb-shop-category-mega__search">
                <Search aria-hidden="true" focusable="false" />
                <span className="gb-sr-only">Search within categories</span>

                <input
                  type="search"
                  placeholder="Search inside categories..."
                  value={desktopQuery}
                  onChange={(event) => setDesktopQuery(event.target.value)}
                />
              </label>

              <div className="gb-shop-category-mega__promo">
                <span className="gb-shop-category-mega__promo-eyebrow">
                  {activeDesktopCategory.promotion.eyebrow}
                </span>

                <h3>{activeDesktopCategory.promotion.title}</h3>

                <p>{activeDesktopCategory.promotion.description}</p>

                <Link
                  href={activeDesktopCategory.promotion.href}
                  onClick={closeDesktopMenu}
                >
                  {activeDesktopCategory.promotion.ctaLabel}
                </Link>
              </div>
            </div>

            {isDesktopSearching ? (
              <div className="gb-shop-category-mega__search-results">
                <div className="gb-shop-category-mega__section-heading">
                  <span>Search results</span>
                  <small>{desktopSearchResults.length} found</small>
                </div>

                {desktopSearchResults.length > 0 ? (
                  <div className="gb-shop-category-mega__result-grid">
                    {desktopSearchResults.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="gb-shop-category-mega__result"
                          onClick={closeDesktopMenu}
                        >
                          <span className="gb-shop-category-mega__result-icon">
                            <Icon aria-hidden="true" focusable="false" />
                          </span>

                          <span>
                            <strong>{item.label}</strong>
                            <small>{item.eyebrow}</small>
                          </span>

                          <ChevronRight aria-hidden="true" focusable="false" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="gb-shop-category-mega__empty">
                    No category found. Try honey, dates, spices or rice.
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className="gb-shop-category-mega__rail"
                  aria-label="Category menu"
                >
                  {categoryMenus.map((category) => {
                    const Icon = category.icon;
                    const isActive = category.key === activeDesktopCategory.key;

                    return (
                      <button
                        key={category.key}
                        type="button"
                        className={
                          isActive
                            ? "gb-shop-category-mega__rail-item gb-shop-category-mega__rail-item--active"
                            : "gb-shop-category-mega__rail-item"
                        }
                        aria-pressed={isActive}
                        onMouseEnter={() => setPreviewCategoryKey(category.key)}
                        onFocus={() => setPreviewCategoryKey(category.key)}
                        onClick={() => setPreviewCategoryKey(category.key)}
                      >
                        <Icon aria-hidden="true" focusable="false" />

                        <span>
                          <strong>{category.label}</strong>
                          <small>{category.description}</small>
                        </span>

                        <ChevronRight aria-hidden="true" focusable="false" />
                      </button>
                    );
                  })}
                </div>

                <div className="gb-shop-category-mega__content">
                  {activeDesktopCategory.groups.map((group) => (
                    <div
                      key={group.title}
                      className="gb-shop-category-mega__group"
                    >
                      <div className="gb-shop-category-mega__group-header">
                        <h3>{group.title}</h3>

                        <Link href={group.href} onClick={closeDesktopMenu}>
                          View all
                        </Link>
                      </div>

                      <ul>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={closeDesktopMenu}>
                              <span>{item.label}</span>

                              <ChevronRight
                                aria-hidden="true"
                                focusable="false"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="gb-shop-category-mega__featured">
                    <h3>Featured</h3>

                    <div className="gb-shop-category-mega__featured-list">
                      {activeDesktopCategory.featuredLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeDesktopMenu}
                          >
                            <Icon aria-hidden="true" focusable="false" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="gb-shop-category-mega__trust-card">
                      <ShieldCheck aria-hidden="true" focusable="false" />

                      <span>
                        <strong>100% Natural</strong>
                        <small>Carefully sourced for your family.</small>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}