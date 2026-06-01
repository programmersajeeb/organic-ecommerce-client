type SectionHeadingProps = {
  title: string;
  actionText?: string;
};

export function SectionHeading({ title, actionText }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="gb-section-title">{title}</h2>

      {actionText ? (
        <button className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
          {actionText}
        </button>
      ) : null}
    </div>
  );
}