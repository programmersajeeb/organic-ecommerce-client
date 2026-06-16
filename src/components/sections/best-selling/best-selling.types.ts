import type { ProductCardProduct } from "@/components/common/product-card";

export type BestSellingSectionViewModel = Readonly<{
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

export type BestSellingSectionProps = Readonly<{
  data?: BestSellingSectionViewModel;
  className?: string;
}>;