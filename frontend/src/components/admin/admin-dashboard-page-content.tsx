"use client";

import { useState } from "react";

import { AdminApplicationsList } from "@/components/admin/admin-applications-list";
import { ApplicationOverviewStats } from "@/components/applications/application-overview-stats";
import { ApplicationStatusBreakdown } from "@/components/applications/application-status-breakdown";
import { useAdminApplications } from "@/hooks/admin/use-admin-applications";
import { useAdminStats } from "@/hooks/admin/use-admin-stats";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function AdminDashboardPageContent() {
  const [page, setPage] = useState(DEFAULT_PAGE);

  const { data: stats, isLoading: isStatsLoading } = useAdminStats();
  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useAdminApplications({ page, limit: DEFAULT_LIMIT });

  const applications = applicationsData?.applications ?? [];
  const pagination = applicationsData?.pagination;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Platform-wide overview of all job applications.
        </p>
      </div>

      <ApplicationOverviewStats stats={stats} isLoading={isStatsLoading} />
      <ApplicationStatusBreakdown stats={stats} isLoading={isStatsLoading} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">All Applications</h2>
          <p className="text-sm text-muted-foreground">
            Every application with the owner&apos;s name and email.
          </p>
        </div>

        <AdminApplicationsList
          applications={applications}
          isLoading={isApplicationsLoading}
          page={page}
          totalPages={pagination?.totalPages ?? 1}
          total={pagination?.total ?? 0}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}
