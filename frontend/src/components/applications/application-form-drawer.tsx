"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { ApplicationFormFields } from "@/components/applications/application-form-fields";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCreateApplication } from "@/hooks/applications/use-create-application";
import { useUpdateApplication } from "@/hooks/applications/use-update-application";
import {
  getDefaultApplicationFormValues,
  toApplicationFormValues,
  toApplicationPayload,
} from "@/lib/application-form";
import { applicationFormSchema, type ApplicationFormValues } from "@/schema";
import type { Application } from "@/types/application";

type ApplicationFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
};

export function ApplicationFormDrawer({
  open,
  onOpenChange,
  application,
}: ApplicationFormDrawerProps) {
  const isEdit = Boolean(application);
  const { mutate: createApplication, isPending: isCreating } =
    useCreateApplication();
  const { mutate: updateApplication, isPending: isUpdating } =
    useUpdateApplication();
  const isPending = isCreating || isUpdating;

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: getDefaultApplicationFormValues(),
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(
      application
        ? toApplicationFormValues(application)
        : getDefaultApplicationFormValues(),
    );
  }, [open, application, reset]);

  function onSubmit(values: ApplicationFormValues) {
    const payload = toApplicationPayload(values);

    if (isEdit && application) {
      updateApplication(
        { id: application._id, payload },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createApplication(payload, { onSuccess: () => onOpenChange(false) });
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="bg-white data-[swipe-axis=x]:sm:[--drawer-content-width:32rem]">
        <DrawerHeader>
          <DrawerTitle className="text-lg">
            {isEdit ? "Edit Application" : "Add Application"}
          </DrawerTitle>
          <DrawerDescription>
            {isEdit
              ? "Update the details of your job application."
              : "Track a new job application by filling in the details below."}
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <ApplicationFormFields control={control} />
          </div>

          <DrawerFooter className="border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save changes"
                  : "Create application"}
              {isPending ? <Loader2 className="ml-2 size-4 animate-spin" /> : null}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
