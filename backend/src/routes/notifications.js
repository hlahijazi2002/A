const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { broadcast } = require("../controllers/notificationsController");

router.post("/broadcast", authenticate, broadcast);

module.exports = router;
