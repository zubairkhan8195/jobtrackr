const express = require("express");
const { validate, validateParams, validateQuery } = require("../middleware/validate");
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
  applicationQuerySchema,
} = require("../validators/applicationValidator");
const { objectIdParamSchema } = require("../validators/common");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, validateQuery(applicationQuerySchema), getApplications);
router.get("/:id", protect, validateParams(objectIdParamSchema("id")), getApplicationById);
router.post("/", protect, validate(createApplicationSchema), createApplication);
router.put(
  "/:id",
  protect,
  validateParams(objectIdParamSchema("id")),
  validate(updateApplicationSchema),
  updateApplication
);
router.delete("/:id", protect, validateParams(objectIdParamSchema("id")), deleteApplication);

module.exports = router;
