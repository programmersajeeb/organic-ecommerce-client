import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Grid3X3,
  Leaf,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";

type CategoryRoutePageProps = Readonly<{
  params: Promise<{
    slug?: string[];
  }>;
}>;

type CategoryInfo = Readonly<{
  title: string;
  description: string;
  parentHref: string;
  subcategories: ReadonlyArray<{
    label: string;
    href: string;
  }>;
}>;

const categoryInfoMap: Record<string, CategoryInfo> = {
  honey: {
    title: "Honey",
    description:
      "Pure, raw and naturally sourced honey collections for daily wellness.",
    parentHref: "/categories/honey",
    subcategories: [
      { label: "Raw Honey", href: "/categories/honey/raw-honey" },
      { label: "Forest Honey", href: "/categories/honey/forest-honey" },
      { label: "Black Seed Honey", href: "/categories/honey/black-seed" },
      { label: "Gift Pack", href: "/categories/honey/gift-pack" },
    ],
  },
  "oil-ghee": {
    title: "Oil & Ghee",
    description:
      "Cold-pressed oils, pure ghee and kitchen essentials for healthy cooking.",
    parentHref: "/categories/oil-ghee",
    subcategories: [
      { label: "Mustard Oil", href: "/categories/oil-ghee/mustard-oil" },
      { label: "Cow Ghee", href: "/categories/oil-ghee/cow-ghee" },
      { label: "Cold Pressed", href: "/categories/oil-ghee/cold-pressed" },
      { label: "Family Pack", href: "/categories/oil-ghee/family-pack" },
    ],
  },
  dates: {
    title: "Dates",
    description: "Premium dates, gift packs and family value packs.",
    parentHref: "/categories/dates",
    subcategories: [
      { label: "Ajwa Dates", href: "/categories/dates/ajwa" },
      { label: "Medjool Dates", href: "/categories/dates/medjool" },
      { label: "Mabroom Dates", href: "/categories/dates/mabroom" },
      { label: "Gift Box", href: "/categories/dates/gift-box" },
    ],
  },
  spices: {
    title: "Spices",
    description:
      "Fresh spices, whole spices and ready spice mixes for everyday cooking.",
    parentHref: "/categories/spices",
    subcategories: [
      { label: "Turmeric Powder", href: "/categories/spices/turmeric-powder" },
      { label: "Chili Powder", href: "/categories/spices/chili-powder" },
      { label: "Biryani Masala", href: "/categories/spices/biryani-masala" },
      { label: "Whole Spices", href: "/categories/spices/whole" },
    ],
  },
  "rice-lentils": {
    title: "Rice & Lentils",
    description: "Premium rice, lentils and daily pantry staples.",
    parentHref: "/categories/rice-lentils",
    subcategories: [
      { label: "Basmati Rice", href: "/categories/rice-lentils/basmati-rice" },
      { label: "Red Lentil", href: "/categories/rice-lentils/red-lentil" },
      { label: "Mung Dal", href: "/categories/rice-lentils/mung-dal" },
      { label: "Family Pack", href: "/categories/rice-lentils/family-pack" },
    ],
  },
  fruits: {
    title: "Fruits",
    description: "Fresh seasonal fruits and organic fruit boxes.",
    parentHref: "/categories/fruits",
    subcategories: [
      { label: "Mango", href: "/categories/fruits/mango" },
      { label: "Banana", href: "/categories/fruits/banana" },
      { label: "Apple", href: "/categories/fruits/apple" },
      { label: "Family Fruit Box", href: "/categories/fruits/family-box" },
    ],
  },
  "health-foods": {
    title: "Health Foods",
    description: "Natural wellness picks for a healthy lifestyle.",
    parentHref: "/categories/health-foods",
    subcategories: [
      { label: "Super Foods", href: "/categories/health-foods/super-foods" },
      { label: "Seeds", href: "/categories/health-foods/seeds" },
      { label: "Healthy Snacks", href: "/categories/health-foods/snacks" },
    ],
  },
  "gift-packs": {
    title: "Gift Packs",
    description:
      "Curated organic gift boxes for family, guests and special moments.",
    parentHref: "/categories/gift-packs",
    subcategories: [
      { label: "Honey Gift Box", href: "/categories/gift-packs/honey" },
      { label: "Dates Gift Box", href: "/categories/gift-packs/dates" },
      { label: "Organic Combo", href: "/categories/gift-packs/organic-combo" },
    ],
  },
};

