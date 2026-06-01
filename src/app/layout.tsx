import type { Metadata } from "next";
import { Inter, Merriweather, Noto_Sans_Bengali } from "next/font/google";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} ${merriweather.variable}`}
      >
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}