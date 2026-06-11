import {
  Headphones,
  Headset,
  Home,
  Monitor,
  RotateCcw,
  ShoppingBag,
  Truck,
  Watch,
} from "lucide-react";

import type {
  NotFoundAction,
  NotFoundCategory,
  NotFoundHelpItem,
} from "./not-found.types";

export const notFoundPrimaryActions = [
  {
    href: "/",
    label: "Back to Home",
    icon: Home,
  },
  {
    href: "/",
    label: "Continue Shopping",
    icon: ShoppingBag,
  },
] as const satisfies readonly NotFoundAction[];

export const notFoundPopularCategories = [
  {
    href: "/?category=electronics",
    label: "Electronics",
    icon: Monitor,
  },
  {
    href: "/?category=headphones",
    label: "Headphones",
    icon: Headphones,
  },
  {
    href: "/?category=smart-watch",
    label: "Smart Watch",
    icon: Watch,
  },
  {
    href: "/?category=home-kitchen",
    label: "Home & Kitchen",
    icon: Home,
  },
  {
    href: "/?category=bags-luggage",
    label: "Bags & Luggage",
    icon: ShoppingBag,
  },
] as const satisfies readonly NotFoundCategory[];

export const notFoundHelpItems = [
  {
    title: "Need Help?",
    description: "Our support team is here to assist you.",
    icon: Headset,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days.",
    icon: RotateCcw,
  },
  {
    title: "Fast & Free Delivery",
    description: "Free delivery on orders over $39.",
    icon: Truck,
  },
] as const satisfies readonly NotFoundHelpItem[];