import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BadgePercent,
  ChevronRight,
  Clock3,
  Gift,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

type OfferSlugPageProps = Readonly<{
  params: Promise<{
    slug?: string[];
  }>;
}>;

type OfferInfo = Readonly<{
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  benefits: ReadonlyArray<string>;
}>;

const offerInfoMap: Record<string, OfferInfo> = {
  "free-delivery": {
    title: "Free Delivery",
    label: "Delivery Offer",
    description:
      "Get free delivery on eligible organic grocery orders. This campaign page is ready for future rules like minimum order value, delivery area and expiry date.",
    icon: Truck,
    benefits: [
      "Free delivery on eligible orders",
      "Perfect for repeat grocery customers",
      "Ready for backend-driven delivery rules",
    ],
  },
  "bundle-deals": {
    title: "Organic Bundle Deals",
    label: "Bundle Offer",
    description:
      "Save more with curated organic grocery bundles like honey, dates, spices, rice, lentils, oil and ghee.",
    icon: Gift,
    benefits: [
      "Great for family grocery planning",
      "Supports combo and value pack campaigns",
      "Ready for dynamic product bundle data",
    ],
  },
  "best-seller-discounts": {
    title: "Best Seller Discounts",
    label: "Popular Offer",
    description:
      "Explore limited-time discounts on popular organic products and frequently purchased essentials.",
    icon: BadgePercent,
    benefits: [
      "Highlights high-converting products",
      "Ready for stock and discount integration",
      "Useful for homepage and campaign linking",
    ],
  },
  "monthly-grocery-pack": {
    title: "Monthly Grocery Pack",
    label: "Value Pack",
    description:
      "Smart monthly packs for daily essentials like rice, lentils, oil, spices and family grocery needs.",
    icon: PackageCheck,
    benefits: [
      "Useful for recurring grocery buyers",
      "Ready for subscription-style UX",
      "Can connect with cart bundle logic later",
    ],
  },
};

const fallbackOffer: OfferInfo = {
  title: "Organic Grocery Offer",
  label: "Offer",
  description:
    "This offer page is prepared for future campaign data, discount rules, coupon code, expiry time and product listing.",
  icon: BadgePercent,
  benefits: [
    "Future-ready campaign structure",
    "Clean route-safe offer page",
    "Prepared for ecommerce backend integration",
  ],
};

const commonOfferPaths = [
  ["free-delivery"],
  ["bundle-deals"],
  ["best-seller-discounts"],
  ["monthly-grocery-pack"],
];

function formatSlugLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getOfferInfo(slug: string[]) {
  const offerKey = slug[0] ?? "";
  return offerInfoMap[offerKey] ?? fallbackOffer;
}

export function generateStaticParams() {
  return commonOfferPaths.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: OfferSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const offerInfo = getOfferInfo(slug);

  return {
    title: offerInfo.title,
    description: offerInfo.description,
  };
}

export default async function OfferSlugPage({ params }: OfferSlugPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const offerInfo = getOfferInfo(slug);
  const Icon = offerInfo.icon;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Offers", href: "/offers" },
    ...slug.map((segment, index) => ({
      label: formatSlugLabel(segment),
      href: `/offers/${slug.slice(0, index + 1).join("/")}`,
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
            <span className="gb-account-page__eyebrow">{offerInfo.label}</span>

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
                  {offerInfo.title}
                </h1>

                <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-muted-foreground">
                  {offerInfo.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/categories" className="gb-btn-primary">
                    Shop now
                  </Link>

                  <Link href="/offers" className="gb-btn-outline">
                    All offers
                  </Link>
                </div>
              </div>
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
                  Campaign Ready
                </h2>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Prepared for backend offer rules.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-background/70 p-4">
                <Clock3
                  aria-hidden="true"
                  focusable="false"
                  className="size-5 text-primary"
                />
                <p className="mt-2 text-sm font-bold leading-6 text-muted-foreground">
                  Later we can show campaign expiry, coupon code and stock
                  limit here.
                </p>
              </div>

              <div className="rounded-2xl bg-background/70 p-4">
                <PackageCheck
                  aria-hidden="true"
                  focusable="false"
                  className="size-5 text-primary"
                />
                <p className="mt-2 text-sm font-bold leading-6 text-muted-foreground">
                  Ready for product listing, add-to-cart and campaign tracking.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {offerInfo.benefits.map((benefit) => (
            <div key={benefit} className="gb-card gb-card-muted p-5">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BadgePercent
                  aria-hidden="true"
                  focusable="false"
                  className="size-5"
                />
              </span>

              <p className="mt-4 text-sm font-bold leading-6 text-muted-foreground">
                {benefit}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 gb-card border-dashed p-6 text-center">
          <h2 className="text-xl font-black text-foreground">
            Offer products will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This placeholder prevents 404 and keeps campaign navigation smooth.
            Later this page can connect offer products, discount calculation,
            coupon code, campaign timer and analytics.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/offers" className="gb-btn-outline">
              Back to offers
            </Link>

            <Link href="/categories" className="gb-btn-primary">
              Browse categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}