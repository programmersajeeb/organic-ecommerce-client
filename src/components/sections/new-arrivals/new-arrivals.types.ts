import type { ProductCardProduct } from "@/components/common/product-card";

export type NewArrivalsSectionViewModel = Readonly<{
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

export type NewArrivalsSectionProps = Readonly<{
  data?: NewArrivalsSectionViewModel;
  className?: string;
}>;