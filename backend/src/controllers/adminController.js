const asyncHandler = require("../middleware/asyncHandler");
const Application = require("../models/Application");
const {
  buildApplicationFilter,
  buildSort,
} = require("../utils/buildApplicationQuery");
const { getGlobalStats: fetchGlobalStats } = require("../utils/getGlobalStats");

const getAllApplications = asyncHandler(async (req, res) => {
  const { page, limit, status, search, source, sort } = req.query;

  const filter = buildApplicationFilter({ status, source, search });
  const sortObj = buildSort(sort);
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate("user", "name email")
      .sort(sortObj)
      .skip(skip)
      .limit(limit),
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

const getGlobalStats = asyncHandler(async (req, res) => {
  const stats = await fetchGlobalStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

module.exports = {
  getAllApplications,
  getGlobalStats,
};
