import type { NotFoundHelpItem } from "./not-found.types";

type NotFoundHelpProps = Readonly<{
  items: readonly NotFoundHelpItem[];
}>;

export function NotFoundHelp({ items }: NotFoundHelpProps) {
  return (
    <section className="gb-not-found-page__help" aria-label="Shopping help">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title} className="gb-not-found-page__help-item">
            <div className="gb-not-found-page__help-icon-shell">
              <Icon
                aria-hidden="true"
                className="gb-not-found-page__help-icon"
                focusable="false"
              />
            </div>

            <div>
              <h2 className="gb-not-found-page__help-title">{item.title}</h2>
              <p className="gb-not-found-page__help-description">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}