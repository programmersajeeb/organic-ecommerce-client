import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your Ghorer Bazar account to manage orders, wishlist, addresses and checkout preferences.",
};

export default function LoginPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Sign in</p>

          <h1 className="gb-account-page__title">
            Access your Ghorer Bazar account
          </h1>

          <p className="gb-account-page__description">
            Login functionality will be connected with the real authentication
            system later. This page is ready for future email, phone OTP, Google
            login and secure account management flow.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/account" className="gb-button gb-button--primary">
              Back to account
            </Link>

            <Link
              href="/account/register"
              className="gb-button gb-button--outline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}