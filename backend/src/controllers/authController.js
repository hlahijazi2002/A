const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

//  Validation helper
const validateLogin = (email, password) => {
  const errors = [];
  if (!email || typeof email !== "string") errors.push("Email is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Invalid email format.");
  if (!password || typeof password !== "string")
    errors.push("Password is required.");
  else if (password.length < 6)
    errors.push("Password must be at least 6 characters.");
  return errors;
};

//  Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const errors = validateLogin(email, password);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM admin_users WHERE email = $1 AND is_active = true",
      [email.toLowerCase().trim()],
    );

    const admin = result.rows[0];
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { id: admin.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
    );

    await pool.query(
      `INSERT INTO admin_sessions (admin_id, refresh_token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
      [admin.id, refreshToken],
    );

    res.json({
      accessToken,
      refreshToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Refresh Token
const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({ error: "Refresh token required." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const session = await pool.query(
      "SELECT * FROM admin_sessions WHERE refresh_token = $1 AND expires_at > NOW()",
      [refreshToken],
    );

    if (!session.rows[0]) {
      return res.status(401).json({ error: "Session expired or invalid." });
    }

    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired refresh token." });
  }
};

//  Logout
const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token required." });
  }

  try {
    await pool.query("DELETE FROM admin_sessions WHERE refresh_token = $1", [
      refreshToken,
    ]);
    res.json({ message: "Logged out successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { login, refresh, logout };
