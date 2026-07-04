"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationDetailsInfo } from "@/components/applications/application-details-info";
import { ApplicationDetailsSkeleton } from "@/components/applications/application-details-skeleton";
import { ApplicationNotesSection } from "@/components/applications/application-notes-section";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/hooks/applications/use-application";

export function ApplicationDetailsContent() {
  const params = useParams<{ id: string }>();
  const applicationId = params.id;

  const { data: application, isLoading } = useApplication(applicationId);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <ApplicationDetailsSkeleton />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 py-16 text-center">
        <h1 className="text-xl font-semibold">Application not found</h1>
        <p className="text-sm text-muted-foreground">
          This application may have been deleted or you do not have access.
        </p>
        <Link href="/dashboard/applications">
          <Button type="button" variant="outline">
            Back to applications
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/applications">
          <Button type="button" variant="ghost" size="sm">
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              data-icon="inline-start"
              strokeWidth={1.75}
            />
            Back
          </Button>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Application Details
        </h1>
        <p className="text-sm text-muted-foreground">
          View application information and manage your notes.
        </p>
      </div>

      <ApplicationDetailsInfo application={application} />
      <ApplicationNotesSection applicationId={applicationId} />
    </div>
  );
}
