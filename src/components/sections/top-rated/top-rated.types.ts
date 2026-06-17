import type { ProductCardProduct } from "@/components/common/product-card";

export type TopRatedSectionViewModel = Readonly<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: readonly ProductCardProduct[];
  action?: Readonly<{
    label: string;
    href: string;
    ariaLabel?: string;
  }>;
}>;

export type TopRatedSectionProps = Readonly<{
  data?: TopRatedSectionViewModel;
  className?: string;
}>;