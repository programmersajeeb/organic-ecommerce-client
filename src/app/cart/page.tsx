import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your selected Ghorer Bazar products before checkout.",
};

export default function CartPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Shopping Cart</p>

          <h1 className="gb-account-page__title">
            Your cart is ready for checkout
          </h1>

          <p className="gb-account-page__description">
            Cart functionality will be connected with the real store system
            later. This page is ready for future cart items, quantity update,
            coupon, delivery charge, subtotal and checkout integration.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/" className="gb-btn-primary">
              Continue shopping
            </Link>

            <Link href="/checkout" className="gb-btn-outline">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}