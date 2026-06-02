"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Heart,
  HelpCircle,
  LogIn,
  MapPin,
  Moon,
  PackageSearch,
  Sun,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { MouseEvent } from "react";

type AccountMenuProps = {
  variant?: "desktop" | "mobile";
};

type AccountMenuItem = Readonly<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}>;

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const accountPreview = {
  isAuthenticated: false,
  userName: "Guest",
};

const authenticatedMenuItems: AccountMenuItem[] = [
  {
    title: "My Account",
    description: "Manage your profile",
    href: "/account",
    icon: UserRound,
  },
  {
    title: "My Orders",
    description: "View and track your orders",
    href: "/orders",
    icon: PackageSearch,
  },
  {
    title: "Wishlist",
    description: "View your saved items",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Addresses",
    description: "Manage delivery addresses",
    href: "/addresses",
    icon: MapPin,
  },
];

const guestMenuItems: AccountMenuItem[] = [
  {
    title: "Sign in / Create account",
    description: "Access orders, wishlist and offers",
    href: "/account/login",
    icon: LogIn,
  },
  {
    title: "Track Order",
    description: "Check your recent order status",
    href: "/track-order",
    icon: PackageSearch,
  },
  {
    title: "Help Center",
    description: "Get help and support",
    href: "/help-center",
    icon: HelpCircle,
  },
];

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

function isMenuItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getAccountMenuItemClassName(isActive: boolean) {
  return isActive
    ? "gb-shop-account-menu__item gb-shop-account-menu__item--active"
    : "gb-shop-account-menu__item";
}

export function AccountMenu({ variant = "desktop" }: AccountMenuProps) {
  const pathname = usePathname();
  const menuId = useId();
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const menuRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isDark = isMounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const themeLabel = isDark ? "Dark Mode" : "Light Mode";

  const menuItems = accountPreview.isAuthenticated
    ? authenticatedMenuItems
    : guestMenuItems;

  const rootClassName =
    variant === "mobile"
      ? "gb-shop-account-menu gb-shop-account-menu--mobile"
      : "gb-shop-account-menu";

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeMenuAndFocusTrigger = useCallback(() => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const handleTriggerClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setIsOpen((currentValue) => !currentValue);
    },
    [],
  );

  const handleThemeChange = useCallback(() => {
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!menuRef.current?.contains(target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      closeMenuAndFocusTrigger();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, closeMenuAndFocusTrigger, isOpen]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  return (
    <details ref={menuRef} className={rootClassName} open={isOpen}>
      <summary
        ref={triggerRef}
        className="gb-shop-account-menu__trigger"
        aria-label={isOpen ? "Close account menu" : "Open account menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={handleTriggerClick}
      >
        <span className="gb-shop-account-menu__trigger-icon" aria-hidden="true">
          <UserRound aria-hidden="true" focusable="false" />
        </span>

        <span className="gb-shop-account-menu__trigger-content">
          <span className="gb-shop-account-menu__trigger-label">Account</span>
          <span className="gb-shop-account-menu__trigger-sub-label">
            {accountPreview.isAuthenticated
              ? accountPreview.userName
              : "Login / Sign up"}
          </span>
        </span>

        <ChevronDown
          aria-hidden="true"
          focusable="false"
          className="gb-shop-account-menu__chevron"
        />
      </summary>

      <div
        id={menuId}
        className="gb-shop-account-menu__dropdown"
        aria-label="Account menu"
        role="menu"
      >
        <div className="gb-shop-account-menu__panel">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={getAccountMenuItemClassName(isActive)}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <Icon aria-hidden="true" focusable="false" />
                </span>

                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    {item.title}
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    {item.description}
                  </span>
                </span>

                {isActive ? (
                  <span className="gb-sr-only">Current page</span>
                ) : null}
              </Link>
            );
          })}

          <div className="gb-shop-account-menu__divider" role="separator" />

          <button
            type="button"
            className="gb-shop-account-menu__theme"
            role="menuitem"
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={isDark}
            disabled={!isMounted}
            onClick={handleThemeChange}
          >
            <span className="gb-shop-account-menu__item-icon">
              {isDark ? (
                <Moon aria-hidden="true" focusable="false" />
              ) : (
                <Sun aria-hidden="true" focusable="false" />
              )}
            </span>

            <span className="gb-shop-account-menu__item-content">
              <span className="gb-shop-account-menu__item-title">
                {themeLabel}
              </span>
              <span className="gb-shop-account-menu__item-text">
                Tap to switch to {nextTheme}
              </span>
            </span>

            <span className="gb-shop-account-menu__switch" aria-hidden="true">
              <span className="gb-shop-account-menu__switch-thumb" />
            </span>
          </button>
        </div>
      </div>
    </details>
  );
}