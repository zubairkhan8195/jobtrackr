"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type {
  ApplicationMutationResponse,
  CreateApplicationPayload,
} from "@/types/application";

const createApplication = async (payload: CreateApplicationPayload) => {
  const { data } = await axiosClient.post<ApplicationMutationResponse>(
    "/applications",
    payload,
  );

  return data;
};

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
