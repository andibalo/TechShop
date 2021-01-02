const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/auth");
const {
  saveUserCart,
  getUserCart,
  emptyCart,
  saveAddress,
  getAddress,
  applyCouponToCart,
} = require("../controllers/user");

router.post("/user/cart", validateToken, saveUserCart);
router.get("/user/cart", validateToken, getUserCart);
router.delete("/user/cart", validateToken, emptyCart);
router.post("/user/address", validateToken, saveAddress);
router.get("/user/address", validateToken, getAddress);
router.post("/user/cart/coupon", validateToken, applyCouponToCart);

module.exports = router;
