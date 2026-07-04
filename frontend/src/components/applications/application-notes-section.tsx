"use client";

import { useState } from "react";

import {
  ApplicationNoteItem,
  ApplicationNotesEmptyState,
} from "@/components/applications/application-note-item";
import { ApplicationNoteForm } from "@/components/applications/application-note-form";
import { ApplicationNotesSkeleton } from "@/components/applications/application-notes-skeleton";
import { DeleteNoteDialog } from "@/components/applications/delete-note-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplicationNotes } from "@/hooks/notes/use-application-notes";
import type { Note } from "@/types/note";

type ApplicationNotesSectionProps = {
  applicationId: string;
};

export function ApplicationNotesSection({
  applicationId,
}: ApplicationNotesSectionProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  const { data: notes = [], isLoading } = useApplicationNotes(applicationId);

  function handleDeleteNote(note: Note) {
    setDeletingNote(note);
    setDeleteDialogOpen(true);
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    setDeleteDialogOpen(open);

    if (!open) {
      setDeletingNote(null);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Notes
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <ApplicationNoteForm applicationId={applicationId} />

          {isLoading ? (
            <ApplicationNotesSkeleton />
          ) : notes.length === 0 ? (
            <ApplicationNotesEmptyState />
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <ApplicationNoteItem
                  key={note._id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteNoteDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        note={deletingNote}
        applicationId={applicationId}
      />
    </>
  );
}
