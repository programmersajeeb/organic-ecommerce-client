import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Gift,
  Leaf,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

type CollectionSlugPageProps = Readonly<{
  params: Promise<{
    slug?: string[];
  }>;
}>;

type CollectionInfo = Readonly<{
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  highlights: ReadonlyArray<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  categories: ReadonlyArray<{
    label: string;
    href: string;
  }>;
}>;

const collectionInfoMap: Record<string, CollectionInfo> = {
  "eid-2026": {
    title: "Eid 2026 Collection",
    label: "Seasonal Collection",
    description:
      "A curated organic grocery collection for Eid gifting, family meals, premium dates, honey, spices and festive essentials.",
    icon: Gift,
    href: "/collections/eid-2026",
    highlights: [
      {
        title: "Gift-ready products",
        description: "Perfect for family, guests and Eid gifting.",
        icon: Gift,
      },
      {
        title: "Premium essentials",
        description: "Dates, honey, spices and organic pantry picks.",
        icon: Star,
      },
      {
        title: "Fast campaign flow",
        description: "Ready for future campaign banners and stock logic.",
        icon: Truck,
      },
    ],
    categories: [
      { label: "Premium Dates", href: "/categories/dates/premium" },
      { label: "Honey Gift Pack", href: "/categories/honey/gift-pack" },
      { label: "Spice Bundle", href: "/categories/spices/mixes" },
      { label: "Organic Gift Packs", href: "/categories/gift-packs" },
    ],
  },
  "mango-pre-order": {
    title: "Mango Pre-Order",
    label: "Seasonal Pre-Order",
    description:
      "A seasonal collection page for mango pre-orders with future-ready delivery slots, stock status and booking flow.",
    icon: Leaf,
    href: "/collections/mango-pre-order",
    highlights: [
      {
        title: "Seasonal booking",
        description: "Prepared for pre-order date and delivery schedule.",
        icon: CalendarDays,
      },
      {
        title: "Fresh collection",
        description: "Ready for mango variety, grade and packaging data.",
        icon: Leaf,
      },
      {
        title: "Order-ready UX",
        description: "Can connect with cart, checkout and order tracking.",
        icon: ShoppingBag,
      },
    ],
    categories: [
      { label: "Mango", href: "/categories/fruits/mango" },
      { label: "Seasonal Fruits", href: "/categories/fruits/seasonal" },
      { label: "Fruit Box", href: "/categories/fruits/family-box" },
      { label: "All Fruits", href: "/categories/fruits" },
    ],
  },
};

const fallbackCollection: CollectionInfo = {
  title: "Organic Collection",
  label: "Collection",
  description:
    "This collection page is prepared for future campaign products, filters, banners, offers and backend-powered merchandising.",
  icon: Sparkles,
  href: "/collections",
  highlights: [
    {
      title: "Campaign-ready",
      description: "Prepared for dynamic collection data.",
      icon: Sparkles,
    },
    {
      title: "Product-ready",
      description: "Ready for product listing and campaign rules.",
      icon: PackageCheck,
    },
    {
      title: "Conversion-friendly",
      description: "Clean layout for premium ecommerce shopping.",
      icon: Star,
    },
  ],
  categories: [
    { label: "Honey", href: "/categories/honey" },
    { label: "Dates", href: "/categories/dates" },
    { label: "Spices", href: "/categories/spices" },
    { label: "Fruits", href: "/categories/fruits" },
  ],
};

const commonCollectionPaths = [["eid-2026"], ["mango-pre-order"]];

function formatSlugLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getCollectionInfo(slug: string[]) {
  const collectionKey = slug[0] ?? "";
  return collectionInfoMap[collectionKey] ?? fallbackCollection;
}

export function generateStaticParams() {
  return commonCollectionPaths.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const collectionInfo = getCollectionInfo(slug);

  return {
    title: collectionInfo.title,
    description: collectionInfo.description,
  };
}

export default async function CollectionSlugPage({
  params,
}: CollectionSlugPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const collectionInfo = getCollectionInfo(slug);
  const Icon = collectionInfo.icon;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    ...slug.map((segment, index) => ({
      label: formatSlugLabel(segment),
      href: `/collections/${slug.slice(0, index + 1).join("/")}`,
    })),
  ];

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
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">
              {collectionInfo.label}
            </span>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Icon
                  aria-hidden="true"
                  focusable="false"
                  className="size-8"
                />
              </span>

              <div>
                <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                  {collectionInfo.title}
                </h1>

                <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-muted-foreground">
                  {collectionInfo.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/categories" className="gb-btn-primary">
                    Shop categories
                  </Link>

                  <Link href="/" className="gb-btn-outline">
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="gb-card gb-card-muted p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PackageCheck
                  aria-hidden="true"
                  focusable="false"
                  className="size-5"
                />
              </span>

              <div>
                <h2 className="text-base font-black text-foreground">
                  Collection Ready
                </h2>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Prepared for backend campaign products.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Future integration
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                Later this page can show products, stock status, campaign
                banner, expiry date, sorting and filters.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {collectionInfo.highlights.map((item) => {
            const HighlightIcon = item.icon;

            return (
              <div key={item.title} className="gb-card gb-card-muted p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <HighlightIcon
                    aria-hidden="true"
                    focusable="false"
                    className="size-5"
                  />
                </span>

                <h2 className="mt-4 text-lg font-black text-foreground">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Related categories
            </h2>

            <Link href="/categories" className="gb-btn-outline">
              View all categories
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {collectionInfo.categories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="gb-card gb-card-interactive p-5"
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
                  Explore products, bundles and organic grocery offers.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                  Explore
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

        <div className="mt-8 gb-card border-dashed p-6 text-center">
          <h2 className="text-xl font-black text-foreground">
            Collection products will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This placeholder prevents 404 and keeps campaign navigation smooth.
            Later we can connect product listing, campaign offers, countdown,
            stock status, add-to-cart and analytics.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="gb-btn-outline">
              Browse categories
            </Link>

            <Link href="/" className="gb-btn-primary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}