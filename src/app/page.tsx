import { HeroSection } from "@/components/sections/hero";
import { TrustBenefitsSection } from "@/components/sections/trust-benefits";
import { ShopByCategorySection } from "@/components/sections/shop-by-category";
import { FlashDealsSection } from "@/components/sections/flash-deals";
import { BestSellingSection } from "@/components/sections/best-selling";
import { FeaturedBrandsSection } from "@/components/sections/featured-brands";
import { NewArrivalsSection } from "@/components/sections/new-arrivals";
import { PromoBannerGridSection } from "@/components/sections/promo-banner-grid";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBenefitsSection />
      <ShopByCategorySection />
      <FlashDealsSection />
      <BestSellingSection />
      <FeaturedBrandsSection />
      <NewArrivalsSection />
      <PromoBannerGridSection />
    </>
  );
}