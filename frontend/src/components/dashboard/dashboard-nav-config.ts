export const DASHBOARD_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", match: "exact" as const },
  {
    href: "/dashboard/applications",
    label: "Applications",
    match: "prefix" as const,
  },
] as const;

export function isDashboardNavActive(
  pathname: string,
  href: string,
  match: "exact" | "prefix",
) {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
