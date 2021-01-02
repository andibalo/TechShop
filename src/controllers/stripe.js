const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "idr",
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
};
