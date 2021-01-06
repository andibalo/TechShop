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
  createOrderAndEmptyCart,
  getOrders,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} = require("../controllers/user");

router.post("/user/cart", validateToken, saveUserCart);
router.get("/user/cart", validateToken, getUserCart);
router.delete("/user/cart", validateToken, emptyCart);
router.post("/user/address", validateToken, saveAddress);
router.get("/user/address", validateToken, getAddress);
router.post("/user/cart/coupon", validateToken, applyCouponToCart);
router.post("/user/order", validateToken, createOrderAndEmptyCart);
router.get("/user/orders", validateToken, getOrders);
router.get("/user/wishlist", validateToken, getUserWishlist);
router.post("/user/wishlist", validateToken, addToWishlist);
router.delete("/user/wishlist/:productId", validateToken, removeFromWishlist);

module.exports = router;
