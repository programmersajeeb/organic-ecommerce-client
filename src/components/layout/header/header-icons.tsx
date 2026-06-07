import {
  Bell,
  Bike,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Globe2,
  Grid3X3,
  Headphones,
  Headset,
  Heart,
  HelpCircle,
  Home,
  Laptop,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  PackageSearch,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sun,
  Truck,
  Watch,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { HeaderIconKey } from "./header.types";

const headerIconRegistry: Record<HeaderIconKey, LucideIcon> = {
  bell: Bell,
  camera: Camera,
  cart: ShoppingCart,
  categories: Grid3X3,
  check: CheckCircle2,
  chevronDown: ChevronDown,
  close: X,
  computer: Monitor,
  globe: Globe2,
  headphone: Headphones,
  help: HelpCircle,
  home: Home,
  laptop: Laptop,
  menu: Menu,
  mobile: Smartphone,
  moon: Moon,
  more: MoreHorizontal,
  returns: RotateCcw,
  search: Search,
  shield: ShieldCheck,
  sports: Bike,
  sun: Sun,
  support: Headset,
  track: PackageSearch,
  truck: Truck,
  user: CircleUserRound,
  watch: Watch,
  wishlist: Heart,
};

type HeaderIconProps = Readonly<{
  name: HeaderIconKey;
  className?: string;
}>;

export function HeaderIcon({ name, className }: HeaderIconProps) {
  const Icon = headerIconRegistry[name];

  return <Icon aria-hidden="true" className={className} focusable="false" />;
}