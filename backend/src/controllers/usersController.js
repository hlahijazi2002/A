const carbonApi = require("../config/carbonApi");

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "ADMINISTRATOR",
  "DATA_CONTRIBUTOR",
  "ANALYST",
  "VIEWER",
];

const getUsers = async (req, res) => {
  try {
const { search, role, orgId, isActive, page = 1, limit = 20 } = req.query;

const params = { page, limit };
if (search) params.search = search;
if (role) params.role = role;
if (orgId) params.orgId = orgId;
if (isActive !== undefined) params.isActive = isActive;

    const response = await carbonApi.get("/users", { params });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await carbonApi.get(`/users/${req.params.id}`);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { isActive, reason } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "isActive must be a boolean." });
    }

    const body = { isActive };
    if (reason) body.reason = reason;

    const response = await carbonApi.patch(
      `/users/${req.params.id}/status`,
      body,
    );
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !ALLOWED_ROLES.includes(role)) {
      return res
        .status(400)
        .json({ error: `Invalid role. Allowed: ${ALLOWED_ROLES.join(", ")}` });
    }

    const response = await carbonApi.patch(`/users/${req.params.id}/role`, {
      role,
    });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = { getUsers, getUserById, updateUserStatus, updateUserRole };
