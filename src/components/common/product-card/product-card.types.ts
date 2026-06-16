export type ProductCardBadgeTone =
  | "sale"
  | "new"
  | "hot"
  | "stock"
  | "neutral";

export type ProductCardImage = Readonly<{
  src: string;
  alt: string;
}>;

export type ProductCardPrice = Readonly<{
  current: string;
  old?: string;
  discountLabel?: string;
}>;

export type ProductCardRating = Readonly<{
  value: number;
  count: number;
  label?: string;
}>;

export type ProductCardBadge = Readonly<{
  label: string;
  tone?: ProductCardBadgeTone;
}>;

export type ProductCardProduct = Readonly<{
  id: string;
  title: string;
  href: string;
  image: ProductCardImage;
  price: ProductCardPrice;
  rating?: ProductCardRating;
  badge?: ProductCardBadge;
  brand?: string;
  category?: string;
  inStock?: boolean;
}>;

export type ProductCardProps = Readonly<{
  product: ProductCardProduct;
  priority?: boolean;
  showWishlist?: boolean;
  showBadge?: boolean;
  showRating?: boolean;
  showCartAction?: boolean;
  className?: string | undefined;
  onAddToCart?: ((product: ProductCardProduct) => void) | undefined;
  onToggleWishlist?: ((product: ProductCardProduct) => void) | undefined;
}>;