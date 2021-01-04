const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../models/User");
const Cart = require("../models/Cart");

exports.createPaymentIntent = async (req, res) => {
  const { isCouponApplied } = req.body;

  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOne({ orderedBy: user._id });
  // console.log(isCouponApplied);
  // console.log(cart);

  const finalAmount = isCouponApplied
    ? cart.totalAfterDiscount
    : cart.cartTotal;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "idr",
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    finalAmount,
    cartTotal: cart.cartTotal,
  });
};
