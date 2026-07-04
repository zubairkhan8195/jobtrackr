export type Note = {
  _id: string;
  text: string;
  application: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type NotesListResponse = {
  success: true;
  data: Note[];
  count: number;
};

export type NoteMutationResponse = {
  success: true;
  message: string;
  data: Note;
};

export type NoteDeleteResponse = {
  success: true;
  message: string;
};

export type CreateNotePayload = {
  text: string;
};
