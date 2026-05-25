const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

//  Get Audit Logs
const getAuditLogs = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { orgId, from, to, page = 1, limit = 20 } = req.query;

      let data = [...mockData.auditLogs];

      if (orgId) {
        data = data.filter((l) => l.organizationId === orgId);
      }
      if (from) {
        data = data.filter((l) => new Date(l.timestamp) >= new Date(from));
      }
      if (to) {
        data = data.filter((l) => new Date(l.timestamp) <= new Date(to));
      }

      // newest first
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return res.json({
        data,
        total: data.length,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(data.length / limit),
      });
    }
    // Real API — coming soon
    return res
      .status(501)
      .json({ error: "Not implemented. Waiting for Carbon App API." });
  } catch (err) {
    console.error("getAuditLogs error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { getAuditLogs };
