import type { FeaturedBrandsSectionViewModel } from "./featured-brands.types";

export const featuredBrandsData: FeaturedBrandsSectionViewModel = {
  headingId: "featured-brands-title",
  eyebrow: "OFFICIAL BRANDS",
  title: "Shop by Trusted Brands",
  subtitle:
    "Explore popular and reliable brands selected for quality, performance and everyday value.",
  action: {
    label: "View All Brands",
    href: "/brands",
    ariaLabel: "View all official brands",
  },
  brands: [
    {
      id: "apple",
      name: "Apple",
      description: "Premium devices and accessories",
      href: "/brands/apple",
      badgeLabel: "Premium",
    },
    {
      id: "samsung",
      name: "Samsung",
      description: "Smartphones, TVs and electronics",
      href: "/brands/samsung",
      badgeLabel: "Popular",
    },
    {
      id: "sony",
      name: "Sony",
      description: "Audio, camera and entertainment gear",
      href: "/brands/sony",
      badgeLabel: "Audio",
    },
    {
      id: "xiaomi",
      name: "Xiaomi",
      description: "Smart gadgets at great value",
      href: "/brands/xiaomi",
      badgeLabel: "Value",
    },
    {
      id: "jbl",
      name: "JBL",
      description: "Speakers, headphones and sound systems",
      href: "/brands/jbl",
      badgeLabel: "Sound",
    },
    {
      id: "anker",
      name: "Anker",
      description: "Chargers, cables and power solutions",
      href: "/brands/anker",
      badgeLabel: "Power",
    },
  ],
};