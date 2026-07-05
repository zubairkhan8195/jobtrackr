"use client";

import Image from "next/image";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNavLinks } from "@/components/dashboard/dashboard-nav-links";
import {
  ADMIN_NAV_ITEMS,
  ADMIN_ROUTE_PREFIX,
  DASHBOARD_NAV_ITEMS,
  USER_ROUTE_PREFIX,
  type NavItem,
} from "@/constants";

type AppShellProps = {
  children: React.ReactNode;
  navItems: NavItem[];
  homeHref: string;
};

export function AppShell({ children, navItems, homeHref }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden h-full w-64 shrink-0 flex-col overflow-hidden border-r border-border bg-background lg:flex">
        <div className="shrink-0 border-b border-border px-6 py-5">
          <Image
            src="/images/logo.webp"
            alt="JobTrackr"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <DashboardNavLinks items={navItems} variant="sidebar" />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader homeHref={homeHref} navItems={navItems} />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navItems={DASHBOARD_NAV_ITEMS} homeHref={USER_ROUTE_PREFIX}>
      {children}
    </AppShell>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navItems={ADMIN_NAV_ITEMS} homeHref={ADMIN_ROUTE_PREFIX}>
      {children}
    </AppShell>
  );
}