const fallbackCategory: CategoryInfo = {
  title: "Organic Products",
  description:
    "Browse natural grocery products from a clean and scalable category page.",
  parentHref: "/categories",
  subcategories: [
    { label: "Honey", href: "/categories/honey" },
    { label: "Oil & Ghee", href: "/categories/oil-ghee" },
    { label: "Dates", href: "/categories/dates" },
    { label: "Spices", href: "/categories/spices" },
  ],
};

const commonCategoryPaths = [
  ["honey"],
  ["honey", "raw-honey"],
  ["honey", "mustard-flower"],
  ["honey", "black-seed"],
  ["honey", "forest-honey"],
  ["honey", "family-pack"],
  ["honey", "monthly-pack"],
  ["honey", "gift-pack"],
  ["honey", "breakfast"],
  ["honey", "drinks"],
  ["honey", "wellness"],
  ["honey", "organic"],
  ["honey", "new-arrivals"],
  ["honey", "best-sellers"],

  ["oil-ghee"],
  ["oil-ghee", "cooking-oil"],
  ["oil-ghee", "mustard-oil"],
  ["oil-ghee", "olive-oil"],
  ["oil-ghee", "coconut-oil"],
  ["oil-ghee", "sesame-oil"],
  ["oil-ghee", "ghee"],
  ["oil-ghee", "cow-ghee"],
  ["oil-ghee", "traditional-ghee"],
  ["oil-ghee", "premium-ghee"],
  ["oil-ghee", "cold-pressed"],
  ["oil-ghee", "family-pack"],
  ["oil-ghee", "organic"],
  ["oil-ghee", "new-arrivals"],
  ["oil-ghee", "best-sellers"],

  ["dates"],
  ["dates", "ajwa"],
  ["dates", "medjool"],
  ["dates", "mabroom"],
  ["dates", "sukkari"],
  ["dates", "250g"],
  ["dates", "500g"],
  ["dates", "1kg"],
  ["dates", "gift-box"],
  ["dates", "ramadan"],
  ["dates", "family-bundle"],
  ["dates", "premium"],
  ["dates", "gift-pack"],
  ["dates", "best-sellers"],

  ["spices"],
  ["spices", "ground"],
  ["spices", "turmeric-powder"],
  ["spices", "chili-powder"],
  ["spices", "cumin-powder"],
  ["spices", "coriander-powder"],
  ["spices", "garam-masala"],
  ["spices", "whole"],
  ["spices", "bay-leaf"],
  ["spices", "cinnamon"],
  ["spices", "cardamom"],
  ["spices", "cloves"],
  ["spices", "black-pepper"],
  ["spices", "mixes"],
  ["spices", "biryani-masala"],
  ["spices", "chaat-masala"],
  ["spices", "panch-phoron"],
  ["spices", "curry-masala"],
  ["spices", "organic"],
  ["spices", "new-arrivals"],
  ["spices", "best-sellers"],

  ["rice-lentils"],
  ["rice-lentils", "rice"],
  ["rice-lentils", "basmati-rice"],
  ["rice-lentils", "chinigura-rice"],
  ["rice-lentils", "miniket-rice"],
  ["rice-lentils", "atop-rice"],
  ["rice-lentils", "lentils"],
  ["rice-lentils", "red-lentil"],
  ["rice-lentils", "mung-dal"],
  ["rice-lentils", "chickpea"],
  ["rice-lentils", "family-pack"],
  ["rice-lentils", "monthly-pack"],
  ["rice-lentils", "combo-pack"],
  ["rice-lentils", "premium"],
  ["rice-lentils", "value-packs"],
  ["rice-lentils", "best-sellers"],

  ["fruits"],
  ["fruits", "seasonal"],
  ["fruits", "mango"],
  ["fruits", "banana"],
  ["fruits", "apple"],
  ["fruits", "orange"],
  ["fruits", "boxes"],
  ["fruits", "family-box"],
  ["fruits", "office-box"],
  ["fruits", "gift-box"],
  ["fruits", "organic"],
  ["fruits", "organic-mango"],
  ["fruits", "organic-banana"],
  ["fruits", "organic-apple"],
  ["fruits", "new-season"],
  ["fruits", "best-sellers"],

  ["health-foods"],
  ["health-foods", "super-foods"],
  ["health-foods", "seeds"],
  ["health-foods", "snacks"],

  ["gift-packs"],
  ["gift-packs", "honey"],
  ["gift-packs", "dates"],
  ["gift-packs", "organic-combo"],
];

