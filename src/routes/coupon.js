const express = require("express");
const router = express.Router();

const { validateAdmin, validateToken } = require("../middlewares/auth");
const { create, list, remove } = require("../controllers/coupon");

router.post("/coupon", validateToken, validateAdmin, create);
router.get("/coupons", validateToken, validateAdmin, list);
router.delete("/coupon/:id", validateToken, validateAdmin, remove);

module.exports = router;
