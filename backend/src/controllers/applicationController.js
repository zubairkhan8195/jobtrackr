const Application = require("../models/Application");
const Note = require("../models/Note");
const asyncHandler = require("../middleware/asyncHandler");
const getOwnedApplication = require("../utils/getOwnedApplication");
const {
  buildApplicationFilter,
  buildSort,
} = require("../utils/buildApplicationQuery");
const { getApplicationStats: fetchApplicationStats } = require("../utils/getApplicationStats");

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
  const { page, limit, status, search, source, sort } = req.query;

  const filter = buildApplicationFilter(req.user._id, {
    status,
    source,
    search,
  });
  const sortObj = buildSort(sort);
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    Application.find(filter).sort(sortObj).skip(skip).limit(limit),
    Application.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: applications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

const getApplicationStats = asyncHandler(async (req, res) => {
  const stats = await fetchApplicationStats(req.user._id);

  res.status(200).json({
    success: true,
    data: stats,
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
  getApplicationStats,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
