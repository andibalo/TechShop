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

exports.list = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subcategories")
      .sort([["createdAt", "desc"]]);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).send("Could not get products");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });

    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subcategories");

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

exports.listWithOpts = async (req, res) => {
  try {
    //sort = createdAt
    //order = desc/asc
    const { page, order, sort } = req.body;

    //Current page is either sent by client or has nitial value of 1
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategories")
      .sort([[sort, order]])
      .limit(perPage);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.estimatedDocumentCount();

  res.status(200).json(total);
};
