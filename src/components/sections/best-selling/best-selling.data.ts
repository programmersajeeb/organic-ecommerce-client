import type { BestSellingSectionViewModel } from "./best-selling.types";

export const bestSellingData: BestSellingSectionViewModel = {
  eyebrow: "BEST SELLERS",
  title: "Best Selling Products",
  subtitle: "Popular products customers are buying right now.",
  action: {
    label: "View All",
    href: "/products",
    ariaLabel: "View all best selling products",
  },
  products: [
    {
      id: "best-selling-wireless-headphone",
      title: "Premium Wireless Bluetooth Headphone",
      href: "/products/premium-wireless-bluetooth-headphone",
      category: "Audio",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Premium wireless bluetooth headphone",
      },
      badge: {
        label: "Best",
        tone: "sale",
      },
      rating: {
        value: 4.8,
        count: 186,
      },
      price: {
        current: "৳2,490",
        old: "৳3,200",
        discountLabel: "-22%",
      },
      inStock: true,
    },
    {
      id: "best-selling-smart-watch",
      title: "Smart Fitness Watch with AMOLED Display",
      href: "/products/smart-fitness-watch-amoled-display",
      category: "Wearable",
      image: {
        src: "/images/categories/smart-watch.png",
        alt: "Smart fitness watch with AMOLED display",
      },
      badge: {
        label: "Hot",
        tone: "hot",
      },
      rating: {
        value: 4.9,
        count: 142,
      },
      price: {
        current: "৳3,850",
        old: "৳4,990",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "best-selling-ultra-hd-smart-tv",
      title: "Ultra HD Smart LED Television",
      href: "/products/ultra-hd-smart-led-television",
      category: "Electronics",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Ultra HD smart LED television",
      },
      badge: {
        label: "Top",
        tone: "new",
      },
      rating: {
        value: 4.7,
        count: 118,
      },
      price: {
        current: "৳28,500",
        old: "৳34,900",
        discountLabel: "-18%",
      },
      inStock: true,
    },
    {
      id: "best-selling-home-kitchen-kettle",
      title: "Premium Electric Kettle for Home Kitchen",
      href: "/products/premium-electric-kettle-home-kitchen",
      category: "Home & Kitchen",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Premium electric kettle for home kitchen",
      },
      badge: {
        label: "Sale",
        tone: "sale",
      },
      rating: {
        value: 4.8,
        count: 214,
      },
      price: {
        current: "৳1,890",
        old: "৳2,450",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "best-selling-travel-backpack",
      title: "Smart Travel Backpack with Laptop Space",
      href: "/products/smart-travel-backpack-laptop-space",
      category: "Bags & Luggage",
      image: {
        src: "/images/categories/bags-luggage.png",
        alt: "Smart travel backpack with laptop space",
      },
      badge: {
        label: "Stock",
        tone: "stock",
      },
      rating: {
        value: 4.6,
        count: 96,
      },
      price: {
        current: "৳1,690",
        old: "৳2,200",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "best-selling-digital-camera",
      title: "Compact Digital Camera for Daily Use",
      href: "/products/compact-digital-camera-daily-use",
      category: "Camera",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Compact digital camera for daily use",
      },
      badge: {
        label: "Best",
        tone: "sale",
      },
      rating: {
        value: 4.7,
        count: 121,
      },
      price: {
        current: "৳12,500",
        old: "৳15,750",
        discountLabel: "-21%",
      },
      inStock: true,
    },
  ],
};