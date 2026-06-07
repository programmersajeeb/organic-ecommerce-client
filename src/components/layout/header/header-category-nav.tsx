"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent } from "react";

import { HeaderIcon } from "./header-icons";
import type {
  HeaderCategory,
  HeaderPanel,
  HeaderPanelKey,
} from "./header.types";

type HeaderCategoriesTriggerProps = Readonly<{
  activePanel: HeaderPanel;
  categoriesMenuId: string;
  primaryCategories: readonly HeaderCategory[];
  moreCategories: readonly HeaderCategory[];
  onCloseAll: () => void;
  onTogglePanel: (panel: HeaderPanelKey) => void;
}>;

type HeaderCategoryNavProps = Readonly<{
  activePanel: HeaderPanel;
  moreMenuId: string;
  primaryCategories: readonly HeaderCategory[];
  moreCategories: readonly HeaderCategory[];
  onCloseAll: () => void;
  onTogglePanel: (panel: HeaderPanelKey) => void;
}>;

type CategoryMenuProps = Readonly<{
  id: string;
  label: string;
  categories: readonly HeaderCategory[];
  pathname: string;
  onCloseAll: () => void;
}>;

const ROOT_PATHNAME = "/";

function normalizePathname(pathname: string) {
  if (pathname.length > ROOT_PATHNAME.length && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function isCategoryActive(pathname: string, href: string) {
  const currentPathname = normalizePathname(pathname);
  const categoryHref = normalizePathname(href);

  if (currentPathname === ROOT_PATHNAME || categoryHref === ROOT_PATHNAME) {
    return false;
  }

  return (
    currentPathname === categoryHref ||
    currentPathname.startsWith(`${categoryHref}/`)
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

function getActiveCategory(
  pathname: string,
  categories: readonly HeaderCategory[],
) {
  return categories.find((category) => isCategoryActive(pathname, category.href));
}

function getCategoryMenuItems(menu: HTMLElement) {
  return Array.from(
    menu.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'),
  );
}

function focusCategoryMenuItem(menu: HTMLElement, index: number) {
  const menuItems = getCategoryMenuItems(menu);
  const targetItem = menuItems[index];

  targetItem?.focus();
}

function handleCategoryMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  const menu = event.currentTarget;
  const menuItems = getCategoryMenuItems(menu);

  if (menuItems.length === 0) {
    return;
  }

  const activeElement = document.activeElement;
  const currentIndex = menuItems.findIndex((item) => item === activeElement);

  if (event.key === "Home") {
    event.preventDefault();
    focusCategoryMenuItem(menu, 0);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    focusCategoryMenuItem(menu, menuItems.length - 1);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    const nextIndex =
      currentIndex >= 0 ? (currentIndex + 1) % menuItems.length : 0;

    focusCategoryMenuItem(menu, nextIndex);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    const nextIndex =
      currentIndex >= 0
        ? (currentIndex - 1 + menuItems.length) % menuItems.length
        : menuItems.length - 1;

    focusCategoryMenuItem(menu, nextIndex);
  }
}

function CategoryMenu({
  categories,
  id,
  label,
  onCloseAll,
  pathname,
}: CategoryMenuProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      className="gb-site-header__language-menu gb-site-header__category-menu"
      role="menu"
      aria-label={label}
      onKeyDown={handleCategoryMenuKeyDown}
    >
      {categories.map((category) => {
        const isActive = isCategoryActive(pathname, category.href);

        return (
          <Link
            key={category.id}
            className="gb-site-header__language-option gb-site-header__category-menu-option"
            href={category.href}
            role="menuitem"
            aria-current={isActive ? "page" : undefined}
            aria-label={category.name}
            data-active={isActive ? "true" : undefined}
            onClick={onCloseAll}
          >
            <HeaderIcon name={category.icon} />
            <span>{category.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function HeaderCategoriesTrigger({
  activePanel,
  categoriesMenuId,
  moreCategories,
  onCloseAll,
  onTogglePanel,
  primaryCategories,
}: HeaderCategoriesTriggerProps) {
  const pathname = usePathname();
  const allCategories = getMergedCategories(primaryCategories, moreCategories);
  const activeCategory = getActiveCategory(pathname, allCategories);
  const isCategoriesMenuOpen = activePanel === "categories";
  const hasCategories = allCategories.length > 0;

  if (!hasCategories) {
    return null;
  }

  return (
    <div className="gb-site-header__language gb-site-header__categories">
      <button
        type="button"
        className="gb-site-header__categories-trigger"
        aria-label={
          activeCategory
            ? `Browse product categories, current category is ${activeCategory.name}`
            : "Browse product categories"
        }
        aria-expanded={isCategoriesMenuOpen}
        aria-controls={categoriesMenuId}
        aria-haspopup="menu"
        data-active={
          isCategoriesMenuOpen || activeCategory ? "true" : undefined
        }
        data-state={isCategoriesMenuOpen ? "open" : "closed"}
        onClick={() => onTogglePanel("categories")}
      >
        <HeaderIcon name="menu" />
        <span>Categories</span>
        <HeaderIcon name="chevronDown" />
      </button>

      {isCategoriesMenuOpen ? (
        <CategoryMenu
          id={categoriesMenuId}
          label="All product categories"
          categories={allCategories}
          pathname={pathname}
          onCloseAll={onCloseAll}
        />
      ) : null}
    </div>
  );
}

export function HeaderCategoryNav({
  activePanel,
  moreCategories,
  moreMenuId,
  onCloseAll,
  onTogglePanel,
  primaryCategories,
}: HeaderCategoryNavProps) {
  const pathname = usePathname();

  const isMoreMenuOpen = activePanel === "more";
  const hasPrimaryCategories = primaryCategories.length > 0;
  const hasMoreCategories = moreCategories.length > 0;
  const activeMoreCategory = getActiveCategory(pathname, moreCategories);

  if (!hasPrimaryCategories && !hasMoreCategories) {
    return null;
  }

  return (
    <nav className="gb-site-header__nav" aria-label="Product categories">
      <div className="gb-container-wide gb-site-header__nav-inner">
        {hasPrimaryCategories ? (
          <div className="gb-site-header__category-list">
            {primaryCategories.map((category) => {
              const isActive = isCategoryActive(pathname, category.href);

              return (
                <Link
                  key={category.id}
                  className="gb-site-header__category-link"
                  href={category.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={category.name}
                  data-active={isActive ? "true" : undefined}
                  onClick={onCloseAll}
                >
                  <HeaderIcon name={category.icon} />
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        ) : null}

        {hasMoreCategories ? (
          <div className="gb-site-header__language gb-site-header__more">
            <button
              type="button"
              className="gb-site-header__more-trigger"
              aria-label={
                activeMoreCategory
                  ? `Open more categories, current category is ${activeMoreCategory.name}`
                  : "Open more categories"
              }
              aria-expanded={isMoreMenuOpen}
              aria-controls={moreMenuId}
              aria-haspopup="menu"
              data-active={
                isMoreMenuOpen || activeMoreCategory ? "true" : undefined
              }
              data-state={isMoreMenuOpen ? "open" : "closed"}
              onClick={() => onTogglePanel("more")}
            >
              <span>More</span>
              <HeaderIcon name="chevronDown" />
            </button>

            {isMoreMenuOpen ? (
              <CategoryMenu
                id={moreMenuId}
                label="More product categories"
                categories={moreCategories}
                pathname={pathname}
                onCloseAll={onCloseAll}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </nav>
  );
}