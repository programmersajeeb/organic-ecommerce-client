"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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

export function ThemeToggle() {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = isMounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      className="gb-shop-icon-button"
      disabled={!isMounted}
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? (
        <Sun aria-hidden="true" focusable="false" />
      ) : (
        <Moon aria-hidden="true" focusable="false" />
      )}
    </button>
  );
}