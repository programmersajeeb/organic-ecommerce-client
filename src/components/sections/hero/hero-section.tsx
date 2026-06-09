import { HeroCarousel } from "./hero-carousel";
import { heroSectionData } from "./hero-data";
import type { HeroSectionViewModel } from "./hero.types";

type HeroSectionProps = Readonly<{
  data?: HeroSectionViewModel;
  className?: string;
}>;

export function HeroSection({
  className,
  data = heroSectionData,
}: HeroSectionProps) {
  return <HeroCarousel className={className} data={data} />;
}