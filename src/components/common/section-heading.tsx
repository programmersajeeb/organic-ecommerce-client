import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  centered?: boolean;
  compact?: boolean;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  actionText,
  actionHref,
  centered = false,
  compact = false,
}: SectionHeadingProps) {
  const headingClassName = [
    "gb-section-heading",
    centered ? "is-centered" : "",
    compact ? "is-compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={headingClassName}>
      <div className="gb-section-heading__content">
        {eyebrow ? <span className="gb-section-eyebrow">{eyebrow}</span> : null}

        <h2 className="gb-section-title">{title}</h2>

        {description ? (
          <p className="gb-section-description">{description}</p>
        ) : null}
      </div>

      {actionText && actionHref ? (
        <div className="gb-section-action">
          <Link href={actionHref} className="gb-btn-outline">
            {actionText}
          </Link>
        </div>
      ) : null}
    </div>
  );
}