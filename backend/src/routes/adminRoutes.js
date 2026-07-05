const express = require("express");
const { validateQuery } = require("../middleware/validate");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getAllApplications,
  getGlobalStats,
} = require("../controllers/adminController");
const { adminApplicationsQuerySchema } = require("../validators/applicationValidator");

const router = express.Router();

router.get(
  "/applications",
  protect,
  authorize("admin"),
  validateQuery(adminApplicationsQuerySchema),
  getAllApplications,
);

router.get("/stats", protect, authorize("admin"), getGlobalStats);

module.exports = router;