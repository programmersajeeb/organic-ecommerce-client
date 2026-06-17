import type { PromoBannerGridSectionViewModel } from "./promo-banner-grid.types";

export const promoBannerGridData: PromoBannerGridSectionViewModel = {
  headingId: "promo-banner-grid-title",
  eyebrow: "SPECIAL COLLECTIONS",
  title: "Exclusive Offers for Every Need",
  subtitle:
    "Discover selected deals across electronics, smart gadgets, home essentials and travel accessories.",
  banners: [
    {
      id: "promo-smart-electronics",
      eyebrow: "LIMITED TIME",
      title: "Upgrade Your Smart Electronics",
      description:
        "Save more on TVs, accessories and everyday tech essentials selected for modern homes.",
      href: "/collections/smart-electronics",
      ctaLabel: "Shop Electronics",
      badgeLabel: "Up to 30% Off",
      tone: "primary",
      size: "large",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Smart electronics collection",
      },
    },
    {
      id: "promo-audio-wearable",
      eyebrow: "TRENDING NOW",
      title: "Audio & Wearable Deals",
      description:
        "Explore headphones, smart watches and portable gadgets for daily use.",
      href: "/collections/audio-wearable",
      ctaLabel: "Explore Deals",
      badgeLabel: "Hot Picks",
      tone: "dark",
      size: "large",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Audio and wearable deals",
      },
    },
    {
      id: "promo-home-kitchen",
      eyebrow: "HOME ESSENTIALS",
      title: "Smart Home & Kitchen",
      description:
        "Find useful home appliances and kitchen tools at better prices.",
      href: "/collections/home-kitchen",
      ctaLabel: "Shop Home",
      badgeLabel: "Best Value",
      tone: "soft",
      size: "compact",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Home and kitchen essentials",
      },
    },
    {
      id: "promo-travel-ready",
      eyebrow: "TRAVEL READY",
      title: "Bags & Daily Carry",
      description:
        "Get durable backpacks, travel organizers and carry essentials.",
      href: "/collections/bags-luggage",
      ctaLabel: "Shop Bags",
      badgeLabel: "New Deals",
      tone: "accent",
      size: "compact",
      image: {
        src: "/images/categories/bags-luggage.png",
        alt: "Bags and luggage collection",
      },
    },
  ],
};