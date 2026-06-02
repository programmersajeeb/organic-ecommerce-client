import {
  BadgeCheck,
  CircleHelp,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import type {
  CategoryNavItem,
  MobileMenuItem,
  TopBarItem,
} from "@/types/navigation";

export const topBarLeftItems: TopBarItem[] = [
  {
    label: "Free delivery on orders over ৳2,000",
    href: "/offers/free-delivery",
    icon: PackageCheck,
  },
  {
    label: "100% Natural & Authentic Products",
    href: "/quality",
    icon: BadgeCheck,
  },
  {
    label: "Secure Payments",
    href: "/payment-security",
    icon: ShieldCheck,
  },
  {
    label: "Easy Returns",
    href: "/returns",
    icon: RefreshCcw,
  },
];

export const topBarRightItems: TopBarItem[] = [
  {
    label: "Track Order",
    href: "/track-order",
    icon: PackageCheck,
  },
  {
    label: "Help Center",
    href: "/help-center",
    icon: CircleHelp,
  },
];

export const categoryNavItems: CategoryNavItem[] = [
  {
    label: "Eid 2026",
    href: "/collections/eid-2026",
  },
  {
    label: "Offer Zone",
    href: "/offers",
  },
  {
    label: "Mango Pre-Order",
    href: "/collections/mango-pre-order",
    isHighlighted: true,
  },
  {
    label: "Honey",
    href: "/categories/honey",
  },
  {
    label: "Oil & Ghee",
    href: "/categories/oil-and-ghee",
  },
  {
    label: "Dates",
    href: "/categories/dates",
  },
  {
    label: "Spices",
    href: "/categories/spices",
  },
  {
    label: "Rice & Lentils",
    href: "/categories/rice-and-lentils",
  },
];

export const mobileMenuItems: MobileMenuItem[] = [
  {
    label: "Shop by Category",
    href: "/categories",
  },
  {
    label: "Eid 2026",
    href: "/collections/eid-2026",
  },
  {
    label: "Offer Zone",
    href: "/offers",
  },
  {
    label: "Mango Pre-Order",
    href: "/collections/mango-pre-order",
  },
  {
    label: "Honey",
    href: "/categories/honey",
  },
  {
    label: "Oil & Ghee",
    href: "/categories/oil-and-ghee",
  },
  {
    label: "Dates",
    href: "/categories/dates",
  },
  {
    label: "Spices",
    href: "/categories/spices",
  },
  {
    label: "Rice & Lentils",
    href: "/categories/rice-and-lentils",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Track Order",
    href: "/track-order",
  },
];