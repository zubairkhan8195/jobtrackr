"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type {
  AdminApplicationsListResponse,
  AdminApplicationsQueryParams,
} from "@/types/admin";

const fetchAdminApplications = async (params: AdminApplicationsQueryParams) => {
  const { data } = await axiosClient.get<AdminApplicationsListResponse>(
    "/admin/applications",
    {
      params: {
        page: Number(params.page),
        limit: Number(params.limit),
      },
    },
  );

  return data;
};

export const adminApplicationsKey = (params: AdminApplicationsQueryParams) =>
  ["admin", "applications", params] as const;

export function useAdminApplications(params: AdminApplicationsQueryParams) {
  const query = useQuery({
    queryKey: adminApplicationsKey(params),
    queryFn: () => fetchAdminApplications(params),
    select: (response) => ({
      applications: response.data,
      pagination: {
        page: Number(response.pagination.page),
        limit: Number(response.pagination.limit),
        total: Number(response.pagination.total),
        totalPages: Number(response.pagination.totalPages),
      },
    }),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
