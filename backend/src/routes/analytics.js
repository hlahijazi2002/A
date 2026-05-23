const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getSummary,
  getEmissions,
} = require("../controllers/analyticsController");

router.get("/summary", authenticate, getSummary);
router.get("/emissions", authenticate, getEmissions);

module.exports = router;
