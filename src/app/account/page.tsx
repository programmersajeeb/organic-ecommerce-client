import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Sign in or create an account to manage orders, wishlist, addresses and profile at Ghorer Bazar.",
};

export default function AccountPage() {
  return (
    <section className="gb-section">
      <div className="gb-container">
        <div className="gb-card gb-account-page">
          <p className="gb-account-page__eyebrow">Customer Account</p>

          <h1 className="gb-account-page__title">
            Sign in to manage your Ghorer Bazar account
          </h1>

          <p className="gb-account-page__description">
            Your account area will include orders, wishlist, saved addresses,
            profile details and secure checkout preferences.
          </p>

          <div className="gb-account-page__actions">
            <Link href="/account/login" className="gb-btn-primary">
              Sign in
            </Link>

            <Link href="/account/register" className="gb-btn-outline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}