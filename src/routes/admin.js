const express = require("express");
const router = express.Router();

const { validateToken, validateAdmin } = require("../middlewares/auth");
const { getOrders, changeOrderStatus } = require("../controllers/admin");

router.get("/admin/orders", validateToken, validateAdmin, getOrders);
router.put(
  "/admin/order-status",
  validateToken,
  validateAdmin,
  changeOrderStatus
);

module.exports = router;
