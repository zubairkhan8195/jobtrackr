const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const objectIdParamSchema = (field, message = "Invalid ID") =>
  z
    .object({
      [field]: z.string().regex(objectIdRegex, message),
    })
    .strict();

module.exports = { objectIdParamSchema };
