const express = require("express");
const { validate, validateParams } = require("../middleware/validate");
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");
const {
  createApplicationSchema,
  updateApplicationSchema,
  idParamSchema,
} = require("../validators/applicationValidator");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getApplications);
router.get("/:id", protect, validateParams(idParamSchema), getApplicationById);
router.post("/", protect, validate(createApplicationSchema), createApplication);
router.put(
  "/:id",
  protect,
  validateParams(idParamSchema),
  validate(updateApplicationSchema),
  updateApplication
);
router.delete("/:id", protect, validateParams(idParamSchema), deleteApplication);

module.exports = router;
