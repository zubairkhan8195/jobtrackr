"use client";

import { useState } from "react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { DashboardNavLinks } from "@/components/dashboard/dashboard-nav-links";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DASHBOARD_NAV_ITEMS, type NavItem } from "@/constants";

type DashboardMobileNavProps = {
  items?: NavItem[];
};

export function DashboardMobileNav({
  items = DASHBOARD_NAV_ITEMS,
}: DashboardMobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
      </Button>

      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerContent className="data-[swipe-axis=x]:sm:[--drawer-content-width:18rem]">
          <DrawerHeader className="border-b border-border pb-4">
            <DrawerTitle className="text-base font-semibold">Menu</DrawerTitle>
          </DrawerHeader>

          <DashboardNavLinks
            items={items}
            variant="drawer"
            onNavigate={() => setOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
