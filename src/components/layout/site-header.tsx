import { Suspense } from "react";

import { HeaderClient } from "./header/header-client";
import { headerData, headerSearchConfig } from "./header/header-data";

export function SiteHeader() {
  return (
    <Suspense fallback={null}>
      <HeaderClient data={headerData} searchConfig={headerSearchConfig} />
    </Suspense>
  );
}