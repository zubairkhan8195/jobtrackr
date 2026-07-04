import { ApplicationCard } from "@/components/applications/application-card";
import { ApplicationEmptyState } from "@/components/applications/application-empty-state";
import { ApplicationListSkeleton } from "@/components/applications/application-list-skeleton";
import type { Application } from "@/types/application";

type ApplicationListProps = {
  applications: Application[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
};

export function ApplicationList({
  applications,
  isLoading,
  hasActiveFilters,
  onClearFilters,
  onEdit,
  onDelete,
}: ApplicationListProps) {
  if (isLoading) {
    return <ApplicationListSkeleton />;
  }

  if (applications.length === 0) {
    return (
      <ApplicationEmptyState
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
