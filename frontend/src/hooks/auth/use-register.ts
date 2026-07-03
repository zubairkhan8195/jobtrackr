"use client";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import { saveToken } from "@/lib/helpers";
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
