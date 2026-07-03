const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const applicationRoutes = require("./routes/applicationRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api", noteRoutes);
app.use("/api/admin", adminRoutes);

// Error handler (must be after routes)
app.use(errorHandler);

module.exports = app;