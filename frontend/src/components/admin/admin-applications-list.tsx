import { ApplicationEmptyState } from "@/components/applications/application-empty-state";
import { ApplicationListSkeleton } from "@/components/applications/application-list-skeleton";
import { ApplicationPagination } from "@/components/applications/application-pagination";
import { AdminApplicationCard } from "@/components/admin/admin-application-card";
import type { AdminApplication } from "@/types/admin";

type AdminApplicationsListProps = {
  applications: AdminApplication[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function AdminApplicationsList({
  applications,
  isLoading,
  page,
  totalPages,
  total,
  onPageChange,
}: AdminApplicationsListProps) {
  if (isLoading) {
    return <ApplicationListSkeleton count={5} />;
  }

  if (applications.length === 0) {
    return <ApplicationEmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {applications.map((application) => (
          <AdminApplicationCard key={application._id} application={application} />
        ))}
      </div>

      <ApplicationPagination
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
