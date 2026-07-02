const Application = require("../models/Application");
const ApiError = require("./ApiError");

const getOwnedApplication = async (id, userId) => {
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  if (!application.user.equals(userId)) {
    throw new ApiError(403, "Not authorized to access this application");
  }

  return application;
};

module.exports = getOwnedApplication;
