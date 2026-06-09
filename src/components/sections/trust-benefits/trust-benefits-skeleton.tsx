const TRUST_BENEFITS_SKELETON_ITEMS = [0, 1, 2, 3, 4, 5] as const;

type TrustBenefitsSkeletonProps = Readonly<{
  className?: string;
}>;

function getClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function TrustBenefitsSkeleton({
  className,
}: TrustBenefitsSkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className={getClassName("gb-trust-benefits-skeleton", className)}
    >
      <div className="gb-trust-benefits-skeleton__container">
        <ul className="gb-trust-benefits-skeleton__list">
          {TRUST_BENEFITS_SKELETON_ITEMS.map((item) => (
            <li key={item} className="gb-trust-benefits-skeleton__item">
              <span className="gb-trust-benefits-skeleton__icon" />

              <span className="gb-trust-benefits-skeleton__content">
                <span className="gb-trust-benefits-skeleton__line gb-trust-benefits-skeleton__line--title" />
                <span className="gb-trust-benefits-skeleton__line gb-trust-benefits-skeleton__line--description" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}