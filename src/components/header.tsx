"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import { Briefcase } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header
      className={cn(
        styles["border-grid"],
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className={styles["container-wrapper"]}>
        <div
          className={cn(
            styles["container"],
            "flex h-10 md:h-14 items-center justify-between"
          )}
        >
          <Briefcase />

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
