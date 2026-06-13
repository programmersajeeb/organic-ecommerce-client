"use client";

import { BannerSkeleton } from "@/components/common/skeleton";
import Image from "next/image";
import Link from "next/link";
import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";

import type { HeroSectionViewModel, HeroSlide } from "./hero.types";

type HeroCarouselProps = Readonly<{
  data: HeroSectionViewModel;
  className?: string | undefined;
}>;

type LoadedSlideMap = Readonly<Record<string, true>>;

type HeroBannerImageProps = Readonly<{
  slide: HeroSlide;
  isLoaded: boolean;
  onLoad: (slideId: string) => void;
}>;

function getClassName(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function getSafeDelay(delay: number | undefined) {
  if (!delay) {
    return 6500;
  }

  return Math.max(delay, 3500);
}

function getClampedIndex(index: number, slideCount: number) {
  if (slideCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), slideCount - 1);
}

function getNextIndex(currentIndex: number, slideCount: number) {
  if (slideCount <= 0) {
    return 0;
  }

  return (getClampedIndex(currentIndex, slideCount) + 1) % slideCount;
}

function getPreviousIndex(currentIndex: number, slideCount: number) {
  if (slideCount <= 0) {
    return 0;
  }

  return (
    getClampedIndex(currentIndex, slideCount) - 1 + slideCount
  ) % slideCount;
}

function HeroBannerImage({ isLoaded, onLoad, slide }: HeroBannerImageProps) {
  const image = (
    <Image
      alt={slide.image.alt}
      className={getClassName(
        "gb-hero-carousel__image",
        isLoaded && "gb-hero-carousel__image--loaded",
      )}
      fill
      onLoad={() => onLoad(slide.id)}
      sizes="(max-width: 767px) 100vw, (max-width: 1440px) 88vw, 1280px"
      src={slide.image.src}
      {...(slide.image.priority ? { priority: true } : {})}
    />
  );

  if (!slide.href) {
    return image;
  }

  return (
    <Link
      aria-label={slide.ariaLabel ?? slide.image.alt}
      className="gb-hero-carousel__image-link"
      href={slide.href}
    >
      {image}
    </Link>
  );
}

export function HeroCarousel({ className, data }: HeroCarouselProps) {
  const carouselId = useId();
  const slides = data.slides;
  const slideCount = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [loadedSlideIds, setLoadedSlideIds] = useState<LoadedSlideMap>({});

  const safeActiveIndex = getClampedIndex(activeIndex, slideCount);
  const activeSlide = slides[safeActiveIndex];
  const isActiveSlideLoaded = activeSlide
    ? Boolean(loadedSlideIds[activeSlide.id])
    : false;

  const shouldAutoplay =
    Boolean(data.carousel.autoplay) && slideCount > 1 && !isManualPaused;
  const isTemporarilyPaused = isPointerPaused || isFocusPaused;
  const isAutoplayPaused = isManualPaused || isTemporarilyPaused;

  const handleSlideImageLoad = useCallback((slideId: string) => {
    setLoadedSlideIds((currentLoadedSlideIds) => {
      if (currentLoadedSlideIds[slideId]) {
        return currentLoadedSlideIds;
      }

      return {
        ...currentLoadedSlideIds,
        [slideId]: true,
      };
    });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount <= 0) {
        return;
      }

      setActiveIndex(getClampedIndex(index, slideCount));
    },
    [slideCount],
  );

  const goToNextSlide = useCallback(() => {
    setActiveIndex((currentIndex) => getNextIndex(currentIndex, slideCount));
  }, [slideCount]);

  const goToPreviousSlide = useCallback(() => {
    setActiveIndex((currentIndex) =>
      getPreviousIndex(currentIndex, slideCount),
    );
  }, [slideCount]);

  useEffect(() => {
    if (!shouldAutoplay || isTemporarilyPaused) {
      return;
    }

    const autoplayTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => getNextIndex(currentIndex, slideCount));
    }, getSafeDelay(data.carousel.autoplayDelayMs));

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [
    data.carousel.autoplayDelayMs,
    isTemporarilyPaused,
    shouldAutoplay,
    slideCount,
  ]);

  function handlePointerEnter() {
    if (data.carousel.pauseOnHover) {
      setIsPointerPaused(true);
    }
  }

  function handlePointerLeave() {
    setIsPointerPaused(false);
  }

  function handleFocus() {
    if (data.carousel.pauseOnFocus) {
      setIsFocusPaused(true);
    }
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextFocusedElement = event.relatedTarget;

    if (
      !nextFocusedElement ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsFocusPaused(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (slideCount <= 1) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPreviousSlide();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNextSlide();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      goToSlide(slideCount - 1);
    }
  }

  if (!activeSlide) {
    return null;
  }

  return (
    <section
      aria-label={data.carousel.ariaLabel}
      aria-roledescription="carousel"
      className={getClassName("gb-hero-carousel", className)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <div className="gb-hero-carousel__container">
        <div className="gb-hero-carousel__shell">
          <BannerSkeleton
            className={getClassName(
              "gb-hero-carousel__skeleton",
              isActiveSlideLoaded && "gb-hero-carousel__skeleton--hidden",
            )}
            showDots={slideCount > 1}
          />

          <article
            aria-busy={!isActiveSlideLoaded}
            aria-label={`${safeActiveIndex + 1} of ${slideCount}`}
            aria-live={isAutoplayPaused ? "polite" : "off"}
            aria-roledescription="slide"
            className="gb-hero-carousel__slide"
            id={`${carouselId}-slide`}
            key={activeSlide.id}
            role="tabpanel"
          >
            <HeroBannerImage
              isLoaded={isActiveSlideLoaded}
              onLoad={handleSlideImageLoad}
              slide={activeSlide}
            />
          </article>

          {slideCount > 1 && isActiveSlideLoaded ? (
            <div
              aria-label="Choose featured banner"
              className="gb-hero-carousel__dots"
              role="tablist"
            >
              {slides.map((slide, index) => {
                const isActive = index === safeActiveIndex;

                return (
                  <button
                    aria-controls={`${carouselId}-slide`}
                    aria-label={`Show banner ${index + 1}: ${
                      slide.ariaLabel ?? slide.image.alt
                    }`}
                    aria-selected={isActive}
                    className={getClassName(
                      "gb-hero-carousel__dot",
                      isActive && "gb-hero-carousel__dot--active",
                    )}
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    role="tab"
                    type="button"
                  >
                    <span className="gb-hero-carousel__dot-label">
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          {data.carousel.autoplay && slideCount > 1 ? (
            <button
              aria-label={
                isAutoplayPaused
                  ? "Resume featured banner autoplay"
                  : "Pause featured banner autoplay"
              }
              className="gb-hero-carousel__pause-button"
              onClick={() => setIsManualPaused((currentValue) => !currentValue)}
              type="button"
            >
              {isAutoplayPaused ? "Play" : "Pause"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}