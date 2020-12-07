const Product = require("../models/Product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Create product failed");
  }
};

exports.read = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).send("Could not get products");
  }
};
