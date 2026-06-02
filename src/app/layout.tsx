import type { Metadata } from "next";
import { Inter, Merriweather, Noto_Sans_Bengali } from "next/font/google";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ghorer Bazar | Organic Ecommerce Platform",
    template: "%s | Ghorer Bazar",
  },
  description:
    "Buy authentic organic grocery products, honey, oil, spices, dates and natural food items online from Ghorer Bazar.",
  applicationName: "Ghorer Bazar",
  keywords: [
    "Ghorer Bazar",
    "organic ecommerce",
    "organic grocery",
    "honey",
    "mustard oil",
    "natural food",
    "Bangladesh ecommerce",
  ],
  authors: [{ name: "Ghorer Bazar" }],
  creator: "Ghorer Bazar",
  publisher: "Ghorer Bazar",
  category: "Ecommerce",
  openGraph: {
    type: "website",
    siteName: "Ghorer Bazar",
    title: "Ghorer Bazar | Organic Ecommerce Platform",
    description:
      "Buy authentic organic grocery products, honey, oil, spices, dates and natural food items online from Ghorer Bazar.",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghorer Bazar | Organic Ecommerce Platform",
    description:
      "Buy authentic organic grocery products, honey, oil, spices, dates and natural food items online from Ghorer Bazar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-BD" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} ${merriweather.variable} gb-app-shell`}
      >
        <ThemeProvider>
          <SiteHeader />

          <main id="main-content" className="gb-main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}