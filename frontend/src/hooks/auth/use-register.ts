"use client";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import { saveAuthSession } from "@/lib/helpers";
import { getHomeRouteForRole } from "@/constants";
import type { AuthResponse, RegisterPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const registerUser = async (payload: RegisterPayload) => {
  const { data } = await axiosClient.post<AuthResponse>("/auth/register", payload);

  return data;
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      saveAuthSession(data.token, data.user.role);
      toast.success(data.message);
      router.push(getHomeRouteForRole(data.user.role));
      router.refresh();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
