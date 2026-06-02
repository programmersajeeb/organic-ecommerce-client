import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a Ghorer Bazar account to manage orders, wishlist, addresses and checkout preferences.",
};

export default function RegisterPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Create account</p>

          <h1 className="gb-account-page__title">
            Create your Ghorer Bazar account
          </h1>

          <p className="gb-account-page__description">
            Registration functionality will be connected with the real
            authentication system later. This page is ready for future phone OTP,
            email signup, Google login, saved addresses, wishlist and secure
            checkout flow.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/account/login" className="gb-btn-primary">
              Sign in instead
            </Link>

            <Link href="/account" className="gb-btn-outline">
              Back to account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}