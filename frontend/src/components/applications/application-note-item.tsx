import { Delete02Icon, Note01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/application-formatters";
import type { Note } from "@/types/note";

type ApplicationNoteItemProps = {
  note: Note;
  onDelete: (note: Note) => void;
};

export function ApplicationNoteItem({ note, onDelete }: ApplicationNoteItemProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="min-w-0 space-y-2">
          <p className="text-sm whitespace-pre-wrap text-foreground">{note.text}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(note.createdAt, { includeTime: true })}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onDelete(note)}
          aria-label="Delete note"
        >
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={1.75} />
        </Button>
      </CardContent>
    </Card>
  );
}

type ApplicationNotesEmptyStateProps = {
  className?: string;
};

export function ApplicationNotesEmptyState({
  className,
}: ApplicationNotesEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-10 text-center ${className ?? ""}`}
    >
      <div className="rounded-full bg-muted p-3 text-muted-foreground">
        <HugeiconsIcon icon={Note01Icon} className="size-6" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-foreground">No notes yet</p>
      <p className="max-w-sm text-xs text-muted-foreground">
        Add notes to keep track of interviews, follow-ups, and important details.
      </p>
    </div>
  );
}
