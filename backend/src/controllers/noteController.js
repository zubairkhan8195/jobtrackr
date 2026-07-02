const Note = require("../models/Note");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const getOwnedApplication = require("../utils/getOwnedApplication");

const createNote = asyncHandler(async (req, res) => {
  const application = await getOwnedApplication(req.params.id, req.user._id);

  const note = await Note.create({
    text: req.body.text,
    application: application._id,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Note added successfully",
    data: note,
  });
});

const getNotes = asyncHandler(async (req, res) => {
  await getOwnedApplication(req.params.id, req.user._id);

  const notes = await Note.find({ application: req.params.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: notes,
    count: notes.length,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (!note.user.equals(req.user._id)) {
    throw new ApiError(403, "Not authorized to delete this note");
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};
