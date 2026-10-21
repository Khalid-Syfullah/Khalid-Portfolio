"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

// Toasts are only needed after an action, so their code loads after hydration.
const Toaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster position="bottom-center" duration={2500} />
    </ThemeProvider>
  );
}
