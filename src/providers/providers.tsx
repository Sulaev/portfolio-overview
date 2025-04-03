"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "./theme-provider";
import { useEffect, useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Provider store={store}>{children}</Provider>;
  }
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}
