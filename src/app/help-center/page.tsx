import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Get help and support for orders, delivery, payment, returns and account issues at Ghorer Bazar.",
};

export default function HelpCenterPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Help Center</p>

          <h1 className="gb-account-page__title">
            How can we help you today?
          </h1>

          <p className="gb-account-page__description">
            The full support system will be connected later. This page is ready
            for future order support, delivery questions, payment help, return
            requests, live chat and customer service integration.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/track-order" className="gb-button gb-button--primary">
              Track an order
            </Link>

            <Link href="/" className="gb-button gb-button--outline">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}