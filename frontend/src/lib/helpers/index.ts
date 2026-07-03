import Cookies from "js-cookie";

import { TOKEN_COOKIE } from "@/constants";

const cookieOptions = {
  expires: 7,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export function saveToken(token: string) {
  Cookies.set(TOKEN_COOKIE, token, cookieOptions);
}

export function clearToken() {
  Cookies.remove(TOKEN_COOKIE, { path: "/" });
}

export function getAuthToken() {
  return Cookies.get(TOKEN_COOKIE) ?? null;
}
