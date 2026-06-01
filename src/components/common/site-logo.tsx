import Link from "next/link";
import { Leaf, ShoppingBag } from "lucide-react";

type SiteLogoProps = {
  compact?: boolean;
};

export function SiteLogo({ compact = false }: SiteLogoProps) {
  return (
    <Link href="/" aria-label="Ghorer Bazar Home" className="gb-shop-logo">
      <span className="gb-shop-logo__icon" aria-hidden="true">
        <ShoppingBag className="gb-shop-logo__bag-icon" />
        <Leaf className="gb-shop-logo__leaf-icon" />
      </span>

      <span
        className={
          compact
            ? "gb-shop-logo__text gb-shop-logo__text--compact"
            : "gb-shop-logo__text"
        }
      >
        <span>GHORER</span>
        <span>BAZAR</span>
      </span>
    </Link>
  );
}