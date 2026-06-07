const carbonApi = require("../config/carbonApi");

const getFeatures = async (req, res) => {
  try {
    const response = await carbonApi.get(`/features/${req.params.id}`);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const updateFeatures = async (req, res) => {
  try {
    const response = await carbonApi.patch(
      `/features/${req.params.id}`,
      req.body,
    );
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const resetFeatures = async (req, res) => {
  try {
    const response = await carbonApi.delete(`/features/${req.params.id}`);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = { getFeatures, updateFeatures, resetFeatures };
