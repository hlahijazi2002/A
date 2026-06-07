const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getFeatures,
  updateFeatures,
  resetFeatures,
} = require("../controllers/featuresController");

router.get("/:id", authenticate, getFeatures);
router.patch("/:id", authenticate, updateFeatures);
router.delete("/:id", authenticate, resetFeatures);

module.exports = router;
