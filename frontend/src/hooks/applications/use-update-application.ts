"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type {
  ApplicationMutationResponse,
  UpdateApplicationPayload,
} from "@/types/application";

type UpdateApplicationInput = {
  id: string;
  payload: UpdateApplicationPayload;
};

const updateApplication = async ({ id, payload }: UpdateApplicationInput) => {
  const { data } = await axiosClient.put<ApplicationMutationResponse>(
    `/applications/${id}`,
    payload,
  );

  return data;
};

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
