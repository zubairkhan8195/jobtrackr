import type { Application, CreateApplicationPayload } from "@/types/application";
import type { ApplicationFormValues } from "@/schema";

export function getDefaultApplicationFormValues(): ApplicationFormValues {
  return {
    company: "",
    position: "",
    status: "applied",
    jobUrl: "",
    location: "",
    salary: "",
    source: "other",
    appliedDate: new Date().toISOString().split("T")[0],
  };
}

export function toApplicationFormValues(
  application: Application,
): ApplicationFormValues {
  return {
    company: application.company,
    position: application.position,
    status: application.status,
    jobUrl: application.jobUrl ?? "",
    location: application.location ?? "",
    salary: application.salary != null ? String(application.salary) : "",
    source: application.source,
    appliedDate: application.appliedDate.split("T")[0],
  };
}

export function toApplicationPayload(
  values: ApplicationFormValues,
): CreateApplicationPayload {
  return {
    company: values.company,
    position: values.position,
    status: values.status,
    source: values.source,
    ...(values.jobUrl ? { jobUrl: values.jobUrl } : {}),
    ...(values.location ? { location: values.location } : {}),
    ...(values.salary ? { salary: Number(values.salary) } : {}),
    ...(values.appliedDate ? { appliedDate: values.appliedDate } : {}),
  };
}
