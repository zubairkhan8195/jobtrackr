import { SOURCE_LABELS } from "@/constants/applications";
import type { ApplicationSource } from "@/types/application";

type FormatDateOptions = {
  includeTime?: boolean;
};

export function formatDate(
  value: string,
  { includeTime = false }: FormatDateOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

export function formatSalary(value?: number) {
  if (value == null) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getSourceLabel(source: ApplicationSource) {
  return SOURCE_LABELS[source];
}
