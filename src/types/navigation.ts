import type { LucideIcon } from "lucide-react";

export type TopBarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type HeaderActionItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  subLabel?: string;
  badge?: string;
};

export type CategoryNavItem = {
  label: string;
  href: string;
  isHighlighted?: boolean;
};

export type MobileMenuItem = {
  label: string;
  href: string;
};