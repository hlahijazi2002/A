const carbonApi = require("../config/carbonApi");

const ALLOWED_PLANS = ["FREE", "STARTER", "PROFESSIONAL", "ENTERPRISE"];
const ALLOWED_STATUSES = [
  "TRIAL",
  "ACTIVE",
  "SUSPENDED",
  "CANCELLED",
  "EXPIRED",
];

const getOrgs = async (req, res) => {
  try {
    const {
      search,
      subscriptionPlan,
      isActive,
      page = 1,
      limit = 20,
    } = req.query;

    const params = { page, limit };
    if (search) params.search = search;
    if (subscriptionPlan) params.subscriptionPlan = subscriptionPlan;
    if (isActive !== undefined) params.isActive = isActive;

    const response = await carbonApi.get("/organisations", { params });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const getOrgById = async (req, res) => {
  try {
    const response = await carbonApi.get(`/organisations/${req.params.id}`);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const createOrg = async (req, res) => {
  try {
    const response = await carbonApi.post("/organisations", req.body);
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};
const updateOrgStatus = async (req, res) => {
  try {
    const { isActive, reason } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "isActive must be a boolean." });
    }

    const body = { isActive };
    if (reason) body.reason = reason;

    const response = await carbonApi.patch(
      `/organisations/${req.params.id}/status`,
      body,
    );
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

const updateOrgSubscription = async (req, res) => {
  try {
    const { subscriptionPlan, subscriptionStatus } = req.body;

    if (subscriptionPlan && !ALLOWED_PLANS.includes(subscriptionPlan)) {
      return res
        .status(400)
        .json({ error: `Invalid plan. Allowed: ${ALLOWED_PLANS.join(", ")}` });
    }
    if (subscriptionStatus && !ALLOWED_STATUSES.includes(subscriptionStatus)) {
      return res.status(400).json({
        error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }
    if (!subscriptionPlan && !subscriptionStatus) {
      return res.status(400).json({
        error:
          "At least one of subscriptionPlan or subscriptionStatus is required.",
      });
    }

    const body = {};
    if (subscriptionPlan) body.subscriptionPlan = subscriptionPlan;
    if (subscriptionStatus) body.subscriptionStatus = subscriptionStatus;

    const response = await carbonApi.patch(
      `/organisations/${req.params.id}/subscription`,
      body,
    );
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || "Server error.";
    return res.status(status).json({ error: message });
  }
};

module.exports = {
  getOrgs,
  getOrgById,
  updateOrgStatus,
  createOrg,
  updateOrgSubscription,
};
