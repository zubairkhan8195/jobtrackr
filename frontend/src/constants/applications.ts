import {
  Briefcase01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  GiftIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

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

export const STATUS_THEME: Record<
  ApplicationStatus,
  {
    icon: typeof Briefcase01Icon;
    cardClass: string;
    iconWrapperClass: string;
    iconClass: string;
  }
> = {
  applied: {
    icon: Briefcase01Icon,
    cardClass: "border-blue-100 bg-blue-50/50 dark:border-blue-950 dark:bg-blue-950/20",
    iconWrapperClass: "bg-blue-100 dark:bg-blue-950/50",
    iconClass: "text-blue-600 dark:text-blue-400",
  },
  interview: {
    icon: UserGroupIcon,
    cardClass: "border-orange-100 bg-orange-50/50 dark:border-orange-950 dark:bg-orange-950/20",
    iconWrapperClass: "bg-orange-100 dark:bg-orange-950/50",
    iconClass: "text-orange-600 dark:text-orange-400",
  },
  offer: {
    icon: GiftIcon,
    cardClass: "border-purple-100 bg-purple-50/50 dark:border-purple-950 dark:bg-purple-950/20",
    iconWrapperClass: "bg-purple-100 dark:bg-purple-950/50",
    iconClass: "text-purple-600 dark:text-purple-400",
  },
  rejected: {
    icon: Cancel01Icon,
    cardClass: "border-red-100 bg-red-50/50 dark:border-red-950 dark:bg-red-950/20",
    iconWrapperClass: "bg-red-100 dark:bg-red-950/50",
    iconClass: "text-red-600 dark:text-red-400",
  },
  accepted: {
    icon: CheckmarkCircle01Icon,
    cardClass: "border-green-100 bg-green-50/50 dark:border-green-950 dark:bg-green-950/20",
    iconWrapperClass: "bg-green-100 dark:bg-green-950/50",
    iconClass: "text-green-600 dark:text-green-400",
  },
};

export const OVERVIEW_STATS = [
  {
    key: "total",
    title: "Total Applications",
    icon: Briefcase01Icon,
    getValue: (stats: { total: number; thisWeek: number }) => stats.total,
  },
  {
    key: "thisWeek",
    title: "Applied This Week",
    icon: Calendar03Icon,
    getValue: (stats: { total: number; thisWeek: number }) => stats.thisWeek,
  },
] as const;

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
