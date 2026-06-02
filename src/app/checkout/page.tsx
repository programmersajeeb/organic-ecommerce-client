import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Secure checkout page for Ghorer Bazar orders, delivery information and payment flow.",
};

export default function CheckoutPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Checkout</p>

          <h1 className="gb-account-page__title">
            Complete your order securely
          </h1>

          <p className="gb-account-page__description">
            Checkout functionality will be connected with the real backend later.
            This page is ready for future customer information, delivery address,
            payment method, order summary, coupon and secure order placement
            flow.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/cart" className="gb-btn-primary">
              Back to cart
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