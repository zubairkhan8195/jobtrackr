"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { clearToken } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", match: "exact" as const },
  { href: "/dashboard/applications", label: "Applications", match: "prefix" as const },
];

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    toast.success("Logged out successfully");
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-background">
        <div className="border-b border-border px-6 py-5">
          <Image
            src="/images/logo.webp"
            alt="JobTrackr"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href, item.match);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-muted/30 p-8">{children}</main>
    </div>
  );
}
