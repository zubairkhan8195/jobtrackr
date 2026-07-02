const express = require("express");
const { validate, validateParams } = require("../middleware/validate");
const {
  createNote,
  getNotes,
  deleteNote,
} = require("../controllers/noteController");
const { createNoteSchema } = require("../validators/noteValidator");
const { objectIdParamSchema } = require("../validators/common");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/applications/:id/notes",
  protect,
  validateParams(objectIdParamSchema("id")),
  validate(createNoteSchema),
  createNote,
);

router.get(
  "/applications/:id/notes",
  protect,
  validateParams(objectIdParamSchema("id")),
  getNotes,
);

router.delete(
  "/notes/:noteId",
  protect,
  validateParams(objectIdParamSchema("noteId")),
  deleteNote,
);

module.exports = router;
