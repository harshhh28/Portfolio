"use client";

import * as React from "react";

// Simplified ThemeProvider that enforces dark mode
export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}) {
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);

  return <>{children}</>;
}

export const useTheme = () => {
  return { theme: "dark", setTheme: () => {} };
};
