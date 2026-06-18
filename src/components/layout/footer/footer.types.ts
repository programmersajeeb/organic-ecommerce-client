export type FooterLink = Readonly<{
  label: string;
  href: string;
}>;

export type FooterLinkGroup = Readonly<{
  id: string;
  title: string;
  links: readonly FooterLink[];
}>;

export type FooterContactItem = Readonly<{
  id: string;
  label: string;
  value: string;
  href?: string;
}>;

export type FooterTrustItem = Readonly<{
  id: string;
  label: string;
}>;

export type FooterSocialLink = Readonly<{
  id: string;
  label: string;
  href: string;
}>;

export type SiteFooterViewModel = Readonly<{
  logoLabel: string;
  brandText: string;
  newsletterText: string;
  linkGroups: readonly FooterLinkGroup[];
  contactItems: readonly FooterContactItem[];
  trustItems: readonly FooterTrustItem[];
  socialLinks: readonly FooterSocialLink[];
  copyrightText: string;
}>;

export type SiteFooterProps = Readonly<{
  data?: SiteFooterViewModel;
  className?: string;
}>;