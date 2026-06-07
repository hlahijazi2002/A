const carbonApi = require("../config/carbonApi");

const getAuditLogs = async (req, res) => {
  try {
    const { orgId, userId, action, from, to, page = 1, limit = 20 } = req.query;

    const params = { page, limit };
    if (orgId) params.orgId = orgId;
    if (userId) params.userId = userId;
    if (action) params.action = action;
    if (from) params.from = from;
    if (to) params.to = to;

    const response = await carbonApi.get("/audit-logs", { params });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = { getAuditLogs };
