import type { NewsletterCtaSectionViewModel } from "./newsletter-cta.types";

export const newsletterCtaData: NewsletterCtaSectionViewModel = {
  headingId: "newsletter-cta-title",
  eyebrow: "DEALS & UPDATES",
  title: "Stay Updated with 365 Shop",
  subtitle:
    "Get exclusive offers, flash sale alerts and new arrival updates directly in your inbox.",
  inputLabel: "Email address",
  inputPlaceholder: "Enter your email address",
  buttonLabel: "Subscribe Now",
  privacyNote:
    "No spam. Only useful deal alerts, product updates and special offers.",
  benefits: [
    {
      id: "exclusive-deals",
      label: "Exclusive deals",
    },
    {
      id: "flash-sale-alerts",
      label: "Flash sale alerts",
    },
    {
      id: "early-access",
      label: "Early access to offers",
    },
  ],
};