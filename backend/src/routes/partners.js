const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnersController");

router.get("/", authenticate, getPartners);
router.post("/", authenticate, addPartner);
router.patch("/:id", authenticate, updatePartner);
router.delete("/:id", authenticate, deletePartner);

module.exports = router;
