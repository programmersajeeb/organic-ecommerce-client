import type { Route } from "next";
import Link from "next/link";
import {
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { siteFooterData } from "./footer.data";
import type {
  FooterContactItem,
  FooterSocialLink,
  FooterTrustItem,
  SiteFooterProps,
} from "./footer.types";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FooterSocialIcon({ id }: Readonly<{ id: string }>) {
  if (id === "facebook") {
    return <span aria-hidden="true">f</span>;
  }

  if (id === "instagram") {
    return <span aria-hidden="true">ig</span>;
  }

  if (id === "youtube") {
    return <span aria-hidden="true">yt</span>;
  }

  return <ShoppingBag aria-hidden="true" />;
}

function FooterContactIcon({ id }: Readonly<{ id: string }>) {
  if (id === "email") {
    return <Mail aria-hidden="true" />;
  }

  if (id === "phone") {
    return <Phone aria-hidden="true" />;
  }

  if (id === "location") {
    return <MapPin aria-hidden="true" />;
  }

  return <Headphones aria-hidden="true" />;
}

function FooterTrustIcon({ id }: Readonly<{ id: string }>) {
  if (id === "fast-delivery") {
    return <Truck aria-hidden="true" />;
  }

  return <ShieldCheck aria-hidden="true" />;
}

function FooterContactItemView({
  item,
}: Readonly<{ item: FooterContactItem }>) {
  const content = (
    <>
      <span className="gb-site-footer__contact-icon" aria-hidden="true">
        <FooterContactIcon id={item.id} />
      </span>

      <span className="gb-site-footer__contact-copy">
        <span className="gb-site-footer__contact-label">{item.label}</span>
        <span className="gb-site-footer__contact-value">{item.value}</span>
      </span>
    </>
  );

  if (item.href) {
    return (
      <a className="gb-site-footer__contact-item" href={item.href}>
        {content}
      </a>
    );
  }

  return <span className="gb-site-footer__contact-item">{content}</span>;
}

function FooterTrustItemView({ item }: Readonly<{ item: FooterTrustItem }>) {
  return (
    <span className="gb-site-footer__trust-item">
      <span className="gb-site-footer__trust-icon" aria-hidden="true">
        <FooterTrustIcon id={item.id} />
      </span>

      <span>{item.label}</span>
    </span>
  );
}

function FooterSocialLinkView({ link }: Readonly<{ link: FooterSocialLink }>) {
  return (
    <a
      className="gb-site-footer__social-link"
      href={link.href}
      aria-label={`Follow 365 Shop on ${link.label}`}
      target="_blank"
      rel="noreferrer"
    >
      <FooterSocialIcon id={link.id} />
    </a>
  );
}

export function SiteFooter({
  data = siteFooterData,
  className,
}: SiteFooterProps) {
  return (
    <footer className={cn("gb-site-footer", className)}>
      <div className="gb-container gb-site-footer__container">
        <div className="gb-site-footer__top">
          <div className="gb-site-footer__brand-column">
            <Link
              className="gb-site-footer__logo"
              href={"/" as Route}
              aria-label="365 Shop home"
            >
              <span className="gb-site-footer__logo-mark" aria-hidden="true">
                <ShoppingBag />
              </span>

              <span className="gb-site-footer__logo-text">{data.logoLabel}</span>
            </Link>

            <p className="gb-site-footer__brand-text">{data.brandText}</p>

            <div className="gb-site-footer__trust-list" aria-label="Store trust benefits">
              {data.trustItems.map((item) => (
                <FooterTrustItemView key={item.id} item={item} />
              ))}
            </div>
          </div>

          <nav className="gb-site-footer__link-grid" aria-label="Footer navigation">
            {data.linkGroups.map((group) => (
              <div key={group.id} className="gb-site-footer__link-group">
                <h2 className="gb-site-footer__group-title">{group.title}</h2>

                <ul className="gb-site-footer__link-list">
                  {group.links.map((link) => (
                    <li key={`${group.id}-${link.href}`}>
                      <Link
                        className="gb-site-footer__link"
                        href={link.href as Route}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="gb-site-footer__contact-column">
            <div className="gb-site-footer__contact-header">
              <span className="gb-site-footer__contact-header-icon" aria-hidden="true">
                <Headphones />
              </span>

              <div className="gb-site-footer__contact-heading-copy">
                <h2 className="gb-site-footer__contact-title">Need Help?</h2>
                <p className="gb-site-footer__contact-subtitle">
                  Our support team is ready to help you.
                </p>
              </div>
            </div>

            <div className="gb-site-footer__contact-list">
              {data.contactItems.map((item) => (
                <FooterContactItemView key={item.id} item={item} />
              ))}
            </div>

            <p className="gb-site-footer__newsletter-text">
              {data.newsletterText}
            </p>

            <div className="gb-site-footer__social-list" aria-label="Social media links">
              {data.socialLinks.map((link) => (
                <FooterSocialLinkView key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>

        <div className="gb-site-footer__bottom">
          <p className="gb-site-footer__copyright">{data.copyrightText}</p>

          <div className="gb-site-footer__bottom-links" aria-label="Footer legal links">
            <Link className="gb-site-footer__bottom-link" href={"/privacy-policy" as Route}>
              Privacy
            </Link>

            <Link className="gb-site-footer__bottom-link" href={"/terms" as Route}>
              Terms
            </Link>

            <Link className="gb-site-footer__bottom-link" href={"/returns" as Route}>
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}