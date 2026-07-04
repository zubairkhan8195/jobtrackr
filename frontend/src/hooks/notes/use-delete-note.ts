"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { applicationNotesKey } from "@/hooks/notes/use-application-notes";
import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { NoteDeleteResponse } from "@/types/note";

type DeleteNoteInput = {
  noteId: string;
  applicationId: string;
};

const deleteNote = async ({ noteId }: DeleteNoteInput) => {
  const { data } = await axiosClient.delete<NoteDeleteResponse>(
    `/notes/${noteId}`,
  );

  return data;
};

export function useDeleteNote(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
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
