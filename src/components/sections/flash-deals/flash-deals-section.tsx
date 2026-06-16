import { Zap } from "lucide-react";

import { ProductShowcase } from "@/components/common/product-showcase";

import { flashDealsData } from "./flash-deals.data";
import type { FlashDealsSectionProps } from "./flash-deals.types";

export function FlashDealsSection({
  data = flashDealsData,
  className,
}: FlashDealsSectionProps) {
  return (
    <ProductShowcase
      id="flash-deals"
      title={data.title}
      eyebrow={data.eyebrow}
      icon={<Zap aria-hidden="true" />}
      products={data.products}
      variant="flash"
      layout="carousel"
      showArrows
      className={className}
      cardOptions={{
        showBadge: true,
        showRating: true,
        showWishlist: true,
        showCartAction: true,
      }}
      {...(data.subtitle ? { subtitle: data.subtitle } : {})}
      {...(data.countdown ? { countdown: data.countdown } : {})}
      {...(data.action ? { action: data.action } : {})}
    />
  );
}