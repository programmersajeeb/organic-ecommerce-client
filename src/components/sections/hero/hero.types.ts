export type HeroBannerImage = Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}>;

export type HeroSlide = Readonly<{
  id: string;
  image: HeroBannerImage;
  href?: string;
  ariaLabel?: string;
}>;

export type HeroCarouselConfig = Readonly<{
  ariaLabel: string;
  autoplay?: boolean;
  autoplayDelayMs?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
}>;

export type HeroSectionViewModel = Readonly<{
  slides: readonly HeroSlide[];
  carousel: HeroCarouselConfig;
}>;