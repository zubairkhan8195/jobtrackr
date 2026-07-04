"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteApplication } from "@/hooks/applications/use-delete-application";
import type { Application } from "@/types/application";

type DeleteApplicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
};

export function DeleteApplicationDialog({
  open,
  onOpenChange,
  application,
}: DeleteApplicationDialogProps) {
  const { mutate: deleteApplication, isPending } = useDeleteApplication();

  function handleDelete() {
    if (!application) {
      return;
    }

    deleteApplication(application._id, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete application?</DialogTitle>
          <DialogDescription>
            This will permanently delete your application for{" "}
            <span className="font-medium text-foreground">
              {application?.position}
            </span>{" "}
            at{" "}
            <span className="font-medium text-foreground">
              {application?.company}
            </span>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
            {isPending ? <Loader2 className="ml-2 size-4 animate-spin" /> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
