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

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse seasonal organic grocery collections, Eid campaigns, mango pre-orders, gift packs and curated shopping collections.",
};

type CollectionCard = Readonly<{
  title: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
  highlights: ReadonlyArray<string>;
}>;

type CollectionBenefit = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

const collectionCards: CollectionCard[] = [
  {
    title: "Eid 2026 Collection",
    label: "Seasonal Collection",
    description:
      "Premium dates, honey, spices, gift packs and festive organic grocery essentials for Eid.",
    href: "/collections/eid-2026",
    icon: Gift,
    featured: true,
    highlights: ["Gift-ready picks", "Premium essentials", "Festive bundles"],
  },
  {
    title: "Mango Pre-Order",
    label: "Seasonal Pre-Order",
    description:
      "Fresh mango collection prepared for booking, delivery slot and seasonal stock updates.",
    href: "/collections/mango-pre-order",
    icon: Leaf,
    featured: true,
    highlights: ["Seasonal booking", "Fresh fruits", "Delivery-ready flow"],
  },
  {
    title: "Organic Gift Packs",
    label: "Gift Collection",
    description:
      "Curated gift boxes with honey, dates, spices and natural grocery products.",
    href: "/categories/gift-packs",
    icon: Sparkles,
    highlights: ["Family gifting", "Corporate gifts", "Premium packaging"],
  },
  {
    title: "Monthly Grocery Picks",
    label: "Value Collection",
    description:
      "Smart monthly essentials for rice, lentils, oil, ghee, spices and pantry needs.",
    href: "/offers/monthly-grocery-pack",
    icon: ShoppingBag,
    highlights: ["Value packs", "Daily essentials", "Family grocery"],
  },
];

const collectionBenefits: CollectionBenefit[] = [
  {
    title: "Campaign-ready",
    description:
      "Collections are ready for seasonal campaigns, offer banners and landing pages.",
    icon: CalendarDays,
  },
  {
    title: "Product-ready",
    description:
      "Later each collection can show product lists, stock, price, sorting and filters.",
    icon: PackageCheck,
  },
  {
    title: "Conversion-friendly",
    description:
      "Curated collections help customers buy faster with focused shopping journeys.",
    icon: Star,
  },
  {
    title: "Delivery-aware",
    description:
      "Seasonal collections can connect with delivery slots and pre-order timelines.",
    icon: Truck,
  },
];

export default function CollectionsPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="gb-account-page__eyebrow">Collections</span>

          <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Curated organic grocery collections
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
            Browse seasonal campaigns, pre-order collections, gift packs and
            value grocery picks from one clean collection hub.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/categories" className="gb-btn-primary">
              Shop categories
            </Link>

            <Link href="/offers" className="gb-btn-outline">
              View offers
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {collectionBenefits.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="gb-card gb-card-muted p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon
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
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {collectionCards.map((collection) => {
            const Icon = collection.icon;

            return (
              <article
                key={collection.href}
                className="gb-card gb-card-interactive flex h-full flex-col p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon
                      aria-hidden="true"
                      focusable="false"
                      className="size-6"
                    />
                  </span>

                  {collection.featured ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="mt-5">
                  <span className="text-xs font-black uppercase tracking-wide text-primary">
                    {collection.label}
                  </span>

                  <h2 className="mt-2 text-xl font-black tracking-tight text-foreground">
                    {collection.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    {collection.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-2">
                  {collection.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex min-h-10 items-center gap-3 rounded-xl bg-muted/40 px-3 text-sm font-bold text-muted-foreground"
                    >
                      <Sparkles
                        aria-hidden="true"
                        focusable="false"
                        className="size-4 shrink-0 text-primary"
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <Link href={collection.href} className="gb-btn-outline w-full">
                    View collection
                    <ChevronRight
                      aria-hidden="true"
                      focusable="false"
                      className="size-4"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 gb-card border-dashed p-6 text-center">
          <h2 className="text-xl font-black text-foreground">
            Dynamic collection system will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This page prevents 404 and keeps the campaign journey smooth. Later
            we can connect collection banners, product lists, campaign expiry,
            sorting, filters, stock and analytics.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="gb-btn-primary">
              Browse categories
            </Link>

            <Link href="/" className="gb-btn-outline">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}