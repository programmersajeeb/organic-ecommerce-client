import type { HeaderSearchConfig, HeaderViewModel } from "./header.types";

export const headerData = {
  trustItems: [
    {
      id: "authentic-products",
      label: "100% Authentic Products",
      icon: "shield",
    },
    {
      id: "fast-delivery",
      label: "Fast Delivery",
      icon: "truck",
    },
    {
      id: "easy-returns",
      label: "Easy Returns",
      icon: "returns",
    },
    {
      id: "customer-support",
      label: "24/7 Customer Support",
      icon: "support",
      href: "/help-center",
    },
  ],

  utilityLinks: [
    {
      id: "track-order",
      label: "Track Order",
      href: "/track-order",
      icon: "track",
      ariaLabel: "Track your order",
    },
    {
      id: "help-center",
      label: "Help Center",
      href: "/help-center",
      icon: "help",
      ariaLabel: "Visit help center",
    },
  ],

  languageOptions: [
    {
      id: "en",
      label: "English",
      nativeLabel: "English",
    },
    {
      id: "bn",
      label: "Bangla",
      nativeLabel: "বাংলা",
    },
  ],

  primaryCategories: [
    {
      id: "mobile-accessories",
      name: "Mobile & Accessories",
      slug: "mobile-accessories",
      href: "/categories/mobile-accessories",
      icon: "mobile",
      isFeatured: true,
    },
    {
      id: "electronics",
      name: "Electronics",
      slug: "electronics",
      href: "/categories/electronics",
      icon: "computer",
      isFeatured: true,
    },
    {
      id: "computers-accessories",
      name: "Computers & Accessories",
      slug: "computers-accessories",
      href: "/categories/computers-accessories",
      icon: "laptop",
      isFeatured: true,
    },
    {
      id: "smart-watch",
      name: "Smart Watch",
      slug: "smart-watch",
      href: "/categories/smart-watch",
      icon: "watch",
      isFeatured: true,
    },
    {
      id: "headphone",
      name: "Headphone",
      slug: "headphone",
      href: "/categories/headphone",
      icon: "headphone",
      isFeatured: true,
    },
    {
      id: "camera-photo",
      name: "Camera & Photo",
      slug: "camera-photo",
      href: "/categories/camera-photo",
      icon: "camera",
      isFeatured: true,
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      slug: "home-kitchen",
      href: "/categories/home-kitchen",
      icon: "home",
      isFeatured: true,
    },
    {
      id: "sports-outdoor",
      name: "Sports & Outdoor",
      slug: "sports-outdoor",
      href: "/categories/sports-outdoor",
      icon: "sports",
      isFeatured: true,
    },
  ],

  moreCategories: [
    {
      id: "daily-essentials",
      name: "Daily Essentials",
      slug: "daily-essentials",
      href: "/categories/daily-essentials",
      icon: "check",
    },
    {
      id: "bags-travel",
      name: "Bags & Travel",
      slug: "bags-travel",
      href: "/categories/bags-travel",
      icon: "categories",
    },
    {
      id: "beauty-care",
      name: "Beauty & Care",
      slug: "beauty-care",
      href: "/categories/beauty-care",
      icon: "wishlist",
    },
  ],

  accountLinks: [
    {
      id: "sign-in",
      label: "Sign in",
      href: "/account/login",
      ariaLabel: "Sign in to your 365 SHOP account",
      description: "Access orders, wishlist and offers.",
    },
    {
      id: "create-account",
      label: "Create account",
      href: "/account/register",
      ariaLabel: "Create a new 365 SHOP account",
      description: "Save details and checkout faster.",
    },
    {
      id: "track-order",
      label: "Track Order",
      href: "/track-order",
      ariaLabel: "Track your order status",
      description: "Check your recent order status.",
    },
    {
      id: "help-center",
      label: "Help Center",
      href: "/help-center",
      ariaLabel: "Visit the help center",
      description: "Get help and customer support.",
    },
    {
      id: "my-account",
      label: "My account",
      href: "/account",
      requiresAuth: true,
      ariaLabel: "Open your account dashboard",
      description: "Manage profile and settings.",
    },
    {
      id: "saved-wishlist",
      label: "Saved wishlist",
      href: "/account/wishlist",
      requiresAuth: true,
      ariaLabel: "View your saved wishlist",
      description: "View your saved products.",
    },
  ],

  notifications: [
    {
      id: "order-out-for-delivery",
      title: "Order update",
      description: "Your order #1024 is out for delivery.",
      href: "/account/orders/1024",
      icon: "track",
      createdAtLabel: "2 min ago",
      isUnread: true,
      ariaLabel: "Order update, your order 1024 is out for delivery",
    },
    {
      id: "wishlist-price-drop",
      title: "Price drop alert",
      description: "A product in your wishlist has a lower price now.",
      href: "/account/wishlist",
      icon: "wishlist",
      createdAtLabel: "1 hour ago",
      isUnread: true,
      ariaLabel: "Price drop alert for a product in your wishlist",
    },
    {
      id: "special-offer",
      title: "Special offer",
      description: "Get 20% off on selected items today.",
      href: "/deals",
      icon: "check",
      createdAtLabel: "3 hours ago",
      isUnread: true,
      ariaLabel: "Special offer, get 20 percent off on selected items today",
    },
    {
      id: "welcome",
      title: "Welcome to 365 SHOP",
      description: "Thanks for joining. Explore our best deals.",
      href: "/",
      icon: "shield",
      createdAtLabel: "1 day ago",
      isUnread: false,
      ariaLabel: "Welcome to 365 SHOP",
    },
  ],

  cartSummary: {
    itemCount: 2,
    totalLabel: "$2,450",
    cartHref: "/cart",
    checkoutHref: "/checkout",
  },

  user: {
    isAuthenticated: false,
  },

  counts: {
    notifications: 3,
    wishlist: 2,
  },
} as const satisfies HeaderViewModel;

export const headerSearchConfig = {
  desktopInputName: "search",
  mobileInputName: "mobile-search",
  placeholder: "Search products...",
  emptyQueryMessage: "Please enter a product name.",
  searchHref: "/search",
} as const satisfies HeaderSearchConfig;