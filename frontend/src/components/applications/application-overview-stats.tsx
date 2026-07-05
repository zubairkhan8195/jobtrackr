import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OVERVIEW_STATS } from "@/constants/applications";
import type { ApplicationStats } from "@/types/application";

type ApplicationOverviewStatsProps = {
  stats?: ApplicationStats;
  isLoading: boolean;
};

export function ApplicationOverviewStats({
  stats,
  isLoading,
}: ApplicationOverviewStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {OVERVIEW_STATS.map(({ key, title, icon, getValue }) => (
        <Card key={key}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <HugeiconsIcon icon={icon} className="size-4" strokeWidth={1.75} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">
              {getValue(stats)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
