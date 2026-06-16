import type { ProductCardProduct } from "@/components/common/product-card";
import type {
  ProductShowcaseAction,
  ProductShowcaseCountdownItem,
} from "@/components/common/product-showcase";

export type FlashDealsProduct = ProductCardProduct;

export type FlashDealsCountdownItem = ProductShowcaseCountdownItem;

export type FlashDealsData = Readonly<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  countdown?: ReadonlyArray<FlashDealsCountdownItem>;
  action?: ProductShowcaseAction;
  products: ReadonlyArray<FlashDealsProduct>;
}>;

export type FlashDealsSectionProps = Readonly<{
  data?: FlashDealsData;
  className?: string | undefined;
}>;