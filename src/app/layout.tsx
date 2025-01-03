import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "../components/Navigation";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio showcasing my work and experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-black text-white overflow-x-hidden"
        )}>
        <BackgroundAnimation />
        <Navigation />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
