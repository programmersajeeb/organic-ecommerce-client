export type HeaderIconKey =
  | "bell"
  | "camera"
  | "cart"
  | "categories"
  | "check"
  | "chevronDown"
  | "close"
  | "computer"
  | "globe"
  | "headphone"
  | "help"
  | "home"
  | "laptop"
  | "menu"
  | "mobile"
  | "moon"
  | "more"
  | "returns"
  | "search"
  | "shield"
  | "sports"
  | "sun"
  | "support"
  | "track"
  | "truck"
  | "user"
  | "watch"
  | "wishlist";

export type HeaderPanelKey =
  | "language"
  | "categories"
  | "account"
  | "notifications"
  | "more";

export type HeaderPanel = HeaderPanelKey | null;

export type HeaderLanguageId = "en" | "bn" | (string & {});

export type HeaderSearchSource = "desktop" | "mobile";

export type HeaderEntity = Readonly<{
  id: string;
}>;

export type HeaderLink = HeaderEntity &
  Readonly<{
    label: string;
    href: string;
    ariaLabel?: string;
  }>;

export type HeaderIconLink = HeaderLink &
  Readonly<{
    icon: HeaderIconKey;
  }>;

export type HeaderTrustItem = HeaderEntity &
  Readonly<{
    label: string;
    icon: HeaderIconKey;
    href?: string;
    ariaLabel?: string;
  }>;

export type HeaderLanguageOption = Readonly<{
  id: HeaderLanguageId;
  label: string;
  nativeLabel: string;
}>;

export type HeaderCategory = HeaderEntity &
  Readonly<{
    name: string;
    slug: string;
    href: string;
    icon: HeaderIconKey;
    isFeatured?: boolean;
  }>;

export type HeaderAccountLink = HeaderLink &
  Readonly<{
    requiresAuth?: boolean;
    description?: string;
  }>;

export type HeaderNotification = HeaderEntity &
  Readonly<{
    title: string;
    description: string;
    href: string;
    icon: HeaderIconKey;
    createdAtLabel: string;
    isUnread?: boolean;
    ariaLabel?: string;
  }>;

export type HeaderCartSummary = Readonly<{
  itemCount: number;
  totalLabel: string;
  cartHref: string;
  checkoutHref?: string;
}>;

export type HeaderUserState = Readonly<{
  isAuthenticated: boolean;
  displayName?: string;
}>;

export type HeaderCounts = Readonly<{
  notifications: number;
  wishlist: number;
}>;

export type HeaderSearchConfig = Readonly<{
  desktopInputName: string;
  mobileInputName: string;
  placeholder: string;
  emptyQueryMessage: string;
  searchHref: string;
}>;

export type HeaderSearchPayload = Readonly<{
  query: string;
  source: HeaderSearchSource;
}>;

export type HeaderViewModel = Readonly<{
  trustItems: readonly HeaderTrustItem[];
  utilityLinks: readonly HeaderIconLink[];
  languageOptions: readonly HeaderLanguageOption[];
  primaryCategories: readonly HeaderCategory[];
  moreCategories: readonly HeaderCategory[];
  accountLinks: readonly HeaderAccountLink[];
  notifications: readonly HeaderNotification[];
  cartSummary: HeaderCartSummary;
  user: HeaderUserState;
  counts: HeaderCounts;
}>;