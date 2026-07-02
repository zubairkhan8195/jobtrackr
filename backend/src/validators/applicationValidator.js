const { z } = require("zod");

const createApplicationSchema = z
  .object({
    company: z
      .string()
      .trim()
      .min(1, "Company is required")
      .max(100, "Company must be less than 100 characters"),
    position: z
      .string()
      .trim()
      .min(1, "Position is required")
      .max(100, "Position must be less than 100 characters"),
    status: z
      .enum(["applied", "interview", "offer", "rejected", "accepted"])
      .optional(),
    jobUrl: z.string().url("Invalid URL").optional(),
    location: z.string().trim().optional(),
    salary: z.coerce.number().min(0).optional(),
    source: z
      .enum(["linkedin", "referral", "company-site", "other"])
      .optional(),
    appliedDate: z.coerce.date().optional(),
  })
  .strict();

const updateApplicationSchema = createApplicationSchema.partial();

const SORTABLE_FIELDS = ["appliedDate", "salary", "company"];

const applicationQuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    status: z
      .enum(["applied", "interview", "offer", "rejected", "accepted"])
      .optional(),
    search: z.string().trim().optional(),
    source: z
      .enum(["linkedin", "referral", "company-site", "other"])
      .optional(),
    sort: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          const field = value.startsWith("-") ? value.slice(1) : value;
          return SORTABLE_FIELDS.includes(field);
        },
        {
          message: `Invalid sort. Allowed fields: ${SORTABLE_FIELDS.join(", ")}. Prefix with - for descending order.`,
        },
      ),
  })
  .strict();

module.exports = {
  createApplicationSchema,
  updateApplicationSchema,
  applicationQuerySchema,
};
