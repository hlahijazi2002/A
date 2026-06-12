require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const orgsRoutes = require("./routes/orgs");
const usersRoutes = require("./routes/users");
const analyticsRoutes = require("./routes/analytics");
const auditLogsRoutes = require("./routes/auditLogs");
const notificationsRoutes = require("./routes/notifications");
const partnersRoutes = require("./routes/partners");
const featuresRoutes = require("./routes/features");

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
// Security
app.use(helmet());

// General rate limit: max 100 requests per 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: "Too many requests, please try again later." },
});

// Login rate limit: max 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts, please try again later." },
});

app.use(generalLimiter);
app.use("/auth/login", loginLimiter);

// Middleware
app.use(cors({ 
  origin: ["https://admin-dashboard-urimpact.vercel.app", "http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/orgs", orgsRoutes);
app.use("/users", usersRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/audit-logs", auditLogsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/partners", partnersRoutes);
app.use("/features", featuresRoutes);

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
