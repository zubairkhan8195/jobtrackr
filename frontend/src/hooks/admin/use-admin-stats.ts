"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type { AdminStatsResponse } from "@/types/admin";

const fetchAdminStats = async () => {
  const { data } = await axiosClient.get<AdminStatsResponse>("/admin/stats");

  return data;
};

export const adminStatsKey = ["admin", "stats"] as const;

export function useAdminStats() {
  const query = useQuery({
    queryKey: adminStatsKey,
    queryFn: fetchAdminStats,
    select: (response) => response.data,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
