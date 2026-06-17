import type { TopRatedSectionViewModel } from "./top-rated.types";

export const topRatedData: TopRatedSectionViewModel = {
  eyebrow: "TOP RATED",
  title: "Customer Favorite Products",
  subtitle:
    "Highly rated products trusted by customers for quality, performance and everyday value.",
  action: {
    label: "View All",
    href: "/products/top-rated",
    ariaLabel: "View all top rated products",
  },
  products: [
    {
      id: "top-rated-headphone",
      title: "Premium Wireless Noise Cancelling Headphone",
      href: "/products/premium-wireless-noise-cancelling-headphone",
      category: "Audio",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Premium wireless noise cancelling headphone",
      },
      badge: {
        label: "Top",
        tone: "hot",
      },
      rating: {
        value: 4.9,
        count: 286,
      },
      price: {
        current: "৳2,490",
        old: "৳3,200",
        discountLabel: "-22%",
      },
      inStock: true,
    },
    {
      id: "top-rated-smart-watch",
      title: "Smart Fitness Watch with AMOLED Display",
      href: "/products/smart-fitness-watch-amoled-display",
      category: "Wearable",
      image: {
        src: "/images/categories/smart-watch.png",
        alt: "Smart fitness watch with AMOLED display",
      },
      badge: {
        label: "Rated",
        tone: "stock",
      },
      rating: {
        value: 4.8,
        count: 214,
      },
      price: {
        current: "৳3,850",
        old: "৳4,990",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "top-rated-led-tv",
      title: "Ultra HD Smart LED Television",
      href: "/products/ultra-hd-smart-led-television",
      category: "Electronics",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Ultra HD smart LED television",
      },
      badge: {
        label: "Best",
        tone: "hot",
      },
      rating: {
        value: 4.8,
        count: 198,
      },
      price: {
        current: "৳28,500",
        old: "৳34,900",
        discountLabel: "-18%",
      },
      inStock: true,
    },
    {
      id: "top-rated-kettle",
      title: "Premium Electric Kettle for Home Kitchen",
      href: "/products/premium-electric-kettle-home-kitchen",
      category: "Home & Kitchen",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Premium electric kettle for home kitchen",
      },
      badge: {
        label: "Popular",
        tone: "stock",
      },
      rating: {
        value: 4.7,
        count: 172,
      },
      price: {
        current: "৳1,890",
        old: "৳2,450",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "top-rated-backpack",
      title: "Smart Travel Backpack with Laptop Space",
      href: "/products/smart-travel-backpack-laptop-space",
      category: "Bags & Luggage",
      image: {
        src: "/images/categories/bags-luggage.png",
        alt: "Smart travel backpack with laptop space",
      },
      badge: {
        label: "Choice",
        tone: "new",
      },
      rating: {
        value: 4.7,
        count: 156,
      },
      price: {
        current: "৳1,690",
        old: "৳2,200",
        discountLabel: "-23%",
      },
      inStock: true,
    },
    {
      id: "top-rated-monitor",
      title: "Slim Bezel Full HD LED Monitor",
      href: "/products/slim-bezel-full-hd-led-monitor",
      category: "Computer",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Slim bezel full HD LED monitor",
      },
      badge: {
        label: "Top",
        tone: "hot",
      },
      rating: {
        value: 4.8,
        count: 139,
      },
      price: {
        current: "৳13,900",
        old: "৳16,500",
        discountLabel: "-16%",
      },
      inStock: true,
    },
  ],
};