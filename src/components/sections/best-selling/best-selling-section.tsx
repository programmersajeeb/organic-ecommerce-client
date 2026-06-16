import { TrendingUp } from "lucide-react";

import { ProductShowcase } from "@/components/common/product-showcase";

import { bestSellingData } from "./best-selling.data";
import type { BestSellingSectionProps } from "./best-selling.types";

export function BestSellingSection({
  data = bestSellingData,
  className,
}: BestSellingSectionProps) {
  return (
    <ProductShowcase
      id="best-selling-products"
      title={data.title}
      icon={<TrendingUp aria-hidden="true" />}
      products={data.products}
      variant="default"
      layout="carousel"
      showArrows
      className={className}
      cardOptions={{
        showBadge: true,
        showRating: true,
        showWishlist: true,
        showCartAction: true,
      }}
      {...(data.eyebrow ? { eyebrow: data.eyebrow } : {})}
      {...(data.subtitle ? { subtitle: data.subtitle } : {})}
      {...(data.action ? { action: data.action } : {})}
    />
  );
}