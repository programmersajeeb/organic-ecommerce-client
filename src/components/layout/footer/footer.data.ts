import type { SiteFooterViewModel } from "./footer.types";

export const siteFooterData: SiteFooterViewModel = {
  logoLabel: "365 Shop",
  brandText:
    "365 Shop is a modern ecommerce destination for trusted products, fast delivery and a smooth online shopping experience.",
  newsletterText:
    "Subscribe from our deals section to receive useful offer alerts, flash sale updates and new arrival news.",
  linkGroups: [
    {
      id: "shop",
      title: "Shop",
      links: [
        {
          label: "All Products",
          href: "/shop",
        },
        {
          label: "Flash Deals",
          href: "/flash-deals",
        },
        {
          label: "Best Selling",
          href: "/best-selling",
        },
        {
          label: "New Arrivals",
          href: "/new-arrivals",
        },
        {
          label: "Top Rated",
          href: "/top-rated",
        },
      ],
    },
    {
      id: "support",
      title: "Customer Service",
      links: [
        {
          label: "Help Center",
          href: "/help",
        },
        {
          label: "Track Order",
          href: "/track-order",
        },
        {
          label: "Shipping Info",
          href: "/shipping",
        },
        {
          label: "Return Policy",
          href: "/returns",
        },
        {
          label: "Secure Payment",
          href: "/payment-security",
        },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        {
          label: "About Us",
          href: "/about",
        },
        {
          label: "Contact",
          href: "/contact",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Terms & Conditions",
          href: "/terms",
        },
      ],
    },
  ],
  contactItems: [
    {
      id: "email",
      label: "Email",
      value: "support@365shop.com",
      href: "mailto:support@365shop.com",
    },
    {
      id: "phone",
      label: "Phone",
      value: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      id: "location",
      label: "Location",
      value: "Dhaka, Bangladesh",
    },
  ],
  trustItems: [
    {
      id: "authentic-products",
      label: "100% Authentic Products",
    },
    {
      id: "secure-payment",
      label: "Secure Payment",
    },
    {
      id: "fast-delivery",
      label: "Fast Delivery",
    },
    {
      id: "easy-returns",
      label: "Easy Returns",
    },
  ],
  socialLinks: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://facebook.com",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://youtube.com",
    },
  ],
  copyrightText: "© 2026 365 Shop. All rights reserved.",
};