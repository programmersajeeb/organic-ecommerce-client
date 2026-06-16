import type { FlashDealsData } from "./flash-deals.types";

export const flashDealsData = {
  eyebrow: "Today’s Deals",
  title: "Flash Deals",
  subtitle: "Limited-time offers on trending electronics and accessories.",
  countdown: [
    {
      value: "02",
      label: "Days",
    },
    {
      value: "14",
      label: "Hrs",
    },
    {
      value: "38",
      label: "Min",
    },
    {
      value: "09",
      label: "Sec",
    },
  ],
  action: {
    label: "View All",
    href: "/flash-deals",
    ariaLabel: "View all flash deals",
  },
  products: [
    {
      id: "flash-wireless-headphone",
      title: "Premium Wireless Bluetooth Headphone",
      href: "/products/premium-wireless-bluetooth-headphone",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Premium wireless Bluetooth headphone",
      },
      price: {
        current: "৳2,490",
        old: "৳3,200",
        discountLabel: "-22%",
      },
      rating: {
        value: 4.7,
        count: 128,
      },
      badge: {
        label: "Sale",
        tone: "sale",
      },
      category: "Audio",
      inStock: true,
    },
    {
      id: "flash-smart-watch",
      title: "Smart Fitness Watch with AMOLED Display",
      href: "/products/smart-fitness-watch-amoled-display",
      image: {
        src: "/images/categories/smart-watch.png",
        alt: "Smart fitness watch with AMOLED display",
      },
      price: {
        current: "৳3,850",
        old: "৳4,990",
        discountLabel: "-23%",
      },
      rating: {
        value: 4.6,
        count: 96,
      },
      badge: {
        label: "Hot",
        tone: "hot",
      },
      category: "Wearable",
      inStock: true,
    },
    {
      id: "flash-gaming-keyboard",
      title: "RGB Mechanical Gaming Keyboard",
      href: "/products/rgb-mechanical-gaming-keyboard",
      image: {
        src: "/images/categories/electronics.png",
        alt: "RGB mechanical gaming keyboard",
      },
      price: {
        current: "৳2,950",
        old: "৳3,650",
        discountLabel: "-19%",
      },
      rating: {
        value: 4.5,
        count: 74,
      },
      badge: {
        label: "New",
        tone: "new",
      },
      category: "Gaming",
      inStock: true,
    },
    {
      id: "flash-power-bank",
      title: "20000mAh Fast Charging Power Bank",
      href: "/products/20000mah-fast-charging-power-bank",
      image: {
        src: "/images/categories/electronics.png",
        alt: "20000mAh fast charging power bank",
      },
      price: {
        current: "৳1,890",
        old: "৳2,450",
        discountLabel: "-23%",
      },
      rating: {
        value: 4.8,
        count: 212,
      },
      badge: {
        label: "Sale",
        tone: "sale",
      },
      category: "Accessories",
      inStock: true,
    },
    {
      id: "flash-wireless-mouse",
      title: "Silent Ergonomic Wireless Mouse",
      href: "/products/silent-ergonomic-wireless-mouse",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Silent ergonomic wireless mouse",
      },
      price: {
        current: "৳690",
        old: "৳950",
        discountLabel: "-27%",
      },
      rating: {
        value: 4.4,
        count: 58,
      },
      badge: {
        label: "Stock",
        tone: "stock",
      },
      category: "Computer",
      inStock: true,
    },
    {
      id: "flash-usb-c-charger",
      title: "65W USB-C Fast Charging Adapter",
      href: "/products/65w-usb-c-fast-charging-adapter",
      image: {
        src: "/images/categories/electronics.png",
        alt: "65W USB-C fast charging adapter",
      },
      price: {
        current: "৳1,250",
        old: "৳1,750",
        discountLabel: "-29%",
      },
      rating: {
        value: 4.6,
        count: 84,
      },
      badge: {
        label: "Sale",
        tone: "sale",
      },
      category: "Charger",
      inStock: true,
    },
  ],
} satisfies FlashDealsData;