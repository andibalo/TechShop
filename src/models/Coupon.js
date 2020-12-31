const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      uppercase: true,
      maxlength: 12,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Coupon = mongoose.model("coupon", couponSchema);
