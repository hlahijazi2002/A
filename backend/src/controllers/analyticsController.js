const carbonApi = require("../config/carbonApi");

const getEmissions = async (req, res) => {
  try {
    const { year, sector } = req.query;

    const params = {};
    if (year) params.year = year;
    if (sector) params.sector = sector;

    const response = await carbonApi.get("/analytics/emissions", { params });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const getSummary = async (req, res) => {
  try {
    const response = await carbonApi.get("/analytics/summary");
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = { getSummary, getEmissions };
