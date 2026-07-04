import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Enter a valid email address");

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");

const applicationStatusField = z.enum([
  "applied",
  "interview",
  "offer",
  "rejected",
  "accepted",
]);

const applicationSourceField = z.enum([
  "linkedin",
  "referral",
  "company-site",
  "other",
]);

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be at most 50 characters"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const applicationFormSchema = z.object({
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
  status: applicationStatusField.optional(),
  jobUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().url().safeParse(value).success,
      { message: "Invalid URL" },
    ),
  location: z.string().trim(),
  salary: z
    .string()
    .trim()
    .refine((value) => value === "" || !Number.isNaN(Number(value)), {
      message: "Salary must be a number",
    })
    .refine((value) => value === "" || Number(value) >= 0, {
      message: "Salary cannot be negative",
    }),
  source: applicationSourceField.optional(),
  appliedDate: z.string().trim().min(1, "Applied date is required"),
});

export const noteFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Text is required")
    .max(1000, "Text must be less than 1000 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
export type NoteFormValues = z.infer<typeof noteFormSchema>;
