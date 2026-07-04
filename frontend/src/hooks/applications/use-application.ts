"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { ApplicationDetailResponse } from "@/types/application";

const fetchApplication = async (id: string) => {
  const { data } = await axiosClient.get<ApplicationDetailResponse>(
    `/applications/${id}`,
  );

  return data;
};

export const applicationDetailKey = (id: string) =>
  ["applications", "detail", id] as const;

export function useApplication(id: string) {
  const query = useQuery({
    queryKey: applicationDetailKey(id),
    queryFn: () => fetchApplication(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
