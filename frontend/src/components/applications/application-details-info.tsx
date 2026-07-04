import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatDate,
  formatSalary,
  getSourceLabel,
} from "@/lib/application-formatters";
import type { Application } from "@/types/application";

type ApplicationDetailsInfoProps = {
  application: Application;
};

type DetailItemProps = {
  label: string;
  value: React.ReactNode;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

export function ApplicationDetailsInfo({ application }: ApplicationDetailsInfoProps) {
  const salary = formatSalary(application.salary);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl font-semibold text-foreground">
            {application.position}
          </CardTitle>
          <ApplicationStatusBadge status={application.status} />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {application.company}
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <DetailItem
          label="Applied date"
          value={formatDate(application.appliedDate)}
        />
        <DetailItem label="Source" value={getSourceLabel(application.source)} />
        <DetailItem label="Location" value={application.location || "—"} />
        <DetailItem label="Salary" value={salary || "—"} />

        {application.jobUrl ? (
          <div className="sm:col-span-2">
            <DetailItem
              label="Job URL"
              value={
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  View posting
                  <HugeiconsIcon
                    icon={LinkSquare02Icon}
                    className="size-3.5"
                    strokeWidth={1.75}
                  />
                </a>
              }
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
