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
    image: {
      src: "/images/errors/categories/electronics.png",
      alt: "Electronics category products",
      width: 320,
      height: 240,
    },
    ariaLabel: "Shop electronics products",
  },
  {
    href: "/?category=headphones",
    label: "Headphones",
    icon: Headphones,
    image: {
      src: "/images/errors/categories/headphones.png",
      alt: "Headphones category products",
      width: 320,
      height: 240,
    },
    ariaLabel: "Shop headphones",
  },
  {
    href: "/?category=smart-watch",
    label: "Smart Watch",
    icon: Watch,
    image: {
      src: "/images/errors/categories/smart-watch.png",
      alt: "Smart watch category products",
      width: 320,
      height: 240,
    },
    ariaLabel: "Shop smart watches",
  },
  {
    href: "/?category=home-kitchen",
    label: "Home & Kitchen",
    icon: Home,
    image: {
      src: "/images/errors/categories/home-kitchen.png",
      alt: "Home and kitchen category products",
      width: 320,
      height: 240,
    },
    ariaLabel: "Shop home and kitchen products",
  },
  {
    href: "/?category=bags-luggage",
    label: "Bags & Luggage",
    icon: ShoppingBag,
    image: {
      src: "/images/errors/categories/bags-luggage.png",
      alt: "Bags and luggage category products",
      width: 320,
      height: 240,
    },
    ariaLabel: "Shop bags and luggage",
  },
] as const satisfies readonly NotFoundCategory[];

export const notFoundHelpItems = [
  {
    title: "Need Help?",
    description: "Our support team is here to assist you.",
    icon: Headset,
    href: "/help-center",
    actionLabel: "Contact Support",
    ariaLabel: "Contact customer support",
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days.",
    icon: RotateCcw,
    href: "/help-center",
    actionLabel: "Learn More",
    ariaLabel: "Learn more about returns",
  },
  {
    title: "Fast & Free Delivery",
    description: "Free delivery on orders over $39.",
    icon: Truck,
    href: "/help-center",
    actionLabel: "Learn More",
    ariaLabel: "Learn more about delivery",
  },
] as const satisfies readonly NotFoundHelpItem[];