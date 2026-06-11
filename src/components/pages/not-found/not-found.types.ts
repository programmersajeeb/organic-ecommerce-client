import type { LucideIcon } from "lucide-react";

export type NotFoundAction = Readonly<{
  href: "/" | "/track-order";
  label: string;
  icon: LucideIcon;
}>;

export type NotFoundCategory = Readonly<{
  href: `/?category=${string}`;
  label: string;
  icon: LucideIcon;
}>;

export type NotFoundHelpItem = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;