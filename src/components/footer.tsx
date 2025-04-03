"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className={cn(
        styles["border-grid"],
        "sticky top-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className={styles["container-wrapper"]}>
        <div
          className={cn(
            styles["container"],
            "flex h-10 md:h-17 items-center justify-between"
          )}
        >
          <div className="text-sm opacity-50">Copyright © 2025</div>
          <div className="flex gap-8 text-sm opacity-50">
            <Link href={""}>{"privacy"}</Link>
            <Link href={""}>{"terms"}</Link>
            <Link href={""}>{"support"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
