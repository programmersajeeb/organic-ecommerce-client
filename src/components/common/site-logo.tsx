import Link from "next/link";
import { Leaf, ShoppingBag } from "lucide-react";

type SiteLogoProps = {
  compact?: boolean;
};

export function SiteLogo({ compact = false }: SiteLogoProps) {
  return (
    <Link href="/" aria-label="Ghorer Bazar home" className="gb-shop-logo">
      <span className="gb-shop-logo__icon" aria-hidden="true">
        <ShoppingBag
          aria-hidden="true"
          focusable="false"
          className="gb-shop-logo__bag-icon"
        />
        <Leaf
          aria-hidden="true"
          focusable="false"
          className="gb-shop-logo__leaf-icon"
        />
      </span>

      <span
        aria-hidden="true"
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