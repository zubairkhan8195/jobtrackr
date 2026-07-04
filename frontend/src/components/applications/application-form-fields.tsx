import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  APPLICATION_SOURCES,
  APPLICATION_STATUSES,
  SOURCE_LABELS,
  STATUS_LABELS,
} from "@/constants/applications";
import type { ApplicationFormValues } from "@/schema";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
};

type ApplicationFormFieldsProps = {
  control: Control<ApplicationFormValues>;
};

export function ApplicationFormFields({ control }: ApplicationFormFieldsProps) {
  return (
    <div className="grid gap-4">
      <Controller
        name="company"
        control={control}
        render={({ field, fieldState }) => (
          <FormField label="Company" htmlFor="company" error={fieldState.error?.message}>
            <Input
              {...field}
              id="company"
              placeholder="e.g. Google"
              aria-invalid={fieldState.invalid}
              className="h-10 px-3 text-sm"
            />
          </FormField>
        )}
      />

      <Controller
        name="position"
        control={control}
        render={({ field, fieldState }) => (
          <FormField label="Position" htmlFor="position" error={fieldState.error?.message}>
            <Input
              {...field}
              id="position"
              placeholder="e.g. Frontend Engineer"
              aria-invalid={fieldState.invalid}
              className="h-10 px-3 text-sm"
            />
          </FormField>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label="Status" htmlFor="status" error={fieldState.error?.message}>
              <Select
                {...field}
                id="status"
                value={field.value ?? "applied"}
                onChange={(event) => field.onChange(event.target.value)}
                aria-invalid={fieldState.invalid}
                className="h-10 text-sm"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </Select>
            </FormField>
          )}
        />

        <Controller
          name="source"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label="Source" htmlFor="source" error={fieldState.error?.message}>
              <Select
                {...field}
                id="source"
                value={field.value ?? "other"}
                onChange={(event) => field.onChange(event.target.value)}
                aria-invalid={fieldState.invalid}
                className="h-10 text-sm"
              >
                {APPLICATION_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {SOURCE_LABELS[source]}
                  </option>
                ))}
              </Select>
            </FormField>
          )}
        />
      </div>

      <Controller
        name="appliedDate"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Applied date"
            htmlFor="appliedDate"
            error={fieldState.error?.message}
          >
            <Input
              {...field}
              id="appliedDate"
              type="date"
              aria-invalid={fieldState.invalid}
              className="h-10 px-3 text-sm"
            />
          </FormField>
        )}
      />

      <Controller
        name="jobUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField label="Job URL" htmlFor="jobUrl" error={fieldState.error?.message}>
            <Input
              {...field}
              id="jobUrl"
              type="url"
              placeholder="https://company.com/jobs/123"
              aria-invalid={fieldState.invalid}
              className="h-10 px-3 text-sm"
            />
          </FormField>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label="Location" htmlFor="location" error={fieldState.error?.message}>
              <Input
                {...field}
                id="location"
                placeholder="e.g. Remote, Lahore"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
            </FormField>
          )}
        />

        <Controller
          name="salary"
          control={control}
          render={({ field, fieldState }) => (
            <FormField label="Salary" htmlFor="salary" error={fieldState.error?.message}>
              <Input
                {...field}
                id="salary"
                type="number"
                min={0}
                placeholder="e.g. 80000"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
            </FormField>
          )}
        />
      </div>
    </div>
  );
}
