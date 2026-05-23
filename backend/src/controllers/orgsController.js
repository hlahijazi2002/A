const mockData = require("../config/mockData");
const MOCK_MODE = process.env.MOCK_MODE === "true";

//  Get All Organizations
const getOrgs = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const {
        search,
        subscriptionPlan,
        isActive,
        page = 1,
        limit = 20,
      } = req.query;

      let data = [...mockData.organizations];

      // Filters
      if (search) {
        data = data.filter((o) =>
          o.name.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (subscriptionPlan) {
        data = data.filter((o) => o.subscriptionPlan === subscriptionPlan);
      }
      if (isActive !== undefined) {
        data = data.filter((o) => o.isActive === (isActive === "true"));
      }

      return res.json({
        data,
        total: data.length,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(data.length / limit),
      });
    }

    // Real API call
    // const response = await carbonApi.get('/organizations', { params: req.query });
    // return res.json(response.data);
  } catch (err) {
    console.error("getOrgs error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Get One Organization
const getOrgById = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const org = mockData.organizations.find((o) => o.id === req.params.id);
      if (!org)
        return res.status(404).json({ error: "Organization not found." });

      return res.json({ ...org, userCount: 2, totalCo2e: 3000.0 });
    }
  } catch (err) {
    console.error("getOrgById error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update Org Status
const updateOrgStatus = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { isActive, reason } = req.body;
      const org = mockData.organizations.find((o) => o.id === req.params.id);
      if (!org)
        return res.status(404).json({ error: "Organization not found." });

      org.isActive = isActive;
      return res.json({ success: true, org });
    }
  } catch (err) {
    console.error("updateOrgStatus error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update Org Subscription
const updateOrgSubscription = async (req, res) => {
  try {
    if (MOCK_MODE) {
      const { subscriptionPlan, subscriptionStatus } = req.body;
      const org = mockData.organizations.find((o) => o.id === req.params.id);
      if (!org)
        return res.status(404).json({ error: "Organization not found." });

      if (subscriptionPlan) org.subscriptionPlan = subscriptionPlan;
      if (subscriptionStatus) org.subscriptionStatus = subscriptionStatus;

      return res.json({ success: true, org });
    }
  } catch (err) {
    console.error("updateOrgSubscription error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getOrgs,
  getOrgById,
  updateOrgStatus,
  updateOrgSubscription,
};
