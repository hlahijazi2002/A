const { Pool } = require("pg");
require("dotenv").config();

const MOCK_MODE = process.env.MOCK_MODE === "true";

// Auth always needs database — even in mock mode
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    if (!MOCK_MODE) {
      console.error("❌ Database connection error:", err);
    } else {
      console.log("ℹ️ Mock mode — database connection optional");
    }
  });

module.exports = pool;
