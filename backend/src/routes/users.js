const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
} = require("../controllers/usersController");

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.patch("/:id/status", authenticate, updateUserStatus);
router.patch("/:id/role", authenticate, updateUserRole);

module.exports = router;
