import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Ghorer Bazar",
  description: "Enterprise Organic Ecommerce Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}