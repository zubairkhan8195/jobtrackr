export const TOKEN_COOKIE = "jobtrackr_token";
export const ROLE_COOKIE = "jobtrackr_role";

export const AUTH_ROUTES = ["/auth/login", "/auth/register"] as const;

export const USER_ROUTE_PREFIX = "/dashboard";
export const ADMIN_ROUTE_PREFIX = "/admin";

export const PROTECTED_ROUTE_PREFIX = USER_ROUTE_PREFIX;

export type NavItem = {
  href: string;
  label: string;
  match: "exact" | "prefix";
};

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", match: "exact" },
  { href: "/dashboard/applications", label: "Applications", match: "prefix" },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", match: "exact" },
];

export function getHomeRouteForRole(role: string) {
  return role === "admin" ? ADMIN_ROUTE_PREFIX : USER_ROUTE_PREFIX;
}

export function isAdminRole(role?: string | null) {
  return role === "admin";
}
