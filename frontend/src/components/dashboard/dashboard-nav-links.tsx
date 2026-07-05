"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DASHBOARD_NAV_ITEMS,
  isDashboardNavActive,
} from "@/components/dashboard/dashboard-nav-config";
import { cn } from "@/lib/utils";

type DashboardNavLinksProps = {
  variant?: "sidebar" | "drawer";
  onNavigate?: () => void;
};

export function DashboardNavLinks({
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
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const active = isDashboardNavActive(pathname, item.href, item.match);

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
