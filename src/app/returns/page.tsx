import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  ClipboardCheck,
  HelpCircle,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Learn about returns, refunds, replacement support and customer-friendly ecommerce return flow.",
};

type ReturnPoint = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

const returnPoints: ReturnPoint[] = [
  {
    title: "Easy Return Request",
    description:
      "Customers can later request return or replacement from their order details page.",
    icon: RefreshCcw,
  },
  {
    title: "Clear Eligibility",
    description:
      "Return rules can show product condition, time window, category restrictions and approval status.",
    icon: ClipboardCheck,
  },
  {
    title: "Fast Support",
    description:
      "Return journey is ready for support ticket, customer note and admin review integration.",
    icon: HelpCircle,
  },
  {
    title: "Refund Tracking",
    description:
      "Future backend can show pending, approved, refunded or rejected refund status clearly.",
    icon: BadgeCheck,
  },
];

const returnFlow: ReturnPoint[] = [
  {
    title: "Submit Request",
    description:
      "Customer selects the order item and submits return, replacement or refund request.",
    icon: RefreshCcw,
  },
  {
    title: "Review Details",
    description:
      "Support team checks order, product condition, return reason and eligibility.",
    icon: ClipboardCheck,
  },
  {
    title: "Pickup or Drop-off",
    description:
      "Return logistics can connect with delivery partner, pickup schedule or drop-off process.",
    icon: Truck,
  },
  {
    title: "Resolve",
    description:
      "Customer receives replacement, refund or final support decision.",
    icon: PackageCheck,
  },
];

export default function ReturnsPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">Returns & Refunds</span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Easy returns with clear support flow
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
              Ghorer Bazar return experience is being prepared for a simple,
              clear and customer-friendly process where users can request
              return, replacement or refund without confusion.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/track-order" className="gb-btn-primary">
                Track order
              </Link>

              <Link href="/help-center" className="gb-btn-outline">
                Contact support
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
              Customer trust first
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              A clear return policy builds confidence before purchase and
              reduces support confusion after delivery.
            </p>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Future integration
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                Later this page can connect with order history, return request,
                refund status, support ticket and admin approval.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {returnPoints.map((item) => {
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
              <span className="gb-account-page__eyebrow">Return Flow</span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                How the return process can work
              </h2>
            </div>

            <Link href="/track-order" className="gb-btn-outline">
              Check order status
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {returnFlow.map((item, index) => {
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
          <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock3 aria-hidden="true" focusable="false" className="size-6" />
          </div>

          <h2 className="mt-4 text-xl font-black text-foreground">
            Return request system will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This page prevents 404 and keeps the customer support journey
            smooth. Later we can add return request form, order item selector,
            refund status, pickup schedule and admin approval workflow.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/help-center" className="gb-btn-primary">
              Get support
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