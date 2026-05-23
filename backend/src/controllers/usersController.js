const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

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

      return res.json({
        data,
        total: data.length,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(data.length / limit),
      });
    }
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
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update User Status
const updateUserStatus = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { isActive } = req.body;
      const user = mockData.users.find((u) => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found." });

      user.isActive = isActive;
      return res.json({ success: true, user });
    }
  } catch (err) {
    console.error("updateUserStatus error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update User Role
const updateUserRole = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { role } = req.body;
      const user = mockData.users.find((u) => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found." });

      user.role = role;
      return res.json({ success: true, user });
    }
  } catch (err) {
    console.error("updateUserRole error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { getUsers, getUserById, updateUserStatus, updateUserRole };
