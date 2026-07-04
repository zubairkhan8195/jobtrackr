import { Briefcase01Icon, Calendar03Icon, ChartIncreaseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_LABELS } from "@/constants/applications";
import type { ApplicationStats } from "@/types/application";

type ApplicationStatsCardsProps = {
  stats?: ApplicationStats;
  isLoading: boolean;
};

const statCards = [
  {
    key: "total",
    title: "Total Applications",
    icon: Briefcase01Icon,
    getValue: (stats: ApplicationStats) => stats.total,
  },
  {
    key: "thisWeek",
    title: "Applied This Week",
    icon: Calendar03Icon,
    getValue: (stats: ApplicationStats) => stats.thisWeek,
  },
  {
    key: "interview",
    title: "In Interview",
    icon: ChartIncreaseIcon,
    getValue: (stats: ApplicationStats) => stats.byStatus.interview,
  },
] as const;

export function ApplicationStatsCards({
  stats,
  isLoading,
}: ApplicationStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statCards.map(({ key, title, icon, getValue }) => (
        <Card key={key}>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>{title}</CardTitle>
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <HugeiconsIcon icon={icon} className="size-4" strokeWidth={1.75} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">
              {getValue(stats)}
            </p>
          </CardContent>
        </Card>
      ))}

      <Card className="sm:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div
                key={status}
                className="flex min-w-[7rem] flex-col rounded-lg border border-border bg-muted/30 px-3 py-2"
              >
                <span className="text-xs text-muted-foreground">
                  {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
                </span>
                <span className="text-lg font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
