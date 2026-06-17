import { Sparkles } from "lucide-react";

import { ProductShowcase } from "@/components/common/product-showcase";

import { newArrivalsData } from "./new-arrivals.data";
import type { NewArrivalsSectionProps } from "./new-arrivals.types";

export function NewArrivalsSection({
  data = newArrivalsData,
  className,
}: NewArrivalsSectionProps) {
  return (
    <ProductShowcase
      id="new-arrivals"
      title={data.title}
      icon={<Sparkles aria-hidden="true" />}
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