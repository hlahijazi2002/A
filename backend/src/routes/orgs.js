const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getOrgs,
  getOrgById,
  updateOrgStatus,
  updateOrgSubscription,
  createOrg,
} = require("../controllers/orgsController");

// All routes protected
router.get("/", authenticate, getOrgs);
router.post("/", authenticate, createOrg);
router.get("/:id", authenticate, getOrgById);
router.patch("/:id/status", authenticate, updateOrgStatus);
router.patch("/:id/subscription", authenticate, updateOrgSubscription);

module.exports = router;
