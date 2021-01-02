const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/auth");
const { createPaymentIntent } = require("../controllers/stripe");

router.post("/create-payment-intent", validateToken, createPaymentIntent);

module.exports = router;
