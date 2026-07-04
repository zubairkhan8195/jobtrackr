"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { ApplicationDeleteResponse } from "@/types/application";

const deleteApplication = async (id: string) => {
  const { data } = await axiosClient.delete<ApplicationDeleteResponse>(
    `/applications/${id}`,
  );

  return data;
};

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
