import { STATUS_LABELS } from "@/constants/applications";
import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/types/application";

type ApplicationStatusBadgeProps = {
  status: ApplicationStatus;
};

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  return <Badge variant={status}>{STATUS_LABELS[status]}</Badge>;
}
