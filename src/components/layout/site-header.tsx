import { HeaderClient } from "./header/header-client";
import { headerData, headerSearchConfig } from "./header/header-data";

export function SiteHeader() {
  return <HeaderClient data={headerData} searchConfig={headerSearchConfig} />;
}