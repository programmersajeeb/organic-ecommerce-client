import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ActionLink } from "@/components/common/action-link";
import { SearchForm } from "@/components/common/search-form";

import type { NotFoundAction } from "./not-found.types";

type NotFoundHeroProps = Readonly<{
  actions: readonly NotFoundAction[];
}>;

export function NotFoundHero({ actions }: NotFoundHeroProps) {
  const primaryAction = actions[0];
  const secondaryAction = actions[1];

  return (
    <div className="gb-not-found-page__shell">
      <div className="gb-not-found-page__content">
        <p className="gb-not-found-page__code" aria-hidden="true">
          404
        </p>

        <h1 id="not-found-page-title" className="gb-not-found-page__title">
          Page Not Found
        </h1>

        <p className="gb-not-found-page__description">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="gb-not-found-page__actions">
          {primaryAction ? (
            <ActionLink
              href={primaryAction.href}
              icon={ArrowRight}
              iconPosition="end"
              variant="primary"
              className="gb-not-found-page__button"
              iconClassName="gb-not-found-page__button-icon"
            >
              {primaryAction.label}
            </ActionLink>
          ) : null}

          {secondaryAction ? (
            <ActionLink
              href={secondaryAction.href}
              variant="secondary"
              className="gb-not-found-page__button gb-not-found-page__button--secondary"
            >
              {secondaryAction.label}
            </ActionLink>
          ) : null}
        </div>

        <SearchForm
          id="not-found-search"
          action="/"
          method="get"
          name="q"
          label="Search products"
          aria-label="Search products from not found page"
          placeholder="Search for products, brands and more..."
          submitLabel="Search products"
          className="gb-not-found-page__search"
          classNames={{
            icon: "gb-not-found-page__search-icon",
            input: "gb-not-found-page__search-input",
            submit: "gb-not-found-page__search-submit",
            submitIcon: "gb-not-found-page__search-submit-icon",
          }}
        />
      </div>

      <div className="gb-not-found-page__visual" aria-hidden="true">
        <div className="gb-not-found-page__picture">
          <Image
            src="/images/errors/404-shopping-illustration.png"
            alt=""
            className="gb-not-found-page__image"
            width={1536}
            height={1024}
            sizes="(max-width: 767px) 86vw, (max-width: 1023px) 70vw, 48vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}