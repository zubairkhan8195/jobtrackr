const ApiError = require("../utils/ApiError");

const formatValidationErrors = (issues, fallbackField = "body") =>
  issues.map((issue) => {
    const field = issue.path.length > 0 ? issue.path.join(".") : fallbackField;

    if (issue.code === "invalid_type" && issue.received === "undefined") {
      return {
        field,
        message: `${field} is required`,
      };
    }

    if (issue.code === "unrecognized_keys") {
      return {
        field: issue.keys.join(", "),
        message: `Field not allowed: ${issue.keys.join(", ")}`,
      };
    }

    return {
      field,
      message: issue.message,
    };
  });

const validate = (schema) => (req, res, next) => {
  if (req.body === undefined || req.body === null) {
    const error = new ApiError(400, "Validation failed");
    error.errors = [
      {
        field: "body",
        message:
          "Request body is required. Set Body to raw JSON and add header Content-Type: application/json",
      },
    ];
    return next(error);
  }

  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = formatValidationErrors(result.error.issues);
    const error = new ApiError(400, "Validation failed");
    error.errors = errors;
    return next(error);
  }

  req.body = result.data;
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const errors = formatValidationErrors(result.error.issues, "query");
    const error = new ApiError(400, "Validation failed");
    error.errors = errors;
    return next(error);
  }

  req.query = result.data;
  next();
};

const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    const errors = formatValidationErrors(result.error.issues, "params");
    const error = new ApiError(400, "Validation failed");
    error.errors = errors;
    return next(error);
  }

  req.params = result.data;
  next();
};

module.exports = {
  validate,
  validateQuery,
  validateParams,
};