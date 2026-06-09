import type { TrustBenefitsSectionViewModel } from "./trust-benefits.types";

export const trustBenefitsData = {
  headingId: "trust-benefits-heading",
  heading: "Shopping benefits",
  ariaLabel: "Shopping benefits and service highlights",
  items: [
    {
      id: "free-shipping",
      title: "Free Shipping",
      description: "On eligible orders",
      icon: "shipping",
    },
    {
      id: "secure-payment",
      title: "Secure Payment",
      description: "Safe checkout",
      icon: "payment",
    },
    {
      id: "fast-delivery",
      title: "Fast Delivery",
      description: "Across Bangladesh",
      icon: "delivery",
    },
    {
      id: "easy-returns",
      title: "Easy Returns",
      description: "Hassle-free support",
      icon: "returns",
    },
    {
      id: "authentic-products",
      title: "Authentic Products",
      description: "Verified quality",
      icon: "authentic",
    },
    {
      id: "customer-support",
      title: "24/7 Support",
      description: "Always here to help",
      icon: "support",
    },
  ],
} satisfies TrustBenefitsSectionViewModel;