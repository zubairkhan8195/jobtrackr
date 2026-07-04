"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import type {
  ApplicationListResponse,
  ApplicationQueryParams,
} from "@/types/application";

const fetchApplications = async (params: ApplicationQueryParams) => {
  const { data } = await axiosClient.get<ApplicationListResponse>(
    "/applications",
    {
      params: {
        ...params,
        page: Number(params.page),
        limit: Number(params.limit),
      },
    },
  );

  return data;
};

export const applicationListKey = (params: ApplicationQueryParams) =>
  ["applications", "list", params] as const;

export function useApplications(params: ApplicationQueryParams) {
  const query = useQuery({
    queryKey: applicationListKey(params),
    queryFn: () => fetchApplications(params),
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
