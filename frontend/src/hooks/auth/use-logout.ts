"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { clearToken } from "@/lib/helpers";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return function logout() {
    clearToken();
    queryClient.clear();
    toast.success("Logged out successfully");
    router.push("/auth/login");
    router.refresh();
  };
}
