"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/auth/use-profile";
import { clearToken } from "@/lib/helpers";
import { getUserInitials } from "@/lib/user-helpers";

export function DashboardHeader() {
  const router = useRouter();
  const { data: user, isLoading } = useProfile();

  function handleLogout() {
    clearToken();
    toast.success("Logged out successfully");
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <header className="flex h-[81px] shrink-0 items-center justify-between border-b border-border bg-background px-4 md:px-10">
      <Link href="/dashboard" className="shrink-0 lg:hidden">
        <Image
          src="/images/logo.webp"
          alt="JobTrackr"
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
          priority
        />
      </Link>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        <DashboardMobileNav />

        {isLoading ? (
          <Skeleton className="size-9 rounded-full" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/30"
              aria-label="Open user menu"
            >
              {getUserInitials(user.name)}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="px-2 py-2">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <HugeiconsIcon icon={Logout01Icon} strokeWidth={1.75} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
