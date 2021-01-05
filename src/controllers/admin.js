const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  const orders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product");

  res.status(200).json(orders);
};

exports.changeOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  const updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  );

  res.status(200).json(updated);
};
