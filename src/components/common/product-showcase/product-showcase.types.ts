import type { ReactNode } from "react";

import type { ProductCardProduct, ProductCardProps } from "../product-card";

export type ProductShowcaseVariant =
  | "default"
  | "flash"
  | "featured"
  | "compact";

export type ProductShowcaseLayout = "carousel" | "grid";

export type ProductShowcaseCountdownItem = Readonly<{
  value: string;
  label: string;
}>;

export type ProductShowcaseAction = Readonly<{
  label: string;
  href: string;
  ariaLabel?: string;
}>;

export type ProductShowcaseCardOptions = Readonly<
  Omit<ProductCardProps, "product" | "priority" | "className">
>;

export type ProductShowcaseProps = Readonly<{
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: ReactNode;
  products: ReadonlyArray<ProductCardProduct>;
  countdown?: ReadonlyArray<ProductShowcaseCountdownItem>;
  action?: ProductShowcaseAction;
  variant?: ProductShowcaseVariant;
  layout?: ProductShowcaseLayout;
  showArrows?: boolean;
  emptyMessage?: string;
  className?: string | undefined;
  listClassName?: string | undefined;
  cardOptions?: ProductShowcaseCardOptions;
}>;