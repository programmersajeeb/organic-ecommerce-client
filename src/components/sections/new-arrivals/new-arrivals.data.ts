import type { NewArrivalsSectionViewModel } from "./new-arrivals.types";

export const newArrivalsData: NewArrivalsSectionViewModel = {
  eyebrow: "NEW ARRIVALS",
  title: "Fresh New Arrivals",
  subtitle: "Discover the latest electronics and accessories just added to the store.",
  action: {
    label: "View All",
    href: "/products/new-arrivals",
    ariaLabel: "View all new arrival products",
  },
  products: [
    {
      id: "new-arrival-smart-speaker",
      title: "Compact Smart Speaker with Deep Bass",
      href: "/products/compact-smart-speaker-deep-bass",
      category: "Audio",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Compact smart speaker with deep bass",
      },
      badge: {
        label: "New",
        tone: "new",
      },
      rating: {
        value: 4.6,
        count: 42,
      },
      price: {
        current: "৳2,250",
        old: "৳2,900",
        discountLabel: "-22%",
      },
      inStock: true,
    },
    {
      id: "new-arrival-wireless-earbuds",
      title: "Noise Cancelling Wireless Earbuds",
      href: "/products/noise-cancelling-wireless-earbuds",
      category: "Audio",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Noise cancelling wireless earbuds",
      },
      badge: {
        label: "New",
        tone: "new",
      },
      rating: {
        value: 4.7,
        count: 58,
      },
      price: {
        current: "৳1,950",
        old: "৳2,650",
        discountLabel: "-26%",
      },
      inStock: true,
    },
    {
      id: "new-arrival-smart-watch-series",
      title: "Water Resistant Smart Watch Series",
      href: "/products/water-resistant-smart-watch-series",
      category: "Wearable",
      image: {
        src: "/images/categories/smart-watch.png",
        alt: "Water resistant smart watch series",
      },
      badge: {
        label: "Fresh",
        tone: "stock",
      },
      rating: {
        value: 4.8,
        count: 67,
      },
      price: {
        current: "৳4,250",
        old: "৳5,200",
        discountLabel: "-18%",
      },
      inStock: true,
    },
    {
      id: "new-arrival-smart-led-monitor",
      title: "Slim Bezel Full HD LED Monitor",
      href: "/products/slim-bezel-full-hd-led-monitor",
      category: "Computer",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Slim bezel full HD LED monitor",
      },
      badge: {
        label: "New",
        tone: "new",
      },
      rating: {
        value: 4.5,
        count: 39,
      },
      price: {
        current: "৳13,900",
        old: "৳16,500",
        discountLabel: "-16%",
      },
      inStock: true,
    },
    {
      id: "new-arrival-mini-blender",
      title: "Portable Mini Blender for Daily Use",
      href: "/products/portable-mini-blender-daily-use",
      category: "Home & Kitchen",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Portable mini blender for daily use",
      },
      badge: {
        label: "Hot",
        tone: "hot",
      },
      rating: {
        value: 4.6,
        count: 51,
      },
      price: {
        current: "৳1,650",
        old: "৳2,100",
        discountLabel: "-21%",
      },
      inStock: true,
    },
    {
      id: "new-arrival-travel-organizer-bag",
      title: "Premium Travel Organizer Bag",
      href: "/products/premium-travel-organizer-bag",
      category: "Bags & Luggage",
      image: {
        src: "/images/categories/bags-luggage.png",
        alt: "Premium travel organizer bag",
      },
      badge: {
        label: "New",
        tone: "new",
      },
      rating: {
        value: 4.4,
        count: 33,
      },
      price: {
        current: "৳1,250",
        old: "৳1,650",
        discountLabel: "-24%",
      },
      inStock: true,
    },
  ],
};