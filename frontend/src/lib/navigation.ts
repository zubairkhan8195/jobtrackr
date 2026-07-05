import type { NavItem } from "@/constants";

export function isNavActive(
  pathname: string,
  href: string,
  match: NavItem["match"],
) {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
