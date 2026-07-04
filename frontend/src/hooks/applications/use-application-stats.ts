"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { ApplicationStatsResponse } from "@/types/application";

const fetchApplicationStats = async () => {
  const { data } = await axiosClient.get<ApplicationStatsResponse>(
    "/applications/stats",
  );

  return data;
};

export const applicationStatsKey = ["applications", "stats"] as const;

export function useApplicationStats() {
  const query = useQuery({
    queryKey: applicationStatsKey,
    queryFn: fetchApplicationStats,
    select: (response) => response.data,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
