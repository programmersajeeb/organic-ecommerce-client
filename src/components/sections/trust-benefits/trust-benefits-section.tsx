import {
  BadgeCheck,
  CreditCard,
  Headset,
  PackageCheck,
  RotateCcw,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { trustBenefitsData } from "./trust-benefits-data";
import type {
  TrustBenefitIconName,
  TrustBenefitsSectionViewModel,
} from "./trust-benefits.types";

type TrustBenefitsSectionProps = Readonly<{
  data?: TrustBenefitsSectionViewModel;
  className?: string;
}>;

const trustBenefitIcons = {
  authentic: BadgeCheck,
  delivery: Truck,
  payment: CreditCard,
  returns: RotateCcw,
  shipping: PackageCheck,
  support: Headset,
} satisfies Record<TrustBenefitIconName, LucideIcon>;

function getClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function TrustBenefitsSection({
  className,
  data = trustBenefitsData,
}: TrustBenefitsSectionProps) {
  return (
    <section
      aria-labelledby={data.headingId}
      className={getClassName("gb-trust-benefits", className)}
    >
      <div className="gb-trust-benefits__container">
        <h2 id={data.headingId} className="gb-sr-only">
          {data.heading}
        </h2>

        <ul className="gb-trust-benefits__list" aria-label={data.ariaLabel}>
          {data.items.map((item) => {
            const Icon = trustBenefitIcons[item.icon];

            return (
              <li key={item.id} className="gb-trust-benefits__item">
                <span
                  className="gb-trust-benefits__icon-shell"
                  aria-hidden="true"
                >
                  <Icon className="gb-trust-benefits__icon" />
                </span>

                <span className="gb-trust-benefits__content">
                  <span className="gb-trust-benefits__title">
                    {item.title}
                  </span>
                  <span className="gb-trust-benefits__description">
                    {item.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}