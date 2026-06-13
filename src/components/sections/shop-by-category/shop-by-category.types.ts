export type ShopByCategoryImage = Readonly<{
  src: string;
  alt: string;
}>;

export type ShopByCategoryItem = Readonly<{
  id: string;
  title: string;
  href: string;
  image: ShopByCategoryImage;
}>;

export type ShopByCategorySectionViewModel = Readonly<{
  headingId: string;
  heading: string;
  ariaLabel: string;
  viewAllLabel: string;
  viewAllHref: string;
  items: readonly ShopByCategoryItem[];
}>;