"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { MouseEvent } from "react";
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
import { useTheme } from "next-themes";

type AccountMenuProps = {
  variant?: "desktop" | "mobile";
};

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

/**
 * Later this object can come from auth/session store.
 * For now, logged out state is used.
 * Important rule: Wishlist will only show after user is signed in.
 */
const accountPreview = {
  isAuthenticated: false,
  userName: "Guest",
};

export function AccountMenu({ variant = "desktop" }: AccountMenuProps) {
  const menuId = useId();
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const menuRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isDark = isMounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const themeLabel = isDark ? "Dark Mode" : "Light Mode";

  const rootClassName =
    variant === "mobile"
      ? "gb-shop-account-menu gb-shop-account-menu--mobile"
      : "gb-shop-account-menu";

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeMenuAndFocusTrigger = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
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
    closeMenu();
  }, [closeMenu, nextTheme, setTheme]);

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
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenuAndFocusTrigger();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, closeMenuAndFocusTrigger, isOpen]);

  return (
    <details ref={menuRef} className={rootClassName} open={isOpen}>
      <summary
        ref={triggerRef}
        className="gb-shop-account-menu__trigger"
        aria-label={isOpen ? "Close account menu" : "Open account menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
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

      <div id={menuId} className="gb-shop-account-menu__dropdown">
        <div className="gb-shop-account-menu__panel">
          {accountPreview.isAuthenticated ? (
            <>
              <Link
                href="/account"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <UserRound aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    My Account
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    Manage your profile
                  </span>
                </span>
              </Link>

              <Link
                href="/orders"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <PackageSearch aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    My Orders
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    View and track your orders
                  </span>
                </span>
              </Link>

              <Link
                href="/wishlist"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <Heart aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    Wishlist
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    View your saved items
                  </span>
                </span>
              </Link>

              <Link
                href="/addresses"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <MapPin aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    Addresses
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    Manage delivery addresses
                  </span>
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account/login"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <LogIn aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    Sign in / Create account
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    Access orders, wishlist and offers
                  </span>
                </span>
              </Link>

              <Link
                href="/track-order"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <PackageSearch aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    Track Order
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    Check your recent order status
                  </span>
                </span>
              </Link>

              <Link
                href="/help-center"
                className="gb-shop-account-menu__item"
                onClick={closeMenu}
              >
                <span className="gb-shop-account-menu__item-icon">
                  <HelpCircle aria-hidden="true" focusable="false" />
                </span>
                <span className="gb-shop-account-menu__item-content">
                  <span className="gb-shop-account-menu__item-title">
                    Help Center
                  </span>
                  <span className="gb-shop-account-menu__item-text">
                    Get help and support
                  </span>
                </span>
              </Link>
            </>
          )}

          <div className="gb-shop-account-menu__divider" role="separator" />

          <button
            type="button"
            className="gb-shop-account-menu__theme"
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