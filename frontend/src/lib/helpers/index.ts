import Cookies from "js-cookie";

import { ROLE_COOKIE, TOKEN_COOKIE } from "@/constants";

const cookieOptions = {
  expires: 7,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export function saveToken(token: string) {
  Cookies.set(TOKEN_COOKIE, token, cookieOptions);
}

export function saveRole(role: string) {
  Cookies.set(ROLE_COOKIE, role, cookieOptions);
}

export function saveAuthSession(token: string, role: string) {
  saveToken(token);
  saveRole(role);
}

export function clearToken() {
  Cookies.remove(TOKEN_COOKIE, { path: "/" });
  Cookies.remove(ROLE_COOKIE, { path: "/" });
}

export function getAuthToken() {
  return Cookies.get(TOKEN_COOKIE) ?? null;
}

export function getAuthRole() {
  return Cookies.get(ROLE_COOKIE) ?? null;
}
