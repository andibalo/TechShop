const Coupon = require("../models/Coupon");

exports.create = async (req, res) => {
  const { name, discount, expiry } = req.body;

  try {
    const coupon = await new Coupon({ name, discount, expiry }).save();

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.list = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });

    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndRemove({ _id: req.params.id });

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
