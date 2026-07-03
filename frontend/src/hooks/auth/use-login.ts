"use client";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import { saveToken } from "@/lib/helpers";
import type { AuthResponse, LoginPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginUser = async (payload: LoginPayload) => {
  const { data } = await axiosClient.post<AuthResponse>("/auth/login", payload);

  return data;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveToken(data.token);
      toast.success(data.message);
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
