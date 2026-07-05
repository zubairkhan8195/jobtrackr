import { ApplicationOverviewStats } from "@/components/applications/application-overview-stats";
import { ApplicationStatusBreakdown } from "@/components/applications/application-status-breakdown";
import type { ApplicationStats } from "@/types/application";

type ApplicationStatsCardsProps = {
  stats?: ApplicationStats;
  isLoading: boolean;
};

export function ApplicationStatsCards({
  stats,
  isLoading,
}: ApplicationStatsCardsProps) {
  return (
    <div className="space-y-4">
      <ApplicationOverviewStats stats={stats} isLoading={isLoading} />
      <ApplicationStatusBreakdown stats={stats} isLoading={isLoading} />
    </div>
  );
}
