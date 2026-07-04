import type { ApplicationSource, ApplicationStatus } from "@/types/application";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "applied",
  "interview",
  "offer",
  "rejected",
  "accepted",
];

export const APPLICATION_SOURCES: ApplicationSource[] = [
  "linkedin",
  "referral",
  "company-site",
  "other",
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  accepted: "Accepted",
};

export const SOURCE_LABELS: Record<ApplicationSource, string> = {
  linkedin: "LinkedIn",
  referral: "Referral",
  "company-site": "Company Site",
  other: "Other",
};

export const SORT_OPTIONS = [
  { value: "-appliedDate", label: "Newest first" },
  { value: "appliedDate", label: "Oldest first" },
  { value: "company", label: "Company (A–Z)" },
  { value: "-company", label: "Company (Z–A)" },
  { value: "-createdAt", label: "Recently added" },
] as const;

export const DEFAULT_APPLICATION_FILTERS = {
  page: 1,
  limit: 10,
  search: "",
  sort: "-appliedDate",
} as const;
