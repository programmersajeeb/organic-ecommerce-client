export type CustomerReviewItem = Readonly<{
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  avatarFallback: string;
  verifiedLabel?: string;
}>;

export type CustomerReviewsSectionViewModel = Readonly<{
  headingId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  averageRating: string;
  totalReviews: string;
  trustLabel: string;
  reviews: readonly CustomerReviewItem[];
}>;

export type CustomerReviewsSectionProps = Readonly<{
  data?: CustomerReviewsSectionViewModel;
  className?: string;
}>;