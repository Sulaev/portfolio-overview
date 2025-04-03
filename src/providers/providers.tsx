"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function Providers({ children }: { children: React.ReactNode }) {
  useLocalStorage();
  return <Provider store={store}>{children}</Provider>;
}
