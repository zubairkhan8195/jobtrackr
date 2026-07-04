"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { NotesListResponse } from "@/types/note";

const fetchApplicationNotes = async (applicationId: string) => {
  const { data } = await axiosClient.get<NotesListResponse>(
    `/applications/${applicationId}/notes`,
  );

  return data;
};

export const applicationNotesKey = (applicationId: string) =>
  ["applications", applicationId, "notes"] as const;

export function useApplicationNotes(applicationId: string) {
  const query = useQuery({
    queryKey: applicationNotesKey(applicationId),
    queryFn: () => fetchApplicationNotes(applicationId),
    select: (response) => response.data,
    enabled: Boolean(applicationId),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
