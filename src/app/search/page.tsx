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

type SearchProduct = {
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "error";
  keywords: string[];
};

const searchableProducts: SearchProduct[] = [
  {
    title: "Sundarban Honey 1kg",
    image: "/placeholder-product.png",
    price: "৳2,300",
    oldPrice: "৳2,500",
    badge: "Save 8%",
    keywords: ["honey", "sundarban", "raw honey", "organic honey"],
  },
  {
    title: "Deshi Mustard Oil 5 liter",
    image: "/placeholder-product.png",
    price: "৳1,550",
    badge: "Best Selling",
    badgeType: "warning",
    keywords: ["oil", "mustard oil", "deshi oil", "cooking oil"],
  },
  {
    title: "Premium Dates 1kg",
    image: "/placeholder-product.png",
    price: "৳1,250",
    badge: "Premium",
    keywords: ["dates", "premium dates", "ajwa", "medjool"],
  },
  {
    title: "Organic Spice Combo",
    image: "/placeholder-product.png",
    price: "৳850",
    oldPrice: "৳950",
    badge: "Organic",
    keywords: ["spices", "masala", "turmeric", "chili", "cumin"],
  },
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getSearchQuery(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = getSearchQuery(resolvedSearchParams?.q);
  const normalizedQuery = normalizeText(query);

  const searchResults = normalizedQuery
    ? searchableProducts.filter((product) => {
        const searchableText = normalizeText(
          [product.title, ...product.keywords].join(" "),
        );

        return searchableText.includes(normalizedQuery);
      })
    : [];

  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Product Search</p>

          <h1 className="gb-account-page__title">
            {normalizedQuery
              ? `Search results for “${query}”`
              : "Search organic products"}
          </h1>

          <p className="gb-account-page__description">
            Find honey, dates, spices, oil, ghee, rice, lentils and other
            organic grocery products. This search page is ready for future
            backend/API powered product search.
          </p>

          <div className="mt-6">
            <SearchBox
              id="search-page-input"
              label="Search organic products"
              placeholder="Search honey, dates, spices, oil..."
            />
          </div>

          {!normalizedQuery ? (
            <div className="gb-account-page__actions">
              <Link href="/categories" className="gb-btn-primary">
                Browse categories
              </Link>

              <Link href="/" className="gb-btn-outline">
                Continue shopping
              </Link>
            </div>
          ) : null}

          {normalizedQuery && searchResults.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
              <Search
                className="mx-auto size-8 text-muted-foreground"
                aria-hidden="true"
                focusable="false"
              />

              <h2 className="mt-4 text-xl font-black text-foreground">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-muted-foreground">
                Try searching for honey, dates, spices, oil, ghee, rice or
                lentils.
              </p>

              <div className="mt-5">
                <Link href="/categories" className="gb-btn-primary">
                  Browse all categories
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        {searchResults.length > 0 ? (
          <div className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                {searchResults.length} product
                {searchResults.length > 1 ? "s" : ""} found
              </h2>

              <Link href="/categories" className="gb-btn-outline">
                View all categories
              </Link>
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