import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Apple,
  ChevronRight,
  Droplet,
  Gift,
  Grid3X3,
  HeartPulse,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Wheat,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shop by Category",
  description:
    "Browse all organic grocery categories including honey, oil, ghee, dates, spices, rice, lentils, fruits and health foods.",
};

type CategoryCard = Readonly<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
  links: ReadonlyArray<{
    label: string;
    href: string;
  }>;
}>;

const categoryCards: CategoryCard[] = [
  {
    title: "Honey",
    description: "Pure, raw and naturally sourced honey collections.",
    href: "/categories/honey",
    icon: Package,
    featured: true,
    links: [
      { label: "Raw Honey", href: "/categories/honey/raw-honey" },
      { label: "Forest Honey", href: "/categories/honey/forest-honey" },
      { label: "Black Seed Honey", href: "/categories/honey/black-seed" },
    ],
  },
  {
    title: "Oil & Ghee",
    description: "Cold-pressed oils, pure ghee and kitchen essentials.",
    href: "/categories/oil-ghee",
    icon: Droplet,
    links: [
      { label: "Mustard Oil", href: "/categories/oil-ghee/mustard-oil" },
      { label: "Cow Ghee", href: "/categories/oil-ghee/cow-ghee" },
      { label: "Cold Pressed", href: "/categories/oil-ghee/cold-pressed" },
    ],
  },
  {
    title: "Dates",
    description: "Premium dates, gift packs and family value packs.",
    href: "/categories/dates",
    icon: Sparkles,
    featured: true,
    links: [
      { label: "Ajwa Dates", href: "/categories/dates/ajwa" },
      { label: "Medjool Dates", href: "/categories/dates/medjool" },
      { label: "Gift Box", href: "/categories/dates/gift-box" },
    ],
  },
  {
    title: "Spices",
    description: "Fresh spices, whole spices and ready spice mixes.",
    href: "/categories/spices",
    icon: Leaf,
    links: [
      { label: "Turmeric Powder", href: "/categories/spices/turmeric-powder" },
      { label: "Chili Powder", href: "/categories/spices/chili-powder" },
      { label: "Biryani Masala", href: "/categories/spices/biryani-masala" },
    ],
  },
  {
    title: "Rice & Lentils",
    description: "Premium rice, lentils and daily pantry staples.",
    href: "/categories/rice-lentils",
    icon: Wheat,
    links: [
      { label: "Basmati Rice", href: "/categories/rice-lentils/basmati-rice" },
      { label: "Red Lentil", href: "/categories/rice-lentils/red-lentil" },
      { label: "Family Pack", href: "/categories/rice-lentils/family-pack" },
    ],
  },
  {
    title: "Fruits",
    description: "Fresh seasonal fruits and organic fruit boxes.",
    href: "/categories/fruits",
    icon: Apple,
    links: [
      { label: "Mango", href: "/categories/fruits/mango" },
      { label: "Banana", href: "/categories/fruits/banana" },
      { label: "Fruit Box", href: "/categories/fruits/family-box" },
    ],
  },
  {
    title: "Health Foods",
    description: "Natural wellness picks for a healthy lifestyle.",
    href: "/categories/health-foods",
    icon: HeartPulse,
    links: [
      { label: "Super Foods", href: "/categories/health-foods/super-foods" },
      { label: "Seeds", href: "/categories/health-foods/seeds" },
      { label: "Healthy Snacks", href: "/categories/health-foods/snacks" },
    ],
  },
  {
    title: "Gift Packs",
    description: "Curated organic gift boxes for family and special moments.",
    href: "/categories/gift-packs",
    icon: Gift,
    links: [
      { label: "Honey Gift Box", href: "/categories/gift-packs/honey" },
      { label: "Dates Gift Box", href: "/categories/gift-packs/dates" },
      { label: "Organic Combo", href: "/categories/gift-packs/organic-combo" },
    ],
  },
];

const categoryHighlights = [
  {
    title: "100% Natural",
    description: "Clean product discovery with trust-first category structure.",
    icon: ShieldCheck,
  },
  {
    title: "Best Sellers",
    description: "Popular category shortcuts help users buy faster.",
    icon: Star,
  },
  {
    title: "Easy Browsing",
    description: "Mobile and desktop category routes are ready to scale.",
    icon: Grid3X3,
  },
];

export default function CategoriesPage() {
  return (
    <section className="gb-section gb-section-gradient">
      <div className="gb-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="gb-account-page__eyebrow">Shop by Category</span>

          <h1 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Browse organic grocery categories
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg">
            Find honey, dates, spices, oil, ghee, rice, lentils, fruits and
            natural food essentials from one clean category hub.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/offers" className="gb-btn-primary">
              View offers
            </Link>

            <Link href="/" className="gb-btn-outline">
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categoryHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="gb-card gb-card-muted p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" focusable="false" className="size-5" />
                </span>

                <h2 className="mt-4 text-lg font-black text-foreground">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.href}
                className="gb-card gb-card-interactive flex h-full flex-col p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon aria-hidden="true" focusable="false" className="size-6" />
                  </span>

                  {category.featured ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="mt-5">
                  <h2 className="text-xl font-black tracking-tight text-foreground">
                    {category.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-2">
                  {category.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex min-h-10 items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 text-sm font-bold text-muted-foreground transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        aria-hidden="true"
                        focusable="false"
                        className="size-4 transition group-hover:translate-x-0.5"
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <Link href={category.href} className="gb-btn-outline w-full">
                    View category
                    <ChevronRight
                      aria-hidden="true"
                      focusable="false"
                      className="size-4"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}