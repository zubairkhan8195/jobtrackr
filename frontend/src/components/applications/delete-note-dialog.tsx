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
import { useDeleteNote } from "@/hooks/notes/use-delete-note";
import type { Note } from "@/types/note";

type DeleteNoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: Note | null;
  applicationId: string;
};

export function DeleteNoteDialog({
  open,
  onOpenChange,
  note,
  applicationId,
}: DeleteNoteDialogProps) {
  const { mutate: deleteNote, isPending } = useDeleteNote(applicationId);

  function handleDelete() {
    if (!note) {
      return;
    }

    deleteNote(
      { noteId: note._id, applicationId },
      { onSuccess: () => onOpenChange(false) },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete note?</DialogTitle>
          <DialogDescription>
            This note will be permanently deleted. This action cannot be undone.
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
