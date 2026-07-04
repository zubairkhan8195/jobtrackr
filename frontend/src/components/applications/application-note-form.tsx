"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateNote } from "@/hooks/notes/use-create-note";
import { noteFormSchema, type NoteFormValues } from "@/schema";

type ApplicationNoteFormProps = {
  applicationId: string;
};

export function ApplicationNoteForm({ applicationId }: ApplicationNoteFormProps) {
  const { mutate: createNote, isPending } = useCreateNote(applicationId);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: { text: "" },
  });

  const { control, handleSubmit, reset } = form;

  function onSubmit(values: NoteFormValues) {
    createNote(
      { applicationId, payload: values },
      { onSuccess: () => reset() },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <Controller
        name="text"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="note-text">Add a note</Label>
            <textarea
              {...field}
              id="note-text"
              rows={4}
              placeholder="Interview feedback, follow-up reminders, recruiter details..."
              aria-invalid={fieldState.invalid}
              className="w-full resize-none rounded-md border border-input bg-input/20 px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
            />
            {fieldState.error ? (
              <p className="text-xs text-destructive">{fieldState.error.message}</p>
            ) : null}
          </div>
        )}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add note"}
          {isPending ? <Loader2 className="ml-2 size-4 animate-spin" /> : null}
        </Button>
      </div>
    </form>
  );
}
