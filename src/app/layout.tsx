import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harsh Gajjar - Software Engineer",
  description: "Harsh Gajjar is a software engineer specializing in backend architecture, system design, and infrastructure. He builds fast, scalable, and reliable systems.",
  keywords: "Harsh Gajjar, backend engineer, system design, infrastructure engineer, software engineer portfolio, scalable systems",
  openGraph: {
    title: "Harsh Gajjar - Software Engineer",
    description: "Harsh Gajjar is a software engineer specializing in backend architecture, system design, and infrastructure. He builds fast, scalable, and reliable systems.",
    url: "https://harshgajjar.dev",
    siteName: "Harsh Gajjar",
    images: [
      {
        url: "https://harshgajjar.dev/assets/images/og/og.webp",
        width: 1200,
        height: 630,
        alt: "Harsh Gajjar - Software Engineer",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/terminal.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-background text-foreground overflow-x-hidden min-h-screen flex flex-col antialiased"
        )}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {/* BackgroundAnimation removed for minimalist theme */}
          <Navigation />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
