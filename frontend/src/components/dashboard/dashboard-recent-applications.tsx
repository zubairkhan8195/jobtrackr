"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationCard } from "@/components/applications/application-card";
import { ApplicationEmptyState } from "@/components/applications/application-empty-state";
import { ApplicationListSkeleton } from "@/components/applications/application-list-skeleton";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/hooks/applications/use-applications";

const RECENT_APPLICATIONS_PARAMS = {
  page: 1,
  limit: 5,
  sort: "-appliedDate",
} as const;

export function DashboardRecentApplications() {
  const { data, isLoading } = useApplications(RECENT_APPLICATIONS_PARAMS);
  const applications = data?.applications ?? [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Recent Applications
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest job applications at a glance.
          </p>
        </div>

        <Link href="/dashboard/applications">
          <Button type="button" variant="outline" size="sm">
            See more
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              data-icon="inline-end"
              strokeWidth={1.75}
            />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <ApplicationListSkeleton count={3} />
      ) : applications.length === 0 ? (
        <ApplicationEmptyState />
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              showActions={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}
