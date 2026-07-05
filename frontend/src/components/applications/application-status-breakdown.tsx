import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  STATUS_THEME,
} from "@/constants/applications";
import { cn } from "@/lib/utils";
import type { ApplicationStats, ApplicationStatus } from "@/types/application";

type ApplicationStatusBreakdownProps = {
  stats?: ApplicationStats;
  isLoading: boolean;
};

function StatusBreakdownSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-36" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type StatusBreakdownCardProps = {
  status: ApplicationStatus;
  count: number;
};

function StatusBreakdownCard({ status, count }: StatusBreakdownCardProps) {
  const theme = STATUS_THEME[status];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border p-4 transition-colors",
        theme.cardClass,
      )}
    >
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-lg",
          theme.iconWrapperClass,
        )}
      >
        <HugeiconsIcon
          icon={theme.icon}
          className={cn("size-4", theme.iconClass)}
          strokeWidth={1.75}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {STATUS_LABELS[status]}
        </p>
        <p className="text-2xl font-semibold tracking-tight">{count}</p>
      </div>
    </div>
  );
}

export function ApplicationStatusBreakdown({
  stats,
  isLoading,
}: ApplicationStatusBreakdownProps) {
  if (isLoading) {
    return <StatusBreakdownSkeleton />;
  }

  if (!stats) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Status Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {APPLICATION_STATUSES.map((status) => (
            <StatusBreakdownCard
              key={status}
              status={status}
              count={stats.byStatus[status]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
