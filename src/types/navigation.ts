import type { LucideIcon } from "lucide-react";

export type TopBarItem = Readonly<{
  label: string;
  href: string;
  icon: LucideIcon;
}>;

export type CategoryNavItem = Readonly<{
  label: string;
  href: string;
  isHighlighted?: boolean;
}>;

export type MobileMenuItem = Readonly<{
  label: string;
  href: string;
}>;