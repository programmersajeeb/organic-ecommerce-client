import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { ProductCard } from "@/components/common/product-card";
import { SearchBox } from "@/components/common/search-box";

export const metadata: Metadata = {
  title: "Search Products",
  description:
    "Search organic products like honey, dates, mangoes, spices, oil, ghee, rice and lentils at Ghorer Bazar.",
};

type SearchPageProps = Readonly<{
  searchParams?: Promise<{
    q?: string | string[];
  }>;
}>;

type SearchProduct = Readonly<{
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "error";
  keywords: ReadonlyArray<string>;
}>;

const searchableProducts: SearchProduct[] = [
  {
    title: "Sundarban Honey 1kg",
    image: "/placeholder-product.png",
    price: "৳2,300",
    oldPrice: "৳2,500",
    badge: "Save 8%",
    keywords: ["honey", "modhu", "sundarban", "raw honey", "organic honey"],
  },
  {
    title: "Deshi Mustard Oil 5 Liter",
    image: "/placeholder-product.png",
    price: "৳1,550",
    badge: "Best Selling",
    badgeType: "warning",
    keywords: ["oil", "mustard oil", "deshi oil", "cooking oil"],
  },
  {
    title: "Pure Cow Ghee 500g",
    image: "/placeholder-product.png",
    price: "৳1,150",
    badge: "Pure",
    keywords: ["ghee", "cow ghee", "pure ghee", "oil and ghee"],
  },
  {
    title: "Premium Dates 1kg",
    image: "/placeholder-product.png",
    price: "৳1,250",
    badge: "Premium",
    keywords: ["dates", "khejur", "premium dates", "ajwa", "medjool"],
  },
  {
    title: "Organic Spice Combo",
    image: "/placeholder-product.png",
    price: "৳850",
    oldPrice: "৳950",
    badge: "Organic",
    keywords: ["spices", "masala", "turmeric", "chili", "cumin"],
  },
  {
    title: "Premium Rice & Lentils Pack",
    image: "/placeholder-product.png",
    price: "৳1,890",
    badge: "Family Pack",
    keywords: ["rice", "lentils", "dal", "rice and lentils", "pantry"],
  },
  {
    title: "Seasonal Mango Pre-Order Box",
    image: "/placeholder-product.png",
    price: "৳1,700",
    badge: "New",
    badgeType: "warning",
    keywords: ["mango", "mango pre order", "fruits", "seasonal fruit"],
  },
  {
    title: "Fresh Fruit Family Box",
    image: "/placeholder-product.png",
    price: "৳1,350",
    badge: "Fresh",
    keywords: ["fruits", "fresh fruit", "banana", "apple", "seasonal"],
  },
];

const popularSearches = [
  "Honey",
  "Mustard Oil",
  "Dates",
  "Spices",
  "Rice",
  "Mango",
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9৳\u0980-\u09ff]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchQuery(value?: string | string[]) {
  const query = Array.isArray(value) ? value[0] : value;

  return query?.trim().slice(0, 80) ?? "";
}

function doesProductMatchQuery(product: SearchProduct, query: string) {
  const queryWords = normalizeText(query).split(" ").filter(Boolean);

  if (queryWords.length === 0) {
    return false;
  }

  const searchableText = normalizeText(
    [product.title, ...product.keywords].join(" "),
  );

  return queryWords.every((word) => searchableText.includes(word));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = getSearchQuery(resolvedSearchParams?.q);
  const normalizedQuery = normalizeText(query);

  const searchResults = normalizedQuery
    ? searchableProducts.filter((product) =>
        doesProductMatchQuery(product, query),
      )
    : [];

  const hasSearchResults = searchResults.length > 0;

  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page gb-search-page">
          <p className="gb-account-page__eyebrow">Product Search</p>

          <h1 className="gb-account-page__title">
            {normalizedQuery
              ? `Search results for “${query}”`
              : "Search organic products"}
          </h1>

          <p className="gb-account-page__description">
            Find honey, dates, spices, oil, ghee, rice, lentils, fruits and
            other organic grocery products. This page is ready for future
            backend/API powered product search.
          </p>

          <div className="gb-account-page__form">
            <SearchBox
              id="search-page-input"
              label="Search organic products"
              placeholder="Search honey, dates, spices, oil..."
            />
          </div>

          {!normalizedQuery ? (
            <>
              <div
                className="gb-search-page__quick-links"
                aria-label="Popular searches"
              >
                {popularSearches.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="gb-badge gb-badge-success"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="gb-account-page__actions">
                <Link href="/categories" className="gb-btn-primary">
                  Browse categories
                </Link>

                <Link href="/" className="gb-btn-outline">
                  Continue shopping
                </Link>
              </div>
            </>
          ) : null}

          {normalizedQuery && !hasSearchResults ? (
            <div className="gb-search-empty">
              <span className="gb-search-empty__icon" aria-hidden="true">
                <Search aria-hidden="true" focusable="false" />
              </span>

              <h2 className="gb-search-empty__title">No products found</h2>

              <p className="gb-search-empty__description">
                Try searching for honey, dates, spices, oil, ghee, rice,
                lentils or mango.
              </p>

              <div
                className="gb-search-empty__quick-links"
                aria-label="Suggested searches"
              >
                {popularSearches.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="gb-badge gb-badge-success"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="gb-search-empty__actions">
                <Link href="/categories" className="gb-btn-primary">
                  Browse all categories
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        {hasSearchResults ? (
          <div className="gb-search-results">
            <div className="gb-search-results__header">
              <div>
                <h2 className="gb-search-results__title">
                  {searchResults.length} product
                  {searchResults.length > 1 ? "s" : ""} found
                </h2>

                <p className="gb-search-results__meta">
                  Showing matching organic products for your search.
                </p>
              </div>

              <div className="gb-search-results__actions">
                <Link href="/categories" className="gb-btn-outline">
                  View all categories
                </Link>
              </div>
            </div>

            <div className="gb-product-grid">
              {searchResults.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}