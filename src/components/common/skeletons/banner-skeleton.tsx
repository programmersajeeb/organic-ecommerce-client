type BannerSkeletonProps = Readonly<{
  className?: string | undefined;
  showContentPreview?: boolean;
  showDots?: boolean;
}>;

function getClassName(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function BannerSkeleton({
  className,
  showContentPreview = false,
  showDots = true,
}: BannerSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={getClassName("gb-banner-skeleton", className)}
    >
      {showContentPreview ? (
        <div className="gb-banner-skeleton__content">
          <span className="gb-banner-skeleton__line gb-banner-skeleton__line--sm" />
          <span className="gb-banner-skeleton__line gb-banner-skeleton__line--lg" />
          <span className="gb-banner-skeleton__line gb-banner-skeleton__line--md" />
        </div>
      ) : null}

      {showDots ? (
        <div className="gb-banner-skeleton__dots">
          <span className="gb-banner-skeleton__dot gb-banner-skeleton__dot--active" />
          <span className="gb-banner-skeleton__dot" />
          <span className="gb-banner-skeleton__dot" />
        </div>
      ) : null}
    </div>
  );
}