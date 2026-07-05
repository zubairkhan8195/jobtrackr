import type { Application, ApplicationStats } from "@/types/application";

export type AdminApplicationOwner = {
  _id: string;
  name: string;
  email: string;
};

export type AdminApplication = Omit<Application, "user"> & {
  user: AdminApplicationOwner;
};

export type AdminApplicationsQueryParams = {
  page?: number;
  limit?: number;
};

export type AdminApplicationsListResponse = {
  success: true;
  data: AdminApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AdminStatsResponse = {
  success: true;
  data: ApplicationStats;
};
