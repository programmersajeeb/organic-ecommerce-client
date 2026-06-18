export type NewsletterCtaBenefit = Readonly<{
  id: string;
  label: string;
}>;

export type NewsletterCtaSectionViewModel = Readonly<{
  headingId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  buttonLabel: string;
  privacyNote: string;
  benefits: readonly NewsletterCtaBenefit[];
}>;

export type NewsletterCtaSectionProps = Readonly<{
  data?: NewsletterCtaSectionViewModel;
  className?: string;
}>;