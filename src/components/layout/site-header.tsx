import { CategoryNavigation } from "@/components/layout/category-navigation";
import { MainHeader } from "@/components/layout/main-header";
import { TopAnnouncementBar } from "@/components/layout/top-announcement-bar";

export function SiteHeader() {
  return (
    <header className="gb-shop-header">
      <TopAnnouncementBar />
      <MainHeader />
      <CategoryNavigation />
    </header>
  );
}