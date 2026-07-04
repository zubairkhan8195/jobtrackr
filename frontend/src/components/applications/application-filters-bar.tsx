import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  APPLICATION_SOURCES,
  APPLICATION_STATUSES,
  SORT_OPTIONS,
  SOURCE_LABELS,
  STATUS_LABELS,
} from "@/constants/applications";
import type { ApplicationFilters } from "@/types/application";

type ApplicationFiltersBarProps = {
  filters: ApplicationFilters;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: ApplicationFilters["status"]) => void;
  onSourceChange: (value?: ApplicationFilters["source"]) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
};

export function ApplicationFiltersBar({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortChange,
  onClearFilters,
}: ApplicationFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search company or position..."
            className="h-8 pl-9"
          />
        </div>

        <Select
          value={filters.status ?? ""}
          onChange={(event) =>
            onStatusChange(
              event.target.value
                ? (event.target.value as ApplicationFilters["status"])
                : undefined,
            )
          }
          className="lg:min-w-40"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </Select>

        <Select
          value={filters.source ?? ""}
          onChange={(event) =>
            onSourceChange(
              event.target.value
                ? (event.target.value as ApplicationFilters["source"])
                : undefined,
            )
          }
          className="lg:min-w-40"
          aria-label="Filter by source"
        >
          <option value="">All sources</option>
          {APPLICATION_SOURCES.map((source) => (
            <option key={source} value={source}>
              {SOURCE_LABELS[source]}
            </option>
          ))}
        </Select>

        <Select
          value={filters.sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="lg:min-w-44"
          aria-label="Sort applications"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {hasActiveFilters ? (
        <div className="flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}
