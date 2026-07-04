export type ApplicationStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "accepted";

export type ApplicationSource =
  | "linkedin"
  | "referral"
  | "company-site"
  | "other";

export type Application = {
  _id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  jobUrl?: string;
  location?: string;
  salary?: number;
  source: ApplicationSource;
  appliedDate: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationStats = {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  thisWeek: number;
};

export type ApplicationListResponse = {
  success: true;
  data: Application[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApplicationStatsResponse = {
  success: true;
  data: ApplicationStats;
};

export type ApplicationQueryParams = {
  page?: number;
  limit?: number;
  status?: ApplicationStatus;
  search?: string;
  source?: ApplicationSource;
  sort?: string;
};

export type ApplicationFilters = {
  page: number;
  limit: number;
  status?: ApplicationStatus;
  search: string;
  source?: ApplicationSource;
  sort: string;
};

export type CreateApplicationPayload = {
  company: string;
  position: string;
  status?: ApplicationStatus;
  jobUrl?: string;
  location?: string;
  salary?: number;
  source?: ApplicationSource;
  appliedDate?: string;
};

export type UpdateApplicationPayload = Partial<CreateApplicationPayload>;

export type ApplicationMutationResponse = {
  success: true;
  message: string;
  data: Application;
};

export type ApplicationDeleteResponse = {
  success: true;
  message: string;
};

export type ApplicationDetailResponse = {
  success: true;
  data: Application;
};
