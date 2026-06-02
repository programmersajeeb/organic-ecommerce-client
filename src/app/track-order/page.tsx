import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Track your Ghorer Bazar order status using your order information.",
};

export default function TrackOrderPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Track Order</p>

          <h1 className="gb-account-page__title">
            Track your Ghorer Bazar order
          </h1>

          <p className="gb-account-page__description">
            Order tracking will be connected with the real backend later. This
            page is ready for future order ID, phone number, delivery status and
            courier tracking integration.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/" className="gb-button gb-button--primary">
              Continue shopping
            </Link>

            <Link href="/account/login" className="gb-button gb-button--outline">
              Sign in to account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}