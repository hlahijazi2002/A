const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

//  Emissions
const getEmissions = async (req, res) => {
  try {
    if (MOCK_MODE) {
      return res.json(mockData.analytics.emissions);
    }
  } catch (err) {
    console.error("getEmissions error:", err);
    res.status(500).json({ error: "Server error." });
  }
};
//  Platform Summary
const getSummary = async (req, res) => {
  try {
    if (MOCK_MODE) {
      return res.json(mockData.analytics.summary);
    }
  } catch (err) {
    console.error("getSummary error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { getSummary, getEmissions };
