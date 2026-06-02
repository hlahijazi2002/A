const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "ADMINISTRATOR",
  "DATA_CONTRIBUTOR",
  "ANALYST",
  "VIEWER",
];

//  Get All Users
const getUsers = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { search, role, orgId, page = 1, limit = 20 } = req.query;

      let data = [...mockData.users];

      if (search) {
        data = data.filter(
          (u) =>
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (role) data = data.filter((u) => u.role === role);
      if (orgId) data = data.filter((u) => u.organizationId === orgId);

      // ✅ Pagination slicing
      const paginated = data.slice((page - 1) * limit, page * limit);

      return res.json({
        data: paginated,
        total: data.length,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(data.length / limit),
      });
    }
    return res
      .status(501)
      .json({ error: "Not implemented. Waiting for Carbon App API." });
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Get One User
const getUserById = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const user = mockData.users.find((u) => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found." });
      return res.json(user);
    }
    return res
      .status(501)
      .json({ error: "Not implemented. Waiting for Carbon App API." });
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update User Status
const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    // ✅ Validation
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "isActive must be a boolean." });
    }

    if (MOCK_MODE) {
      const user = mockData.users.find((u) => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found." });
      user.isActive = isActive;
      return res.json({ success: true, user });
    }
    return res
      .status(501)
      .json({ error: "Not implemented. Waiting for Carbon App API." });
  } catch (err) {
    console.error("updateUserStatus error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update User Role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // ✅ Validation
    if (!role || !ALLOWED_ROLES.includes(role)) {
      return res
        .status(400)
        .json({ error: `Invalid role. Allowed: ${ALLOWED_ROLES.join(", ")}` });
    }

    if (MOCK_MODE) {
      const user = mockData.users.find((u) => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found." });
      user.role = role;
      return res.json({ success: true, user });
    }
    return res
      .status(501)
      .json({ error: "Not implemented. Waiting for Carbon App API." });
  } catch (err) {
    console.error("updateUserRole error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { getUsers, getUserById, updateUserStatus, updateUserRole };
