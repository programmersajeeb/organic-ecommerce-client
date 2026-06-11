import type { LucideIcon } from "lucide-react";

export type NotFoundAction = Readonly<{
  href: "/" | "/track-order";
  label: string;
  icon: LucideIcon;
}>;

export type NotFoundCategoryImage = Readonly<{
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
}>;

export type NotFoundCategory = Readonly<{
  href: `/?category=${string}`;
  label: string;
  icon: LucideIcon;
  image?: NotFoundCategoryImage;
  ariaLabel?: string;
}>;

export type NotFoundHelpItem = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  actionLabel: string;
  ariaLabel?: string;
}>;