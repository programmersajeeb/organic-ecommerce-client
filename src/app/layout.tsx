import type { Metadata, Viewport } from "next";
import { Inter, Merriweather, Noto_Sans_Bengali } from "next/font/google";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-noto-bengali",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.365shop.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "365 SHOP | Premium Online Shopping in Bangladesh",
    template: "%s | 365 SHOP",
  },
  description:
    "Shop premium electronics, smart watches, headphones, mobile accessories, bags, home appliances and lifestyle products online from 365 SHOP.",
  applicationName: "365 SHOP",
  keywords: [
    "365 SHOP",
    "online shopping Bangladesh",
    "electronics ecommerce",
    "smart watch",
    "headphones",
    "mobile accessories",
    "bags",
    "home appliances",
    "lifestyle products",
    "Bangladesh ecommerce",
  ],
  authors: [{ name: "365 SHOP" }],
  creator: "365 SHOP",
  publisher: "365 SHOP",
  category: "Ecommerce",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    siteName: "365 SHOP",
    title: "365 SHOP | Premium Online Shopping in Bangladesh",
    description:
      "Buy premium electronics, smart watches, headphones, mobile accessories and lifestyle products online from 365 SHOP.",
    locale: "en_BD",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "365 SHOP | Premium Online Shopping in Bangladesh",
    description:
      "Buy premium electronics, smart watches, headphones, mobile accessories and lifestyle products online from 365 SHOP.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const fontVariables = [
    inter.variable,
    notoSansBengali.variable,
    merriweather.variable,
    "gb-app-shell",
  ].join(" ");

  return (
    <html lang="en-BD" suppressHydrationWarning>
      <body className={fontVariables}>
        <ThemeProvider>
          <QueryProvider>
            <a className="gb-sr-only focus:not-sr-only" href="#main-content">
              Skip to main content
            </a>

            <SiteHeader />

            <main id="main-content" className="gb-main-content" tabIndex={-1}>
              {children}
            </main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}