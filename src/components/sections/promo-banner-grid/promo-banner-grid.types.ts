export type PromoBannerTone = "primary" | "dark" | "soft" | "accent";

export type PromoBannerSize = "large" | "compact";

export type PromoBannerItem = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: Readonly<{
    src: string;
    alt: string;
  }>;
  badgeLabel?: string;
  tone?: PromoBannerTone;
  size?: PromoBannerSize;
}>;

export type PromoBannerGridSectionViewModel = Readonly<{
  headingId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  banners: readonly PromoBannerItem[];
}>;

export type PromoBannerGridSectionProps = Readonly<{
  data?: PromoBannerGridSectionViewModel;
  className?: string;
}>;