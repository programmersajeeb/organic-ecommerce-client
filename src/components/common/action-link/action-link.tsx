import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import type {
  AriaAttributes,
  ComponentType,
  FocusEventHandler,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
  SVGProps,
} from "react";

type NextLinkProps = LinkProps<string>;

type ActionLinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

type ActionLinkVariant = "primary" | "secondary" | "ghost" | "outline";
type ActionLinkSize = "sm" | "md" | "lg";
type ActionLinkIconPosition = "start" | "end";
type ActionLinkHref = string | NextLinkProps["href"];

export type ActionLinkProps = Readonly<{
  href: ActionLinkHref;
  children: ReactNode;

  id?: string;
  title?: string;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  download?: string | boolean;

  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-current"?: AriaAttributes["aria-current"];

  locale?: NextLinkProps["locale"];
  prefetch?: NextLinkProps["prefetch"];
  replace?: NextLinkProps["replace"];
  scroll?: NextLinkProps["scroll"];

  icon?: ActionLinkIcon;
  iconPosition?: ActionLinkIconPosition;
  iconClassName?: string;

  variant?: ActionLinkVariant;
  size?: ActionLinkSize;
  isExternal?: boolean;
  isDisabled?: boolean;

  onClick?: MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
}>;

function getClassName(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isExternalHref(href: ActionLinkHref) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

function getExternalHref(href: ActionLinkHref) {
  return typeof href === "string" ? href : String(href);
}

function getInternalHref(href: ActionLinkHref): NextLinkProps["href"] {
  if (typeof href === "string") {
    return href as Route;
  }

  return href;
}

export function ActionLink({
  "aria-current": ariaCurrent,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  download,
  href,
  icon: Icon,
  iconClassName,
  iconPosition = "start",
  id,
  isDisabled = false,
  isExternal,
  locale,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  prefetch,
  rel,
  replace,
  scroll,
  size = "md",
  target,
  title,
  variant = "primary",
}: ActionLinkProps) {
  const shouldUseExternalAnchor = isExternal ?? isExternalHref(href);

  const composedClassName = getClassName(
    "gb-action-link",
    `gb-action-link--${variant}`,
    `gb-action-link--${size}`,
    Icon && `gb-action-link--icon-${iconPosition}`,
    isDisabled && "gb-action-link--disabled",
    className,
  );

  const composedRel =
    shouldUseExternalAnchor && target === "_blank"
      ? getClassName("noopener", "noreferrer", rel)
      : rel;

  const iconElement = Icon ? (
    <Icon
      aria-hidden="true"
      className={getClassName("gb-action-link__icon", iconClassName)}
      focusable="false"
    />
  ) : null;

  const content = (
    <>
      {iconPosition === "start" ? iconElement : null}
      <span className="gb-action-link__label">{children}</span>
      {iconPosition === "end" ? iconElement : null}
    </>
  );

  const sharedProps = {
    ...(id !== undefined ? { id } : {}),
    ...(title !== undefined ? { title } : {}),
    ...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {}),
    ...(ariaLabelledBy !== undefined
      ? { "aria-labelledby": ariaLabelledBy }
      : {}),
    ...(ariaDescribedBy !== undefined
      ? { "aria-describedby": ariaDescribedBy }
      : {}),
    ...(ariaCurrent !== undefined ? { "aria-current": ariaCurrent } : {}),
  };

  const anchorEventProps = {
    ...(onClick !== undefined ? { onClick } : {}),
    ...(onMouseEnter !== undefined ? { onMouseEnter } : {}),
    ...(onMouseLeave !== undefined ? { onMouseLeave } : {}),
    ...(onFocus !== undefined ? { onFocus } : {}),
    ...(onBlur !== undefined ? { onBlur } : {}),
  };

  if (isDisabled) {
    return (
      <span
        {...sharedProps}
        className={composedClassName}
        role="link"
        aria-disabled="true"
        data-variant={variant}
        data-size={size}
        data-disabled="true"
      >
        {content}
      </span>
    );
  }

  if (shouldUseExternalAnchor) {
    return (
      <a
        {...sharedProps}
        {...anchorEventProps}
        href={getExternalHref(href)}
        className={composedClassName}
        {...(target !== undefined ? { target } : {})}
        {...(composedRel !== undefined ? { rel: composedRel } : {})}
        {...(download !== undefined ? { download } : {})}
        data-variant={variant}
        data-size={size}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      {...sharedProps}
      {...anchorEventProps}
      href={getInternalHref(href)}
      className={composedClassName}
      {...(locale !== undefined ? { locale } : {})}
      {...(prefetch !== undefined ? { prefetch } : {})}
      {...(replace !== undefined ? { replace } : {})}
      {...(scroll !== undefined ? { scroll } : {})}
      {...(target !== undefined ? { target } : {})}
      {...(composedRel !== undefined ? { rel: composedRel } : {})}
      data-variant={variant}
      data-size={size}
    >
      {content}
    </Link>
  );
}