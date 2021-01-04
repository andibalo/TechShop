const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");

exports.saveUserCart = async (req, res) => {
  //We save the user cart to database for security reasons
  //user may be able to alter price field in frontend hence we caluclate it again in backend by
  //querying the db for original price

  const { cart } = req.body;

  try {
    //get user document to get its id and store it to the orderedBy field in cart
    const user = await User.findOne({ email: req.user.email });

    //check if user has created a cart before and saved in database
    const userCartExists = await Cart.findOne({ orderedBy: user._id });

    //if it exists remove it from db and create a new cart to avoid duplicates
    if (userCartExists) {
      userCartExists.remove();
    }

    let cartTotalPrice = 0;

    //ASYNC LOOPING
    //DONT USE ASYNC AWAIT IN LOOPS WITH CALLBACK FUNCTION LIKE FOREACH,REDUCE,FILTER
    //Use normal loops instead
    //Map + await will return array of promises that we can await its resolved values with await Promise.all
    //async looping in calback functions will not wait for the resolved values of the promises and run the code aft foreach
    //normal loops will pause the execution for the resolved values

    const productsPromises = cart.map(async (product) => {
      let newProduct = {};

      newProduct.product = product._id;
      newProduct.count = product.count;

      let productFromDb = await Product.findById(product._id).select("price");

      newProduct.price = productFromDb.price;

      cartTotalPrice = cartTotalPrice + newProduct.price * newProduct.count;
      return newProduct;
    });

    const products = await Promise.all(productsPromises);
    console.log("Products", products);

    const newCart = await new Cart({
      products,
      cartTotal: cartTotalPrice,
      orderedBy: user._id,
    }).save();

    res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log(user._id);
  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .populate("orderedBy");

  res.status(200).json(cart);
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id });

  res.status(200).json(cart);
};

exports.saveAddress = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
    { new: true }
  );

  res.status(200).json(user);
};

exports.getAddress = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select("address");
  //console.log("userAddres", user);
  if (!user.address) {
    return res.status(200).json({ address: "" });
  }

  res.status(200).json(user);
};

exports.applyCouponToCart = async (req, res) => {
  const { name } = req.body;

  const existingCoupon = await Coupon.findOne({ name });

  if (!existingCoupon) {
    res.json({ err: "This coupon code is not valid", code: 1050 });
    return;
  }

  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOne({ orderedBy: user._id });
  //console.log(cart);
  cart.totalAfterDiscount = (
    cart.cartTotal -
    cart.cartTotal * (existingCoupon.discount / 100)
  ).toFixed(2);
  //console.log("NEW CART", cart);

  await cart.save();

  res.status(200).json({
    total: cart.totalAfterDiscount,
    discount: existingCoupon.discount,
  });
};

exports.createOrderAndEmptyCart = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOne({ orderedBy: user._id });

  const order = await new Order({
    products: cart.products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  let bulkOption = cart.products.map((item) => {
    return {
      updateOne: {
        filter: {
          _id: item.product._id,
        },
        update: {
          $inc: {
            sold: +item.count,
            quantity: -item.count,
          },
        },
      },
    };
  });

  const updatedProducts = await Product.bulkWrite(bulkOption, {});
  //console.log("UPDATED PRODUCTS", updatedProducts);
  await cart.remove();

  res.status(200).json(order);
};
