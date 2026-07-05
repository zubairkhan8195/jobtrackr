"use client";

import { useRouter } from "next/navigation";
import {
  Delete02Icon,
  Edit02Icon,
  LinkSquare02Icon,
  Location01Icon,
  Money03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatDate,
  formatSalary,
  getSourceLabel,
} from "@/lib/application-formatters";
import type { Application } from "@/types/application";

type ApplicationCardProps = {
  application: Application;
  showActions?: boolean;
  onEdit?: (application: Application) => void;
  onDelete?: (application: Application) => void;
};

export function ApplicationCard({
  application,
  showActions = true,
  onEdit,
  onDelete,
}: ApplicationCardProps) {
  const router = useRouter();
  const salary = formatSalary(application.salary);
  const detailsHref = `/dashboard/applications/${application._id}`;

  function handleCardClick() {
    router.push(detailsHref);
  }

  function stopPropagation(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <Card
      className="cursor-pointer transition-colors hover:border-primary/30"
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View ${application.position} at ${application.company}`}
    >
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

            {application.location ? (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon
                  icon={Location01Icon}
                  className="size-3.5"
                  strokeWidth={1.75}
                />
                {application.location}
              </span>
            ) : null}

            {salary ? (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon
                  icon={Money03Icon}
                  className="size-3.5"
                  strokeWidth={1.75}
                />
                {salary}
              </span>
            ) : null}
          </div>
        </div>

        {showActions ? (
          <div
            className="flex flex-wrap items-center gap-2 lg:shrink-0"
            onClick={stopPropagation}
          >
            {application.jobUrl ? (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted"
              >
                View job
                <HugeiconsIcon
                  icon={LinkSquare02Icon}
                  className="size-3.5"
                  strokeWidth={1.75}
                />
              </a>
            ) : null}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-background"
              onClick={() => onEdit?.(application)}
            >
              <HugeiconsIcon icon={Edit02Icon} data-icon="inline-start" strokeWidth={1.75} />
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(application)}
            >
              <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" strokeWidth={1.75} />
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
