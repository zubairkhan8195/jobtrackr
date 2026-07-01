const express = require("express");
const validate = require("../middleware/validate");
const { register ,login,getProfile} = require("../controllers/authController");
const { registerSchema ,loginSchema} = require("../validators/authValidator");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", protect, getProfile);

module.exports = router;