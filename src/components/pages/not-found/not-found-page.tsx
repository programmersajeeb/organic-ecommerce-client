import {
  notFoundHelpItems,
  notFoundPopularCategories,
  notFoundPrimaryActions,
} from "./not-found-data";
import { NotFoundCategories } from "./not-found-categories";
import { NotFoundHelp } from "./not-found-help";
import { NotFoundHero } from "./not-found-hero";

export function NotFoundPage() {
  return (
    <section
      className="gb-not-found-page"
      aria-labelledby="not-found-page-title"
    >
      <div className="gb-container-wide">
        <NotFoundHero actions={notFoundPrimaryActions} />

        <NotFoundCategories categories={notFoundPopularCategories} />

        <NotFoundHelp items={notFoundHelpItems} />
      </div>
    </section>
  );
}