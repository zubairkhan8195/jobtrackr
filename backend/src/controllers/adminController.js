const asyncHandler = require("../middleware/asyncHandler");
const Application = require("../models/Application");
const { getGlobalStats: fetchGlobalStats } = require("../utils/getGlobalStats");

const getAllApplications = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    Application.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Application.countDocuments({}),
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
