const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

//  Broadcast Notification
const broadcast = async (req, res) => {
  try {
    const { title, message, type, orgIds } = req.body;

    // Validate required fields
    if (!title || !message || !type) {
      return res.status(400).json({
        error: "title, message, and type are required.",
      });
    }

    const validTypes = ["INFO", "WARNING", "CRITICAL"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: "type must be INFO, WARNING, or CRITICAL.",
      });
    }

    if (MOCK_MODE) {
      return res.json({
        success: true,
        message: "Notification sent successfully.",
        sentTo: orgIds && orgIds.length > 0 ? orgIds : ["all organizations"],
        notification: { title, message, type },
      });
    }
  } catch (err) {
    console.error("broadcast error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { broadcast };
