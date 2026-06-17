export type FeaturedBrandItem = Readonly<{
  id: string;
  name: string;
  description: string;
  href: string;
  badgeLabel?: string;
}>;

export type FeaturedBrandsSectionViewModel = Readonly<{
  headingId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: Readonly<{
    label: string;
    href: string;
    ariaLabel?: string;
  }>;
  brands: readonly FeaturedBrandItem[];
}>;

export type FeaturedBrandsSectionProps = Readonly<{
  data?: FeaturedBrandsSectionViewModel;
  className?: string;
}>;