const carbonApi = require("../config/carbonApi");

const broadcast = async (req, res) => {
  try {
    const { title, message, type, orgIds } = req.body;

    if (!title || !message || !type) {
      return res
        .status(400)
        .json({ error: "title, message, and type are required." });
    }

    const validTypes = ["INFO", "WARNING", "CRITICAL"];
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ error: "type must be INFO, WARNING, or CRITICAL." });
    }

    const body = { title, message, type };
    if (orgIds && orgIds.length > 0) body.orgIds = orgIds;

    const response = await carbonApi.post("/notifications/broadcast", body);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = { broadcast };
