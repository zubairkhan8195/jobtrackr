"use client";

import { ApplicationOverviewStats } from "@/components/applications/application-overview-stats";
import { ApplicationStatusBreakdown } from "@/components/applications/application-status-breakdown";
import { DashboardRecentApplications } from "@/components/dashboard/dashboard-recent-applications";
import { useApplicationStats } from "@/hooks/applications/use-application-stats";

export function DashboardPageContent() {
  const { data: stats, isLoading } = useApplicationStats();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s an overview of your job search.
        </p>
      </div>

      <ApplicationOverviewStats stats={stats} isLoading={isLoading} />
      <ApplicationStatusBreakdown stats={stats} isLoading={isLoading} />
      <DashboardRecentApplications />
    </div>
  );
}
