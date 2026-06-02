import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  CreditCard,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Security",
  description:
    "Learn about secure payment experience, checkout trust, payment safety and future-ready ecommerce payment integration.",
};

type SecurityPoint = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

const securityPoints: SecurityPoint[] = [
  {
    title: "Secure Checkout",
    description:
      "Checkout flow is prepared for safe payment processing, clear order summary and trusted customer experience.",
    icon: LockKeyhole,
  },
  {
    title: "Trusted Payment Methods",
    description:
      "The frontend is ready for card, mobile banking, cash on delivery and future payment gateway integration.",
    icon: CreditCard,
  },
  {
    title: "Clear Payment Status",
    description:
      "Future backend can show paid, pending, failed, refunded and partially paid payment states clearly.",
    icon: ReceiptText,
  },
  {
    title: "Customer Data Safety",
    description:
      "The UI is structured to avoid unnecessary data exposure and support secure account and checkout flows.",
    icon: ShieldCheck,
  },
];

const paymentFlow: SecurityPoint[] = [
  {
    title: "Choose Method",
    description:
      "Customer selects card, mobile banking, cash on delivery or other supported payment method.",
    icon: Smartphone,
  },
  {
    title: "Review Order",
    description:
      "Customer checks product, subtotal, delivery fee, discount and final payable amount.",
    icon: ReceiptText,
  },
  {
    title: "Confirm Securely",
    description:
      "Payment confirmation can connect with gateway, OTP or backend verification later.",
    icon: KeyRound,
  },
  {
    title: "Track Status",
    description:
      "Order and payment status can update from backend after successful checkout.",
    icon: BadgeCheck,
  },
];

export default function PaymentSecurityPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">Payment Security</span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Safe, clear and trusted payment experience
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
              Ghorer Bazar payment experience is being prepared for secure
              checkout, trusted payment methods, clear payment status and future
              backend or payment gateway integration.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/checkout" className="gb-btn-primary">
                Go to checkout
              </Link>

              <Link href="/help-center" className="gb-btn-outline">
                Need help?
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
              Checkout trust matters
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Payment pages should clearly explain safety, payment options,
              refund status and order confirmation so customers feel confident.
            </p>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Future integration
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                Later this page can connect with payment gateway details,
                transaction status, refund policy and payment support.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {securityPoints.map((item) => {
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
              <span className="gb-account-page__eyebrow">Payment Flow</span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                How secure payment flow can work
              </h2>
            </div>

            <Link href="/track-order" className="gb-btn-outline">
              Track order
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {paymentFlow.map((item, index) => {
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
            Payment security details will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This page prevents 404 and keeps the trust journey smooth. Later we
            can add payment gateway logos, supported payment methods, transaction
            verification, refund status and security policy details.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/checkout" className="gb-btn-primary">
              Continue to checkout
              <ChevronRight
                aria-hidden="true"
                focusable="false"
                className="size-4"
              />
            </Link>

            <Link href="/returns" className="gb-btn-outline">
              Return policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}