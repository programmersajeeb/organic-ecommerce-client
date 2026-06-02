import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Globe2,
  Languages,
  Sparkles,
  Type,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Language Settings",
  description:
    "Choose language preference for the organic ecommerce shopping experience.",
};

type LanguageOption = Readonly<{
  name: string;
  nativeName: string;
  description: string;
  status: string;
  href: string;
  isActive?: boolean;
}>;

type LanguageFeature = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

const languageOptions: LanguageOption[] = [
  {
    name: "English",
    nativeName: "English",
    description:
      "Use English for navigation, product details, checkout and account pages.",
    status: "Currently available",
    href: "/language?locale=en",
    isActive: true,
  },
  {
    name: "Bengali",
    nativeName: "বাংলা",
    description:
      "বাংলা ভাষায় ক্যাটাগরি, প্রোডাক্ট, চেকআউট এবং অ্যাকাউন্ট অভিজ্ঞতা।",
    status: "Ready for future localization",
    href: "/language?locale=bn",
  },
];

const languageFeatures: LanguageFeature[] = [
  {
    title: "Localized shopping",
    description:
      "The storefront is prepared for English and Bengali ecommerce content.",
    icon: Languages,
  },
  {
    title: "Readable product content",
    description:
      "Future product data can support translated names, descriptions and labels.",
    icon: Type,
  },
  {
    title: "Regional UX ready",
    description:
      "Language preference can later connect with user account and browser settings.",
    icon: Globe2,
  },
];

export default function LanguagePage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="gb-card p-6 sm:p-8 lg:p-10">
            <span className="gb-account-page__eyebrow">Language</span>

            <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Choose your shopping language
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
              This page is prepared for future multilingual ecommerce support.
              Later we can connect language preference with account settings,
              cookies, browser locale and translated product content.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/categories" className="gb-btn-primary">
                Shop categories
              </Link>

              <Link href="/" className="gb-btn-outline">
                Continue shopping
              </Link>
            </div>
          </div>

          <aside className="gb-card gb-card-muted p-5">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Globe2 aria-hidden="true" focusable="false" className="size-7" />
            </span>

            <h2 className="mt-5 text-2xl font-black tracking-tight text-foreground">
              Multilingual ready
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Later this section can show saved language, currency, region and
              account-based localization settings.
            </p>

            <div className="mt-5 rounded-2xl bg-background/70 p-4">
              <p className="text-sm font-black text-foreground">
                Current default
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                English is active now. Bengali localization can be connected
                when content and backend support are ready.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {languageOptions.map((language) => (
            <article
              key={language.name}
              className={
                language.isActive
                  ? "gb-card gb-card-interactive border-primary p-5"
                  : "gb-card gb-card-interactive p-5"
              }
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Languages
                    aria-hidden="true"
                    focusable="false"
                    className="size-6"
                  />
                </span>

                {language.isActive ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                    <CheckCircle2
                      aria-hidden="true"
                      focusable="false"
                      className="size-3.5"
                    />
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-black text-muted-foreground">
                    Future
                  </span>
                )}
              </div>

              <div className="mt-5">
                <p className="text-xs font-black uppercase tracking-wide text-primary">
                  {language.status}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
                  {language.name}
                </h2>

                <p className="mt-1 text-lg font-black text-primary">
                  {language.nativeName}
                </p>

                <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
                  {language.description}
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href={language.href}
                  className={
                    language.isActive ? "gb-btn-primary w-full" : "gb-btn-outline w-full"
                  }
                  aria-current={language.isActive ? "page" : undefined}
                >
                  {language.isActive ? "Selected" : "Preview language"}
                  <ChevronRight
                    aria-hidden="true"
                    focusable="false"
                    className="size-4"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {languageFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="gb-card gb-card-muted p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon
                    aria-hidden="true"
                    focusable="false"
                    className="size-5"
                  />
                </span>

                <h2 className="mt-4 text-lg font-black text-foreground">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 gb-card border-dashed p-6 text-center">
          <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles
              aria-hidden="true"
              focusable="false"
              className="size-6"
            />
          </div>

          <h2 className="mt-4 text-xl font-black text-foreground">
            Language system will connect here
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
            This placeholder prevents 404 and keeps the navigation flow smooth.
            Later we can connect real locale switching, translated routes,
            account preference, cookies and backend-powered multilingual product
            content.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="gb-btn-primary">
              Browse products
            </Link>

            <Link href="/help-center" className="gb-btn-outline">
              Get help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}