"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DASHBOARD_NAV_ITEMS,
  type NavItem,
} from "@/constants";
import { isNavActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type DashboardNavLinksProps = {
  items?: NavItem[];
  variant?: "sidebar" | "drawer";
  onNavigate?: () => void;
};

export function DashboardNavLinks({
  items = DASHBOARD_NAV_ITEMS,
  variant = "sidebar",
  onNavigate,
}: DashboardNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        variant === "sidebar" && "flex flex-col gap-1 p-4",
        variant === "drawer" && "flex flex-col",
      )}
    >
      {items.map((item) => {
        const active = isNavActive(pathname, item.href, item.match);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "text-sm font-medium transition-colors",
              variant === "sidebar" &&
                cn(
                  "rounded-md px-3 py-2",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ),
              variant === "drawer" &&
                cn(
                  "border-b border-border px-5 py-4 text-base",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                ),
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
