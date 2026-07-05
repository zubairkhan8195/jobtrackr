import { Mail01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatDate,
  formatSalary,
  getSourceLabel,
} from "@/lib/application-formatters";
import type { AdminApplication } from "@/types/admin";

type AdminApplicationCardProps = {
  application: AdminApplication;
};

export function AdminApplicationCard({ application }: AdminApplicationCardProps) {
  const salary = formatSalary(application.salary);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight">
              {application.position}
            </h3>
            <ApplicationStatusBadge status={application.status} />
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            {application.company}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span>Applied {formatDate(application.appliedDate)}</span>
            <span>{getSourceLabel(application.source)}</span>
            {application.location ? <span>{application.location}</span> : null}
            {salary ? <span>{salary}</span> : null}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 lg:min-w-52 lg:shrink-0">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Owner</p>
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <HugeiconsIcon icon={UserIcon} className="size-3.5" strokeWidth={1.75} />
              {application.user.name}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HugeiconsIcon icon={Mail01Icon} className="size-3.5" strokeWidth={1.75} />
              {application.user.email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
