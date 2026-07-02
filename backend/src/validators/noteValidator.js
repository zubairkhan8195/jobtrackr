const { z } = require("zod");

const createNoteSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, "Text is required")
      .max(1000, "Text must be less than 1000 characters"),
  })
  .strict();

module.exports = {
  createNoteSchema,
};
