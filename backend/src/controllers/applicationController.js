const Application = require("../models/Application");
const Note = require("../models/Note");
const asyncHandler = require("../middleware/asyncHandler");
const getOwnedApplication = require("../utils/getOwnedApplication");

const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Application created successfully",
    data: application,
  });
});

const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user._id }).sort({
    appliedDate: -1,
  });

  res.status(200).json({
    success: true,
    data: applications,
    count: applications.length,
  });
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await getOwnedApplication(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    data: application,
  });
});

const updateApplication = asyncHandler(async (req, res) => {
  const application = await getOwnedApplication(req.params.id, req.user._id);

  Object.assign(application, req.body);
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: application,
  });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await getOwnedApplication(req.params.id, req.user._id);

  await Note.deleteMany({ application: application._id });
  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });
});

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
