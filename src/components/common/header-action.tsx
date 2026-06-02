import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type HeaderActionProps = {
  href: string;
  label: string;
  subLabel?: string;
  badge?: string;
  badgeLabel?: string;
  icon: LucideIcon;
};

export function HeaderAction({
  href,
  label,
  subLabel,
  badge,
  badgeLabel,
  icon: Icon,
}: HeaderActionProps) {
  const accessibleLabel = [label, subLabel, badgeLabel ?? badge]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={href}
      className="gb-shop-header-action"
      aria-label={accessibleLabel}
    >
      <span className="gb-shop-header-action__icon" aria-hidden="true">
        <Icon aria-hidden="true" focusable="false" />

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