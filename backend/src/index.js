const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const orgsRoutes = require("./routes/orgs");
const usersRoutes = require("./routes/users");
const analyticsRoutes = require("./routes/analytics");
const auditLogsRoutes = require("./routes/auditLogs");
const notificationsRoutes = require("./routes/notifications");
const partnersRoutes = require("./routes/partners");

const app = express();
const PORT = process.env.PORT || 3000;

// Security
app.use(helmet());

// General rate limit: max 100 requests per 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

// Login rate limit: max 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts, please try again later." },
});

app.use(generalLimiter);

// Middleware
app.use(cors({ origin: process.env.ADMIN_FRONTEND_URL }));
app.use(express.json());

// Routes
app.use("/auth/login", loginLimiter);
app.use("/auth", authRoutes);
app.use("/orgs", orgsRoutes);
app.use("/users", usersRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/audit-logs", auditLogsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/partners", partnersRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Admin Backend is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
