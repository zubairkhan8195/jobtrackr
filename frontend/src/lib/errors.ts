import type { ApiErrorResponse } from "@/types/auth";

export class ApiRequestError extends Error {
  status: number;
  errors?: ApiErrorResponse["errors"];

  constructor(status: number, message: string, errors?: ApiErrorResponse["errors"]) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (error.errors?.length) {
      return error.errors.map((item) => item.message).join(". ");
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
