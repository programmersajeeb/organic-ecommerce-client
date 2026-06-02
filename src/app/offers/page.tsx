import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgePercent,
  ChevronRight,
  Clock3,
  Gift,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Offer Zone",
  description:
    "Explore organic grocery offers, bundle deals, free delivery campaigns and limited-time discounts.",
};

type OfferCard = Readonly<{
  title: string;
  description: string;
  href: string;
  label: string;
  icon: typeof BadgePercent;
  isFeatured?: boolean;
}>;

const offerCards: OfferCard[] = [
  {
    title: "Free Delivery",
    description: "Get free delivery on eligible organic grocery orders.",
    href: "/offers/free-delivery",
    label: "Delivery Offer",
    icon: Truck,
    isFeatured: true,
  },
  {
    title: "Organic Bundle Deals",
    description: "Save more with honey, dates, spices and pantry bundles.",
    href: "/offers/bundle-deals",
    label: "Bundle",
    icon: Gift,
    isFeatured: true,
  },
  {
    title: "Best Seller Discounts",
    description: "Popular organic products with limited-time discounts.",
    href: "/offers/best-seller-discounts",
    label: "Popular",
    icon: Sparkles,
  },
  {
    title: "Monthly Grocery Pack",
    description: "Smart value packs for rice, lentils, oil and essentials.",
    href: "/offers/monthly-grocery-pack",
    label: "Value Pack",
    icon: PackageCheck,
  },
];

const benefits = [
  {
    title: "Verified offers",
    description: "Offer cards are ready for backend-driven campaign data.",
    icon: ShieldCheck,
  },
  {
    title: "Limited-time campaigns",
    description: "Perfect for Eid, Ramadan, mango season and flash deals.",
    icon: Clock3,
  },
  {
    title: "Better conversion",
    description: "Clear offer structure helps customers decide faster.",
    icon: BadgePercent,
  },
];

export default function OffersPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">Offer Zone</span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Save more on organic groceries
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
              Browse delivery offers, bundle deals, seasonal campaigns and
              value packs. This page is ready for future backend-powered offer
              management.
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

          <aside className="gb-card gb-card-muted p-6">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BadgePercent
                aria-hidden="true"
                focusable="false"
                className="size-7"
              />
            </span>

            <h2 className="mt-5 text-2xl font-black tracking-tight text-foreground">
              Today’s smart deals
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Later this section can show dynamic discount rules, coupon codes,
              campaign expiry, stock limits and personalized offers.
            </p>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Free delivery over ৳2,000
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                A conversion-friendly campaign for organic grocery orders.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="gb-card gb-card-muted p-5">
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
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {offerCards.map((offer) => {
            const Icon = offer.icon;

            return (
              <article
                key={offer.href}
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

                  {offer.isFeatured ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="mt-5">
                  <span className="text-xs font-black uppercase tracking-wide text-primary">
                    {offer.label}
                  </span>

                  <h2 className="mt-2 text-xl font-black tracking-tight text-foreground">
                    {offer.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-auto pt-5">
                  <Link href={offer.href} className="gb-btn-outline w-full">
                    View offer
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
      </div>
    </section>
  );
}