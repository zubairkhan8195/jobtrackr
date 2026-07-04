"use client";

import { useState } from "react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ApplicationFiltersBar } from "@/components/applications/application-filters-bar";
import { ApplicationFormDrawer } from "@/components/applications/application-form-drawer";
import { ApplicationList } from "@/components/applications/application-list";
import { ApplicationPagination } from "@/components/applications/application-pagination";
import { ApplicationStatsCards } from "@/components/applications/application-stats-cards";
import { DeleteApplicationDialog } from "@/components/applications/delete-application-dialog";
import { Button } from "@/components/ui/button";
import { useApplicationFilters } from "@/hooks/applications/use-application-filters";
import { useApplicationStats } from "@/hooks/applications/use-application-stats";
import { useApplications } from "@/hooks/applications/use-applications";
import type { Application } from "@/types/application";

export function ApplicationsPageContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingApplication, setDeletingApplication] =
    useState<Application | null>(null);

  const {
    filters,
    queryParams,
    hasActiveFilters,
    setSearch,
    setStatus,
    setSource,
    setSort,
    setPage,
    clearFilters,
  } = useApplicationFilters();

  const { data: stats, isLoading: isStatsLoading } = useApplicationStats();
  const {
    data: applicationsData,
    isLoading: isApplicationsLoading,
  } = useApplications(queryParams);

  const applications = applicationsData?.applications ?? [];
  const pagination = applicationsData?.pagination;

  function handleAddApplication() {
    setEditingApplication(null);
    setDrawerOpen(true);
  }

  function handleEditApplication(application: Application) {
    setEditingApplication(application);
    setDrawerOpen(true);
  }

  function handleDeleteApplication(application: Application) {
    setDeletingApplication(application);
    setDeleteDialogOpen(true);
  }

  function handleDrawerOpenChange(open: boolean) {
    setDrawerOpen(open);

    if (!open) {
      setEditingApplication(null);
    }
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    setDeleteDialogOpen(open);

    if (!open) {
      setDeletingApplication(null);
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
            <p className="text-sm text-muted-foreground">
              Track and manage your job applications in one place.
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="shrink-0"
            onClick={handleAddApplication}
          >
            <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" strokeWidth={1.75} />
            Add Application
          </Button>
        </div>

        <ApplicationStatsCards stats={stats} isLoading={isStatsLoading} />

        <ApplicationFiltersBar
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSourceChange={setSource}
          onSortChange={setSort}
          onClearFilters={clearFilters}
        />

        <ApplicationList
          applications={applications}
          isLoading={isApplicationsLoading}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onEdit={handleEditApplication}
          onDelete={handleDeleteApplication}
        />

        {pagination ? (
          <ApplicationPagination
            page={filters.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            onPageChange={setPage}
          />
        ) : null}
      </div>

      <ApplicationFormDrawer
        open={drawerOpen}
        onOpenChange={handleDrawerOpenChange}
        application={editingApplication}
      />

      <DeleteApplicationDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        application={deletingApplication}
      />
    </>
  );
}
