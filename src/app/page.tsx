import { HeroSection } from "@/components/sections/hero";
import { TrustBenefitsSection } from "@/components/sections/trust-benefits";
import { ShopByCategorySection } from "@/components/sections/shop-by-category";
import { FlashDealsSection } from "@/components/sections/flash-deals";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBenefitsSection />
      <ShopByCategorySection />
      <FlashDealsSection />
    </>
  );
}