export type TrustBenefitIconName =
  | "authentic"
  | "delivery"
  | "payment"
  | "returns"
  | "shipping"
  | "support";

export type TrustBenefitItem = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: TrustBenefitIconName;
}>;

export type TrustBenefitsSectionViewModel = Readonly<{
  headingId: string;
  heading: string;
  ariaLabel: string;
  items: readonly TrustBenefitItem[];
}>;