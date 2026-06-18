"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Bell, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import { newsletterCtaData } from "./newsletter-cta.data";
import type { NewsletterCtaSectionProps } from "./newsletter-cta.types";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function NewsletterCtaSection({
  data = newsletterCtaData,
  className,
}: NewsletterCtaSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubmitted(true);
  }

  return (
    <section
      className={cn("gb-newsletter-cta", className)}
      aria-labelledby={data.headingId}
    >
      <div className="gb-container gb-newsletter-cta__container">
        <div className="gb-newsletter-cta__shell">
          <span className="gb-newsletter-cta__glow" aria-hidden="true" />

          <div className="gb-newsletter-cta__content">
            <div className="gb-newsletter-cta__title-row">
              <span className="gb-newsletter-cta__section-icon" aria-hidden="true">
                <Mail />
              </span>

              <div className="gb-newsletter-cta__title-stack">
                <p className="gb-newsletter-cta__eyebrow">{data.eyebrow}</p>

                <h2 id={data.headingId} className="gb-newsletter-cta__title">
                  {data.title}
                </h2>
              </div>
            </div>

            <p className="gb-newsletter-cta__subtitle">{data.subtitle}</p>

            <div className="gb-newsletter-cta__benefits" aria-label="Newsletter benefits">
              {data.benefits.map((benefit, index) => (
                <span
                  key={benefit.id}
                  className="gb-newsletter-cta__benefit"
                  data-benefit-index={index}
                >
                  {index === 1 ? (
                    <Bell aria-hidden="true" />
                  ) : (
                    <CheckCircle2 aria-hidden="true" />
                  )}

                  <span>{benefit.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="gb-newsletter-cta__form-card">
            <div className="gb-newsletter-cta__form-heading">
              <span className="gb-newsletter-cta__form-icon" aria-hidden="true">
                <ShieldCheck />
              </span>

              <div className="gb-newsletter-cta__form-title-stack">
                <h3 className="gb-newsletter-cta__form-title">
                  Get Deal Alerts
                </h3>

                <p className="gb-newsletter-cta__form-subtitle">
                  Subscribe for useful offer updates only.
                </p>
              </div>
            </div>

            <form className="gb-newsletter-cta__form" onSubmit={handleSubmit}>
              <label className="gb-newsletter-cta__label" htmlFor="newsletter-email">
                {data.inputLabel}
              </label>

              <div className="gb-newsletter-cta__input-row">
                <input
                  id="newsletter-email"
                  className="gb-newsletter-cta__input"
                  type="email"
                  value={email}
                  placeholder={data.inputPlaceholder}
                  autoComplete="email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setIsSubmitted(false);
                  }}
                />

                <button className="gb-newsletter-cta__button" type="submit">
                  <span>{data.buttonLabel}</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>

              <p className="gb-newsletter-cta__privacy-note">
                {isSubmitted
                  ? "Thanks for subscribing. You will receive useful deal updates soon."
                  : data.privacyNote}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}