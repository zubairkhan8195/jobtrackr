const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Header check — "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token found");
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Token is not valid or expired");
  }

  // 3. Load user from DB (password won't be selected)
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "The user belonging to this token no longer exists");
  }

  // 4. Attach user to request object
  req.user = user;
  next();
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authorized, please login first"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `Access denied. This action is restricted to: ${roles.join(", ")}`));
    }
    next();
  };
};

module.exports = { protect, authorize };