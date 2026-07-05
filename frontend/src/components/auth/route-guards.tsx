"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ADMIN_ROUTE_PREFIX, USER_ROUTE_PREFIX, isAdminRole } from "@/constants";
import { useProfile } from "@/hooks/auth/use-profile";
import { saveRole } from "@/lib/helpers";

type UserRouteGuardProps = {
  children: React.ReactNode;
};

export function UserRouteGuard({ children }: UserRouteGuardProps) {
  const router = useRouter();
  const { data: user, isLoading } = useProfile();

  useEffect(() => {
    if (!user) {
      return;
    }

    saveRole(user.role);

    if (isAdminRole(user.role)) {
      router.replace(ADMIN_ROUTE_PREFIX);
    }
  }, [user, router]);

  if (isLoading) {
    return null;
  }

  if (user && isAdminRole(user.role)) {
    return null;
  }

  return children;
}

type AdminRouteGuardProps = {
  children: React.ReactNode;
};

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { data: user, isLoading } = useProfile();

  useEffect(() => {
    if (!user) {
      return;
    }

    saveRole(user.role);

    if (!isAdminRole(user.role)) {
      router.replace(USER_ROUTE_PREFIX);
    }
  }, [user, router]);

  if (isLoading) {
    return null;
  }

  if (user && !isAdminRole(user.role)) {
    return null;
  }

  return children;
}
