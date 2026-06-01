import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type HeaderActionProps = {
  href: string;
  label: string;
  subLabel?: string;
  badge?: string;
  icon: LucideIcon;
};

export function HeaderAction({
  href,
  label,
  subLabel,
  badge,
  icon: Icon,
}: HeaderActionProps) {
  const accessibleLabel = badge
    ? `${label}${subLabel ? `, ${subLabel}` : ""}, ${badge} items`
    : `${label}${subLabel ? `, ${subLabel}` : ""}`;

  return (
    <Link
      href={href}
      className="gb-shop-header-action"
      aria-label={accessibleLabel}
    >
      <span className="gb-shop-header-action__icon">
        <Icon aria-hidden="true" />

        {badge ? (
          <span className="gb-shop-header-action__badge">{badge}</span>
        ) : null}
      </span>

      <span className="gb-shop-header-action__content">
        <span className="gb-shop-header-action__label">{label}</span>

        {subLabel ? (
          <span className="gb-shop-header-action__sub-label">{subLabel}</span>
        ) : null}
      </span>
    </Link>
  );
}