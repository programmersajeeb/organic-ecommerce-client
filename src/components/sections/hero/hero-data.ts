import type { HeroSectionViewModel } from "./hero.types";

export const heroSectionData = {
  carousel: {
    ariaLabel: "Featured shopping banners",
    autoplay: true,
    autoplayDelayMs: 6500,
    pauseOnFocus: true,
    pauseOnHover: true,
  },

  slides: [
    {
      id: "premium-tech-products",
      href: "/search?category=electronics",
      ariaLabel: "Shop premium tech products",
      image: {
        src: "/images/hero/hero1.png",
        alt: "Premium tech products displayed on an illuminated ecommerce banner",
        width: 1857,
        height: 847,
        priority: true,
      },
    },
    {
      id: "smart-accessories",
      href: "/search?category=accessories",
      ariaLabel: "Shop smart accessories",
      image: {
        src: "/images/hero/hero2.png",
        alt: "Smart accessories arranged on a premium ecommerce display banner",
        width: 1857,
        height: 847,
      },
    },
    {
      id: "modern-lifestyle-collection",
      href: "/search?sort=featured",
      ariaLabel: "Shop modern lifestyle collection",
      image: {
        src: "/images/hero/hero1.png",
        alt: "Modern lifestyle and tech products displayed on a stylish podium banner",
        width: 1857,
        height: 847,
      },
    },
  ],
} satisfies HeroSectionViewModel;