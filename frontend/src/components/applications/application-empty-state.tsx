import { Briefcase01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardContent } from "@/components/ui/card";

type ApplicationEmptyStateProps = {
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
};

export function ApplicationEmptyState({
  hasActiveFilters = false,
  onClearFilters,
}: ApplicationEmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="rounded-full bg-muted p-4 text-muted-foreground">
          <HugeiconsIcon
            icon={Briefcase01Icon}
            className="size-8"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight">
            {hasActiveFilters
              ? "No applications match your filters"
              : "No applications yet"}
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {hasActiveFilters
              ? "Try adjusting your search or filters to find what you are looking for."
              : "Start tracking your job search by adding your first application."}
          </p>
        </div>
        {hasActiveFilters && onClearFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </CardContent>
    </Card>
  );
}
