import { HeroSection } from "@/components/sections/hero";
import { TrustBenefitsSection } from "@/components/sections/trust-benefits";
import { ShopByCategorySection } from "@/components/sections/shop-by-category";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBenefitsSection />
      <ShopByCategorySection />
    </>
  );
}