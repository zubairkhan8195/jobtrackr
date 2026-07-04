"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { applicationNotesKey } from "@/hooks/notes/use-application-notes";
import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { CreateNotePayload, NoteMutationResponse } from "@/types/note";

type CreateNoteInput = {
  applicationId: string;
  payload: CreateNotePayload;
};

const createNote = async ({ applicationId, payload }: CreateNoteInput) => {
  const { data } = await axiosClient.post<NoteMutationResponse>(
    `/applications/${applicationId}/notes`,
    payload,
  );

  return data;
};

export function useCreateNote(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: applicationNotesKey(applicationId),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
