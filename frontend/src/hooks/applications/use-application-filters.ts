"use client";

import { useMemo, useState } from "react";

import { DEFAULT_APPLICATION_FILTERS } from "@/constants/applications";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type {
  ApplicationFilters,
  ApplicationQueryParams,
  ApplicationSource,
  ApplicationStatus,
} from "@/types/application";

function toQueryParams(
  filters: ApplicationFilters,
  search: string,
): ApplicationQueryParams {
  return {
    page: Number(filters.page),
    limit: Number(filters.limit),
    sort: filters.sort,
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.source ? { source: filters.source } : {}),
    ...(search.trim() ? { search: search.trim() } : {}),
  };
}

export function useApplicationFilters() {
  const [filters, setFilters] = useState<ApplicationFilters>({
    ...DEFAULT_APPLICATION_FILTERS,
  });

  const debouncedSearch = useDebouncedValue(filters.search);

  const queryParams = useMemo(
    () => toQueryParams(filters, debouncedSearch),
    [filters, debouncedSearch],
  );

  function setSearch(search: string) {
    setFilters((current) => ({ ...current, search, page: 1 }));
  }

  function setStatus(status?: ApplicationStatus) {
    setFilters((current) => ({ ...current, status, page: 1 }));
  }

  function setSource(source?: ApplicationSource) {
    setFilters((current) => ({ ...current, source, page: 1 }));
  }

  function setSort(sort: string) {
    setFilters((current) => ({ ...current, sort, page: 1 }));
  }

  function setPage(page: number) {
    setFilters((current) => ({ ...current, page: Number(page) }));
  }

  function clearFilters() {
    setFilters({ ...DEFAULT_APPLICATION_FILTERS });
  }

  const hasActiveFilters = Boolean(
    filters.status ||
      filters.source ||
      filters.search.trim() ||
      filters.sort !== DEFAULT_APPLICATION_FILTERS.sort,
  );

  return {
    filters,
    queryParams,
    hasActiveFilters,
    setSearch,
    setStatus,
    setSource,
    setSort,
    setPage,
    clearFilters,
  };
}
