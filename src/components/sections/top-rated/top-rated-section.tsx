import { Star } from "lucide-react";

import { ProductShowcase } from "@/components/common/product-showcase";

import { topRatedData } from "./top-rated.data";
import type { TopRatedSectionProps } from "./top-rated.types";

export function TopRatedSection({
  data = topRatedData,
  className,
}: TopRatedSectionProps) {
  return (
    <ProductShowcase
      id="top-rated-products"
      title={data.title}
      icon={<Star aria-hidden="true" />}
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