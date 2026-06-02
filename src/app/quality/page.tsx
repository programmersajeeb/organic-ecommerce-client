import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  ClipboardCheck,
  Leaf,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Promise",
  description:
    "Learn about Ghorer Bazar quality promise, natural product sourcing, authenticity checks and customer trust standards.",
};

type QualityPoint = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

const qualityPoints: QualityPoint[] = [
  {
    title: "Natural Product Focus",
    description:
      "Products are organized around natural, authentic and family-friendly grocery needs.",
    icon: Leaf,
  },
  {
    title: "Authenticity First",
    description:
      "The storefront is prepared for future supplier verification, batch details and quality labels.",
    icon: BadgeCheck,
  },
  {
    title: "Careful Product Review",
    description:
      "Future backend integration can support product approval, quality status and admin review flow.",
    icon: ClipboardCheck,
  },
  {
    title: "Clear Product Discovery",
    description:
      "Category, search and product pages are designed to help customers find trusted items quickly.",
    icon: SearchCheck,
  },
];

const trustSteps: QualityPoint[] = [
  {
    title: "Source",
    description:
      "Products can later include supplier, region, origin and sourcing notes.",
    icon: Leaf,
  },
  {
    title: "Check",
    description:
      "The system is ready for quality checks, product tags and authenticity badges.",
    icon: ShieldCheck,
  },
  {
    title: "Pack",
    description:
      "Product pages can support packaging details, weight, expiry and storage guidance.",
    icon: PackageCheck,
  },
  {
    title: "Deliver",
    description:
      "The ecommerce flow is ready for safe delivery, tracking and customer support.",
    icon: Sparkles,
  },
];

export default function QualityPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">Quality Promise</span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Natural, authentic and trust-first shopping
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
              Ghorer Bazar is being built as a premium organic ecommerce
              frontend where product quality, authenticity, clear category
              structure and customer trust stay at the center of the shopping
              experience.
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

          <aside className="gb-card gb-card-muted p-5">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck
                aria-hidden="true"
                focusable="false"
                className="size-7"
              />
            </span>

            <h2 className="mt-5 text-2xl font-black tracking-tight text-foreground">
              Future-ready trust system
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Later this page can connect with supplier verification,
              certificates, product batch data, customer reviews and admin
              quality approval.
            </p>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Quality-first UX
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                Customers should understand why a product is trustworthy before
                they buy.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {qualityPoints.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="gb-card gb-card-muted p-5">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon
                    aria-hidden="true"
                    focusable="false"
                    className="size-6"
                  />
                </span>

                <h2 className="mt-5 text-xl font-black tracking-tight text-foreground">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 gb-card p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="gb-account-page__eyebrow">Quality Flow</span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                How quality can work in the ecommerce system
              </h2>
            </div>

            <Link href="/help-center" className="gb-btn-outline">
              Need help?
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trustSteps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background/70 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon
                        aria-hidden="true"
                        focusable="false"
                        className="size-5"
                      />
                    </span>

                    <span className="text-sm font-black text-primary">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-black text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 gb-card border-dashed p-6 text-center">
          <h2 className="text-xl font-black text-foreground">
            Quality data will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This page prevents 404 and keeps the trust journey smooth. Later we
            can add certificates, supplier details, product testing notes,
            customer reviews and quality badges.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="gb-btn-primary">
              Browse products
              <ChevronRight
                aria-hidden="true"
                focusable="false"
                className="size-4"
              />
            </Link>

            <Link href="/payment-security" className="gb-btn-outline">
              Payment security
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}