function formatSlugLabel(value: string) {
  return value
    .split("-")
    .map((word) => {
      if (word === "and") {
        return "&";
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getCategoryInfo(slug: string[]) {
  const categoryKey = slug[0] ?? "";
  return categoryInfoMap[categoryKey] ?? fallbackCategory;
}

function getPageTitle(slug: string[]) {
  if (slug.length === 0) {
    return "Category";
  }

  const lastSegment = slug.at(-1);

  if (!lastSegment) {
    return "Category";
  }

  return formatSlugLabel(lastSegment);
}

export function generateStaticParams() {
  return commonCategoryPaths.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryRoutePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const categoryInfo = getCategoryInfo(slug);
  const pageTitle = getPageTitle(slug);

  return {
    title:
      pageTitle === categoryInfo.title
        ? categoryInfo.title
        : `${pageTitle} | ${categoryInfo.title}`,
    description: categoryInfo.description,
  };
}

export default async function CategorySlugPage({
  params,
}: CategoryRoutePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const categoryInfo = getCategoryInfo(slug);
  const pageTitle = getPageTitle(slug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    ...slug.map((segment, index) => ({
      label: formatSlugLabel(segment),
      href: `/categories/${slug.slice(0, index + 1).join("/")}`,
    })),
  ];

  const isParentCategory = slug.length === 1;

  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted-foreground">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <li key={item.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="text-foreground">{item.label}</span>
                  ) : (
                    <>
                      <Link
                        href={item.href}
                        className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {item.label}
                      </Link>
                      <ChevronRight
                        aria-hidden="true"
                        focusable="false"
                        className="size-4"
                      />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="gb-card p-6 sm:p-8">
            <span className="gb-account-page__eyebrow">
              {isParentCategory ? "Category" : categoryInfo.title}
            </span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
              {pageTitle}
            </h1>

            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-muted-foreground">
              {categoryInfo.description} This page is prepared for future
              backend/API powered product listing, filters, sorting and
              pagination.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/categories" className="gb-btn-outline">
                <Grid3X3
                  aria-hidden="true"
                  focusable="false"
                  className="size-4"
                />
                All categories
              </Link>

              <Link href="/search" className="gb-btn-primary">
                <Search
                  aria-hidden="true"
                  focusable="false"
                  className="size-4"
                />
                Search products
              </Link>
            </div>
          </div>

          <aside className="gb-card gb-card-muted p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck
                  aria-hidden="true"
                  focusable="false"
                  className="size-5"
                />
              </span>

              <div>
                <h2 className="text-base font-black text-foreground">
                  Organic Promise
                </h2>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Clean category structure with trust-first shopping flow.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-background/70 p-4">
                <PackageCheck
                  aria-hidden="true"
                  focusable="false"
                  className="size-5 text-primary"
                />
                <p className="mt-2 text-sm font-bold leading-6 text-muted-foreground">
                  Future-ready for stock, price, discount and delivery data.
                </p>
              </div>

              <div className="rounded-2xl bg-background/70 p-4">
                <Star
                  aria-hidden="true"
                  focusable="false"
                  className="size-5 text-primary"
                />
                <p className="mt-2 text-sm font-bold leading-6 text-muted-foreground">
                  Ready for bestseller, featured and campaign sections.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="gb-card h-max p-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                aria-hidden="true"
                focusable="false"
                className="size-5 text-primary"
              />
              <h2 className="text-lg font-black text-foreground">Filters</h2>
            </div>

            <div className="mt-5 grid gap-3">
              {["Availability", "Price Range", "Organic", "Best Selling"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex min-h-11 items-center justify-between rounded-xl border border-border bg-background px-3 text-sm font-bold text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{item}</span>
                    <ChevronRight
                      aria-hidden="true"
                      focusable="false"
                      className="size-4"
                    />
                  </button>
                ),
              )}
            </div>
          </aside>

          <div className="grid gap-6">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  Popular in {categoryInfo.title}
                </h2>

                <Link href={categoryInfo.parentHref} className="gb-btn-outline">
                  View parent category
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categoryInfo.subcategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="gb-card gb-card-interactive p-5 text-decoration-none"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Leaf
                        aria-hidden="true"
                        focusable="false"
                        className="size-5"
                      />
                    </span>

                    <h3 className="mt-4 text-lg font-black text-foreground">
                      {item.label}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                      Explore curated products, bundles and offers.
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                      Shop now
                      <ChevronRight
                        aria-hidden="true"
                        focusable="false"
                        className="size-4"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="gb-card border-dashed p-6 text-center">
              <h2 className="text-xl font-black text-foreground">
                Product listing will connect here
              </h2>

              <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
                This placeholder prevents 404 and keeps the ecommerce flow
                smooth. Later we can connect API data, filters, sorting,
                pagination, wishlist and add-to-cart functionality here.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/categories" className="gb-btn-outline">
                  Back to categories
                </Link>

                <Link href="/" className="gb-btn-primary">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}