const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      const error = new ApiError(400, "Validation failed");
      error.errors = errors;
      return next(error);
    }
    req.body = result.data;
    next();
  };
  
  module.exports = validate;