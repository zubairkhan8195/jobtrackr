const express = require("express");
const { validateQuery } = require("../middleware/validate");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getAllApplications,
  getGlobalStats,
} = require("../controllers/adminController");
const { applicationQuerySchema } = require("../validators/applicationValidator");

const router = express.Router();

router.get(
  "/applications",
  protect,
  authorize("admin"),
  validateQuery(applicationQuerySchema),
  getAllApplications,
);

router.get("/stats", protect, authorize("admin"), getGlobalStats);

module.exports = router;