const NOT_FOUND_CATEGORY_SKELETON_ITEMS = [0, 1, 2, 3, 4] as const;
const NOT_FOUND_HELP_SKELETON_ITEMS = [0, 1, 2] as const;

type NotFoundSkeletonProps = Readonly<{
  className?: string;
}>;

function getClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function NotFoundSkeleton({ className }: NotFoundSkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className={getClassName("gb-not-found-skeleton", className)}
    >
      <div className="gb-container-wide">
        <div className="gb-not-found-skeleton__shell">
          <div className="gb-not-found-skeleton__content">
            <span className="gb-not-found-skeleton__code" />

            <span className="gb-not-found-skeleton__title" />

            <span className="gb-not-found-skeleton__description" />

            <span className="gb-not-found-skeleton__description gb-not-found-skeleton__description--short" />

            <div className="gb-not-found-skeleton__actions">
              <span className="gb-not-found-skeleton__button" />
              <span className="gb-not-found-skeleton__button gb-not-found-skeleton__button--secondary" />
            </div>

            <span className="gb-not-found-skeleton__search" />
          </div>

          <div className="gb-not-found-skeleton__visual">
            <span className="gb-not-found-skeleton__image" />
          </div>
        </div>

        <section className="gb-not-found-skeleton__categories">
          <div className="gb-not-found-skeleton__section-header">
            <span className="gb-not-found-skeleton__section-title" />
            <span className="gb-not-found-skeleton__section-link" />
          </div>

          <ul className="gb-not-found-skeleton__category-grid">
            {NOT_FOUND_CATEGORY_SKELETON_ITEMS.map((item) => (
              <li key={item}>
                <div className="gb-not-found-skeleton__category-card">
                  <span className="gb-not-found-skeleton__category-media" />
                  <span className="gb-not-found-skeleton__category-label" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="gb-not-found-skeleton__help">
          {NOT_FOUND_HELP_SKELETON_ITEMS.map((item) => (
            <article key={item} className="gb-not-found-skeleton__help-item">
              <span className="gb-not-found-skeleton__help-icon" />

              <span className="gb-not-found-skeleton__help-content">
                <span className="gb-not-found-skeleton__help-title" />
                <span className="gb-not-found-skeleton__help-description" />
                <span className="gb-not-found-skeleton__help-link" />
              </span>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}